import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/HelloWorld.vue';
import CookieConsent from '../components/CookieConsent.vue';
import LoginPrompt from '../components/LoginPrompt.vue';
import Bookmark from '../components/Bookmark.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cookie',
    name: 'Cookie',
    component: CookieConsent,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPrompt,
  },
  {
    path: '/bookmark',
    name: 'Bookmark',
    component: Bookmark,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
