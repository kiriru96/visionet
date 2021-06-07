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
      title: 'Profile',
      back: true
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/notification',
    name: 'Notification',
    meta: {
      title: 'Notification',
      back: true
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
    component: () => import(/* webpackChunkName: "location" */ '../views/admin/Location.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    meta: {
      title: 'Brand'
    },
    component: () => import(/* webpackChunkName: "brand" */ '../views/admin/Brand.vue')
  },
  {
    path: '/customer',
    name: 'Customer',
    meta: {
      title: 'Customer'
    },
    component: () => import(/* webpackChunkName: "customer" */'../views/admin/Customer.vue')
  },
  {
    path: '/device',
    name: 'Device',
    meta: {
      title: 'Device'
    },
    component: () => import(/* webpackChunkName: "device" */'../views/admin/Device.vue')
  },
  {
    path: '/workorder',
    name: 'WorkOrder',
    meta: {
      title: 'WorkOrder'
    },
    component: () => import(/* webpackChunkName: "workorder" */'../views/admin/WorkOrder.vue')
  },
  {
    path: '/warehouse',
    name: 'Warehouse',
    meta: {
      title: 'Warehouse'
    },
    component: () => import(/* webpackChunkName: "warehouse" */'../views/admin/Warehouse.vue')
  },
  {
    path: '/backupleader',
    name: 'Backupleader',
    meta: {
      title: 'Backup Leader'
    },
    component: () => import(/* webpackChunkName: "backupleader" */'../views/admin/Backupleader.vue')
  },
  {
    path: '/leader',
    name: 'Leader',
    meta: {
      title: 'Leader'
    },
    component: () => import(/* webpackChunkName: "leader" */'../views/admin/Leader.vue')
  },
  {
    path: '/engginer',
    name: 'Engginer',
    meta: {
      title: 'Engginer'
    },
    component: () => import(/* webpackChunkName: "engginer" */'../views/admin/Engginer.vue')
  },
  {
    path: '/asset',
    name: 'Asset',
    meta: {
      title: 'Asset'
    },
    component: () => import(/* webpackChunkName: "asset" */'../views/admin/Asset.vue')
  },
  {
    path: '/leader/workorder',
    name: 'LeaderWorkorder',
    meta: {
      title: 'Work Order',
      back: true
    },
    component: () => import(/* webpackChunkName: 'leaderwo' */'../views/leader/WorkOrder.vue')
  },
  {
    path: '/leader/workorder/detail',
    name: 'DetailWorkOrder',
    meta: {
      title: 'Detail',
      back: true
    },
    component: () => import(/* webpackChunkName: 'detailwo' */'../views/leader/EngginerWorkOrder.vue')
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
