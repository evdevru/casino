'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordResetSchema extends Schema {
  up() {
    this.create('password_resets', (table) => {
      table.increments()
      table.string('token').notNullable()
      table.integer('user_id').unsigned()
      table.timestamps()

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
      table.unique(['token', 'user_id'])
    })
  }

  down() {
    this.drop('password_resets')
  }
}

module.exports = PasswordResetSchema
