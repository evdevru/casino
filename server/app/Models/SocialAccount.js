'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SocialAccount extends Model {
  static get hidden() {
    return ['token']
  }
}

module.exports = SocialAccount
