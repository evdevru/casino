/* eslint-disable camelcase */
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

const Drive = use('Drive')
const Helpers = use('Helpers')

class User extends Model {
  static get visible() {
    return ['id', 'first_name', 'last_name', 'username', 'avatar']
  }

  static get computed() {
    return ['fullname']
  }

  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  crashes() {
    return this.hasMany('App/Models/CrashBet', 'id', 'user_id')
  }

  freebies() {
    return this.hasMany('App/Models/Freebie', 'id', 'user_id')
  }

  socials() {
    return this.hasMany('App/Models/SocialAccount', 'id', 'user_id')
  }

  role() {
    return this.hasOne('App/Models/UserRole', 'id', 'role_id')
  }

  getFullname({ first_name, last_name }) {
    return first_name && last_name ? `${first_name} ${last_name}` : null
  }

  getAvatar(avatar) {
    if (!avatar) return '/img/avatar-default.svg'
    const url = avatar.toString()
    return url.split('\\').join('/')
  }
}

module.exports = User
