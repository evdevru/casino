'use strict'

const Mail = use('Mail')
const Event = use('Event')

Event.on('user::register', async (user) => {
  await Mail.send('emails.registration', user.toJSON(), (message) => {
    message
      .to(user.email)
      .from('info@wotaks.ru')
      .subject('Регистрация на сайте')
  })
})

Event.on('user::confirmation', async (user, confirmation) => {
  await Mail.send(
    'emails.confirmation',
    { user: user.toJSON(), confirmation, baseUrl: process.env.CLIENT_URL },
    (message) => {
      message
        .to(confirmation.email)
        .from('info@wotaks.ru')
        .subject('Подтверждение почты')
    }
  )
})
