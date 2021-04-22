'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CrashBetSchema extends Schema {
  up() {
    this.create('crash_bets', (table) => {
      table.increments()
      table.float('amount').defaultTo(0)
      table.float('rate_final').nullable()
      table.float('rate_auto').nullable()
      table.integer('user_id').unsigned().nullable()
      table.integer('crash_id').unsigned()
      table.enum('status', ['await', 'lose', 'win']).defaultTo('await')
      table.timestamps()

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('set null')
      table
        .foreign('crash_id')
        .references('id')
        .inTable('crashes')
        .onDelete('cascade')

      table.unique(['user_id', 'crash_id'])
    })
  }

  down() {
    this.drop('crash_bets')
  }
}

module.exports = CrashBetSchema
