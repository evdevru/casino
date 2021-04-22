'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialAccountSchema extends Schema {
  up() {
    this.create('social_accounts', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('provider')
      table.string('provider_id')
      table.string('username').nullable()
      table.string('token')
      table.timestamps()

      table.unique(['provider', 'provider_id'])
    })
  }

  down() {
    this.drop('social_accounts')
  }
}

module.exports = SocialAccountSchema
