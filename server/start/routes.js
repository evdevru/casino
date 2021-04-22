'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Event = use('Event')

Route.group(() => {
  Route.post('register', 'AuthController.register').middleware('throttle:10,60')
  Route.post('login', 'AuthController.login').middleware('throttle:10,60')
  Route.get('user', 'AuthController.user').middleware('auth')
  // Route.get('social/:provider', 'SocialController.redirect')
  Route.post('social', 'SocialController.handler')
}).prefix('api/v1/auth')

Route.group(() => {
  Route.put('profile', 'ProfileController.update')
  Route.post('freebie', 'FreebieController.store')
  Route.get('freebie', 'FreebieController.status')
  Route.post('promocode/using', 'PromocodeController.using')
})
  .prefix('api/v1')
  .middleware(['auth', 'throttle:10,60'])

Route.group(() => {
  Route.get('confirmation', 'ProfileController.confirmation')
  // Route.get('social/:provider', 'SocialController.redirect')
}).prefix('api/v1/user')
