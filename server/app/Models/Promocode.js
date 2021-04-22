'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Promocode extends Model {
  using() {
    return this.hasMany('App/Models/PromocodeUse', 'id', 'promocode_id')
  }
}

module.exports = Promocode
