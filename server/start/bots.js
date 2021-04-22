const User = use('App/Models/User')
const Server = use('Server')

const io = require('socket.io')(Server.getInstance(), {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

startCrash() {
  let bots = await User.query().where('role_id', 2).fetch()
  bots = bots.toJSON()

  bots.forEach((bot) => {
    const crashInstance = io.of('/crash').use((socket, next) => {
      console.log('bot was started')
      socket.user = bot
      next()
    })

    crashInstance.emit('bet:make', {
      amount: random(10, 100),
      rate_auto: 1.5,
    })
  })
}
