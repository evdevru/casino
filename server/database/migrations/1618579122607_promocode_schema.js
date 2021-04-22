'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromocodeSchema extends Schema {
  up() {
    this.create('promocodes', (table) => {
      table.increments()
      table.string('promocode').unique().notNullable()
      table.integer('user_id').unsigned()
      table.integer('amount').defaultTo(1).notNullable()
      table.integer('maximum').defaultTo(1)
      table.timestamps()

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('promocodes')
  }
}

module.exports = PromocodeSchema
