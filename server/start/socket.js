const Server = use('Server')
const Config = use('Config')
const Event = use('Event')
const Env = use('Env')

const User = use('App/Models/User')
const Crash = use('App/Models/Crash')
const CrashBet = use('App/Models/CrashBet')

const jwt = require('jwt-simple')
const rnd = require('random-number')

const io = require('socket.io')(Server.getInstance(), {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

async function getUser(socket) {
  const token = socket.request.headers.authorization.split(' ')[1]
  if (!token) {
    return null
  }
  const jwtData = jwt.decode(token, Config.get('app.appKey'))
  const user = await User.find(jwtData.uid)
  return user
}

let current = 1

const crashInstance = io
  .of('/crash')
  .use(async (socket, next) => {
    socket.user = await getUser(socket)
    next()
  })
  .on('connection', (socket) => {
    socket
      .on('game:status', async () => {
        const game = await Crash.last()
        socket.emit('game:status', {
          timeleft: game.start_at - Date.now(),
          bets: await game.bets().with('user').fetch(),
        })
      })
      .on('bet:make', async (data, callback) => {
        const user =
          socket.user && socket.user.length
            ? socket.user
            : await getUser(socket)
        const game = await Crash.last()
        if (game.start_at < Date.now()) {
          return callback({
            status: 'error',
            message: 'Игра уже начата! Повторите в следующей.',
          })
        }
        if (
          user.balance <= 0 ||
          user.balance < data.amount ||
          data.amount <= 0
        ) {
          return callback({
            status: 'error',
            message: 'Недостаточно средств на счёте',
          })
        }
        try {
          await user.crashes().create({
            amount: data.amount,
            rate_auto: data.rate_auto,
            crash_id: game.id,
          })
          user.balance -= data.amount
          await user.save()
          crashInstance.emit(
            'bet:new',
            await user.crashes().with('user').last()
          )
        } catch (e) {
          return callback({
            status: 'error',
            message: 'Вы уже учавствуете в игре!',
          })
        }
        callback({
          status: 'success',
          message: 'Ваша ставка принята!',
        })
      })
      .on('bet:take', async () => {
        const game = await Crash.last()
        const user = await getUser(socket)
        const bet = await user
          .crashes()
          .where('crash_id', game.id)
          .where('status', 'await')
          .last()
        if (!bet) {
          return
        }
        const isWin = current <= game.rate_final
        await bet.merge({
          status: isWin ? 'win' : 'lose',
          rate_final: current.toFixed(2),
        })
        await bet.save()
        user.balance += current * bet.amount
        await user.save()
        crashInstance.emit('bet:result', {
          bets: await user
            .crashes()
            .where('crash_id', game.id)
            .with('user')
            .fetch(),
        })
      })
  })

Event.on('crash::start', async () => {
  const timeout = 1000 * 15
  const step = 0.01
  const start = Date.now() + timeout
  const rate = rnd({ min: 1, max: 3 })

  const game = await Crash.create({
    start_at: start,
    rate_final: rate,
  })

  startCrash()

  setTimeout(() => {
    const interval = setInterval(async () => {
      game.rate_current = current.toFixed(2)
      await game.save()
      const bets = await game.bets().fetch()

      if (current >= game.rate_final) {
        current = 1
        const losed = await game.bets().where('status', 'await').update({
          rate_final: game.rate_final,
          status: 'lose',
        })
        if (losed) {
          crashInstance.emit('bet:result', {
            bets: await game
              .bets()
              .where('status', 'lose')
              .with('user')
              .fetch(),
          })
        }
        crashInstance.emit('game:final', { rate: game.rate_final })
        setTimeout(() => {
          crashInstance.emit('game:new', { timeleft: timeout })
          Event.fire('crash::start')
        }, 5000)
        return clearInterval(interval)
      } else {
        const winAuto = bets.rows.filter(
          (bet) =>
            bet.rate_auto && bet.status === 'await' && bet.rate_auto <= current
        )
        const ids = winAuto.map((x) => x.id)
        if (ids.length) {
          await game
            .bets()
            .whereIn('id', ids)
            .update({ status: 'win', rate_final: current.toFixed(2) })
          winAuto.forEach(async (bet) => {
            const user = await User.find(bet.user_id)
            user.balance += bet.amount * current
            await user.save()
          })
          crashInstance.emit('bet:result', {
            bets: await game.bets().whereIn('id', ids).with('user').fetch(),
          })
        }
        crashInstance.emit('game:tick', {
          rate: current.toFixed(2),
        })
      }
      current += step
    }, 100)
  }, timeout)
})

async function startCrash() {
  const bots = await User.query()
    .where('role_id', 2)
    .orderByRaw('RAND()')
    .fetch()
  const fakes = bots.toJSON().slice(0, rnd({ min: 0, max: 12 }))
  if (!fakes.length) return
  fakes.forEach(async (bot) => {
    const user = await User.find(bot.id)
    const game = await Crash.last()
    try {
      setTimeout(async () => {
        const rate = rnd({ min: 1, max: 2 })
        await user.crashes().create({
          amount: rnd({ min: 100, max: 500, integer: true }),
          rate_auto: rate.toFixed(2),
          crash_id: game.id,
        })
        user.balance -= 100
        await user.save()
        crashInstance.emit('bet:new', await user.crashes().with('user').last())
      }, rnd({ min: 2000, max: 14000, integer: true }))
    } catch (e) {
      console.log(e)
    }
  })
}

Event.fire('crash::start')
