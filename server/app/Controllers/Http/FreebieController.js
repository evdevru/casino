'use strict'

const moment = require('moment')

class FreebieController {
  get timeout() {
    return 15
  }

  async store({ request, response, auth }) {
    const numbers = [
      0.01,
      0.03,
      0.05,
      0.1,
      0.15,
      0.18,
      0.2,
      0.01,
      0.03,
      0.05,
      0.1,
      0.15,
      0.18,
      0.2,
    ]
    const amount = numbers[6]
    const user = await auth.getUser()
    const freebie = await user.freebies().last()
    if (
      !freebie ||
      moment(freebie.created_at).add(this.timeout, 'm').unix() <
        Date.now() / 1000
    ) {
      user.balance += amount
      user.save()
      await user.freebies().create({ amount })
      return response.status(200).send({
        status: 'success',
        message: 'Бонус получен',
        data: {
          amount,
        },
      })
    }

    return response.status(200).send({
      status: 'error',
      message: 'Ожидайте перезарядки таймера!',
    })
  }

  async status({ request, response, auth }) {
    const user = await auth.getUser()
    const freebie = await user.freebies().last()

    if (!freebie) {
      return response.status(200).send({
        status: 'success',
        data: {
          timeout: 0,
        },
      })
    }

    const timeout =
      moment(freebie.created_at).add(this.timeout, 'm').unix() -
      Date.now() / 1000

    return response.status(200).send({
      status: 'success',
      data: {
        timeout,
      },
    })
  }
}

module.exports = FreebieController
