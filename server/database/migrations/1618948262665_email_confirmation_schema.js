'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmailConfirmationSchema extends Schema {
  up() {
    this.create('email_confirmations', (table) => {
      table.increments()
      table.string('token').notNullable()
      table.integer('user_id').unsigned()
      table.string('email').notNullable()
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
    this.drop('email_confirmations')
  }
}

module.exports = EmailConfirmationSchema
