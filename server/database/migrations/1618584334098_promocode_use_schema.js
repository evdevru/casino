'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromocodeUseSchema extends Schema {
  up() {
    this.create('promocode_uses', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.integer('promocode_id').unsigned().notNullable()
      table.timestamps()

      table.unique(['user_id', 'promocode_id'])

      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
        .onDelete('cascade')

      table
        .foreign('promocode_id')
        .references('id')
        .inTable('promocodes')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('promocode_uses')
  }
}

module.exports = PromocodeUseSchema
