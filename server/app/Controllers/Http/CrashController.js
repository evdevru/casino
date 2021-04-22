'use strict'

const Crash = use('App/Models/Crash')

class CrashController {
  constructor(socket, request, name) {
    this.socket = socket
    this.request = request
    this.name = name
  }

  async status() {
    const lastGame = await Crash.last()
    if (lastGame.start_at < Date.now()) {
      this.socket.emit('status', {
        timeleft: lastGame.start_at - Date.now(),
      })
    }
  }

  tick(game) {
    const step = 0.01
    const end = game.rate_final
    let current = game.rate_current
    const interval = setInterval(() => {
      if (current >= end) {
        clearInterval(interval)
        this.socket.emit('final')
      }
      current += step
      game.rate_current = parseFloat(current.toFixed(2))
      game.save()
      this.socket.emit('tick', {
        rate: current.toFixed(2),
      })
    }, 100)
  }
}

module.exports = CrashController
