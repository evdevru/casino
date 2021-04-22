'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CrashSchema extends Schema {
  up() {
    this.create('crashes', (table) => {
      table.increments()
      table.bigInteger('start_at').notNullable()
      table.float('rate_final').defaultTo(1)
      table.float('rate_current').defaultTo(1)
      table.timestamps()
    })
  }

  down() {
    this.drop('crashes')
  }
}

module.exports = CrashSchema
