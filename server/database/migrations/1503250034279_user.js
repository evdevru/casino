'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const UserRole = use('App/Models/UserRole')

class UserSchema extends Schema {
  async up() {
    const role = await UserRole.findOrCreate({ name: 'user' })
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).nullable().unique()
      table.string('password', 60).notNullable()
      table.float('balance').defaultTo(5000)
      table.float('balance_demo').defaultTo(0)
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('avatar').nullable()
      table.integer('role_id').unsigned().defaultTo(role.toJSON().id)
      table.timestamps()

      table
        .foreign('role_id')
        .references('id')
        .inTable('user_roles')
        .onDelete('set null')
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
