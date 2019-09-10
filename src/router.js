import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Accounts from './views/Accounts.vue'
import Account from './views/Account.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'
import SignOut from './views/SignOut.vue'
import CreateActivity from './views/CreateActivity.vue'
import Activities from './views/Activities.vue'
import Activity from './views/Activity.vue'
import YourActivities from './views/YourActivities.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    },
    {
      path: '/account/:id',
      name: 'account',
      component: Account
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signOut',
      name: 'signOut',
      component: SignOut
    },
    {
      path: '/createActivity',
      name: 'createActivity',
      component: CreateActivity
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    },
    {
      path: '/activity/:id',
      name: 'activity',
      component: Activity
    },
    {
      path: '/yourActivities',
      name: 'yourActivities',
      component: YourActivities
    },
  ]
})
