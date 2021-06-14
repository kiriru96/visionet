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
      title: 'History',
      back: true
    },
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue')
  },
  {
    path: '/location',
    name: 'Location',
    meta: {
      title: 'Location',
      back: true
    },
    component: () => import(/* webpackChunkName: "location" */ '../views/admin/Location.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    meta: {
      title: 'Brand',
      back: true
    },
    component: () => import(/* webpackChunkName: "brand" */ '../views/admin/Brand.vue')
  },
  {
    path: '/customer',
    name: 'Customer',
    meta: {
      title: 'Customer',
      back: true
    },
    component: () => import(/* webpackChunkName: "customer" */'../views/admin/Customer.vue')
  },
  {
    path: '/device',
    name: 'Device',
    meta: {
      title: 'Device',
      back: true
    },
    component: () => import(/* webpackChunkName: "device" */'../views/admin/Device.vue')
  },
  {
    path: '/workorder',
    name: 'WorkOrder',
    meta: {
      title: 'WorkOrder',
      back: true
    },
    component: () => import(/* webpackChunkName: "workorder" */'../views/admin/WorkOrder.vue')
  },
  {
    path: '/warehouse',
    name: 'Warehouse',
    meta: {
      title: 'Warehouse',
      back: true
    },
    component: () => import(/* webpackChunkName: "warehouse" */'../views/admin/Warehouse.vue')
  },
  {
    path: '/backupleader',
    name: 'Backupleader',
    meta: {
      title: 'Backup Leader',
      back: true
    },
    component: () => import(/* webpackChunkName: "backupleader" */'../views/admin/Backupleader.vue')
  },
  {
    path: '/leader',
    name: 'Leader',
    meta: {
      title: 'Leader',
      back: true
    },
    component: () => import(/* webpackChunkName: "leader" */'../views/admin/Leader.vue')
  },
  {
    path: '/engginer/workorder',
    name: 'Work Order',
    meta: {
      title: 'Work Order',
      back: true
    },
    component: () => import(/* webpackChunkName: "engginerwo" */'../views/engginer/WorkOrder.vue')
  },
  {
    path: '/engginer/workorderhistory',
    name: 'Work Order Submit History',
    meta: {
      title: 'Work Order Submit History',
      back: true
    },
    component: () => import(/* webpackChunkName: "engginerwohistory" */'../views/engginer/WorkOrderHistory.vue')
  },
  {
    path: '/asset',
    name: 'Asset',
    meta: {
      title: 'Asset',
      back: true
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
    path: '/leader/workorderhistory',
    name: 'WorkOrderHistory',
    meta: {
      title: 'Work Order History',
      back: true
    },
    component: () => import(/* webpackChunkName: 'detailwo' */'../views/leader/WorkOrderHistory.vue')
  },
  {
    path: '/leader/workorder/detail',
    name: 'DetailWorkOrder',
    meta: {
      title: 'Detail',
      back: true
    },
    component: () => import(/* webpackChunkName: 'detailwo' */'../views/leader/EngginerWorkOrder.vue')
  },
  {
    path: '/administrator',
    name: 'Administrator',
    meta: {
      title: 'Administrator',
      back: true
    },
    component: () => import(/* webpackChunkName: 'adminstrator' */'../views/admin/Administrator.vue')
  }
]

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production' ? '/visionet-api/' : '',
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
