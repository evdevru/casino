'use strict'

const { validateAll } = use('Validator')

const Promocode = use('App/Models/Promocode')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with promocodes
 */
class PromocodeController {
  /**
   * Show a list of all promocodes.
   * GET promocodes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new promocode.
   * POST promocodes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single promocode.
   * GET promocodes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update promocode details.
   * PUT or PATCH promocodes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a promocode with id.
   * DELETE promocodes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async using({ auth, request, response }) {
    const user = await auth.getUser()
    const code = request.only(['promocode'])
    const promocode = await Promocode.findBy('promocode', code.promocode)

    if (!promocode) {
      return response.status(400).send({
        status: 'error',
        message: 'Промокод не существует!',
      })
    }

    const uses = await promocode.using().fetch()
    const isUsed = uses.rows.find((x) => x.user_id === user.id)
    const isMaximum = uses.rows.length >= promocode.maximum

    console.log(promocode)

    if (isUsed || isMaximum) {
      const message = isUsed
        ? 'Промокод уже использован!'
        : isMaximum
        ? 'Достигнут лимит активаций кода'
        : 'Ошибка сервера'
      return response.status(400).send({
        status: 'error',
        message,
      })
    }

    await promocode.using().create({
      user_id: user.id,
    })

    user.balance += promocode.amount
    await user.save()

    return response.status(200).send({
      status: 'success',
      message: 'Промокод успешно применён!',
    })
  }
}

module.exports = PromocodeController
