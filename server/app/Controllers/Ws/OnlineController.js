'use strict'

const Ws = use('Ws')

class OnlineController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  static onOpen() {
    console.log('open')
    this.socket.broadcastToAll('open')
  }

  onClose() {
    const topic = Ws.getChannel(this.socket.channel).topic(this.socket.topic)
    console.log(topic)
    this.socket.broadcastToAll('disconnect')
  }
}

module.exports = OnlineController
