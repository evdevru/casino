'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Crash extends Model {
  bets() {
    return this.hasMany('App/Models/CrashBet', 'id', 'crash_id')
  }
}

module.exports = Crash
