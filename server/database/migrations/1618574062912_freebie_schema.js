'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FreebieSchema extends Schema {
  up() {
    this.create('freebies', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.float('amount').defaultTo(0)

      table.timestamps()

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('freebies')
  }
}

module.exports = FreebieSchema
