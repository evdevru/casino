'use strict'

const Mail = use('Mail')
const Event = use('Event')

Event.on('user::register', async (user) => {
  await Mail.send('emails.registration', user.toJSON(), (message) => {
    message
      .to(user.email)
      .from(process.env.MAIL_FROM)
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
        .from(process.env.MAIL_FROM)
        .subject('Подтверждение почты')
    }
  )
})
