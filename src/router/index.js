import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login'
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      title: 'Profile'
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/notification',
    name: 'Notification',
    meta: {
      title: 'Notification'
    },
    component: () => import(/* webpackChunkName: "notification" */ '../views/Notification.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      title: 'History'
    },
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue')
  },
  {
    path: '/location',
    name: 'Location',
    meta: {
      title: 'Location'
    },
    component: () => import(/* webpackChunkName: "location" */ '../views/Location.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next)=> {
  const token = localStorage.getItem('token');
  const type  = localStorage.getItem('user_type');

  const publicPages   = ['/login'];
  const authRequired  = !publicPages.includes(to.path);
  const isLogged      = token != null && type != null;
  
  document.title = to.meta.title ? to.meta.title : 'Home';

  if(authRequired && !isLogged) {
    return next('/login');
  } else if(!authRequired && isLogged) {
    return next('/');
  } else {
    return next();
  }
})

export default router
