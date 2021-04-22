'use strict'

const { Command } = require('@adonisjs/ace')

const Event = use('Event')

class RunCrash extends Command {
  static get signature() {
    return 'run:crash'
  }

  static get description() {
    return 'Start game crash'
  }

  handle(args, options) {
    Event.fire('crash::start')
  }
}

module.exports = RunCrash
