'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CrashBet extends Model {
  static get visible() {
    return ['id', 'amount', 'rate_final', 'status', 'user']
  }

  user() {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }

  game() {
    return this.hasOne('App/Models/Crash', 'id', 'crash_id')
  }
}

module.exports = CrashBet
