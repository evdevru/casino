const { hooks } = require('@adonisjs/ignitor')
const { ioc } = require('@adonisjs/fold')

hooks.after.providersRegistered(() => {
  const Validator = ioc.use('Validator')
  Validator.extend('notNull', notNull)
})

const notNull = (data, field, message, args, get) => {
  // get the character value
  const value = get(data, field)

  if (!value) throw message || `Field ${value} is required`
}
