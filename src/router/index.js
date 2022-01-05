import Vue from 'vue';
import Router from 'vue-router';
import home from '@/page/home';
import user from '@/page/userTable';
import product from '@/page/productTable';
import login from '@/page/login';
import register from '@/page/register'

import VueRouter from "vue-router";

Vue.use(Router)
/*
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
*/

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/home',
      name: 'Home',
      component: home,
      children: [
        {
          name: 'User',
          path: 'user',
          component: user
        },
        {
          path: 'product',
          component: product
        }


      ]
    },
  ]
})
