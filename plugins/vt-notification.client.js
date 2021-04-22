import Vue from 'vue'
import Notifications from 'vt-notifications'

Vue.use(Notifications)

export default ({ app }, inject) => inject('notify', Vue.prototype.$notify)
