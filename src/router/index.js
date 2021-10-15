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
    path: '/engineer',
    name: 'Engineer',
    meta: {
      title: 'Engineer',
      back:true
    },
    component: () => import(/* webpackChunkName: "engineer" */'../views/admin/Engineer.vue')
  },
  {
    path: '/engineer/workorder',
    name: 'Work Order',
    meta: {
      title: 'Work Order',
      back: true
    },
    component: () => import(/* webpackChunkName: "engineerwo" */'../views/engineer/WorkOrder.vue')
  },
  {
    path: '/engineer/workorderhistory',
    name: 'Work Order Submit History',
    meta: {
      title: 'Work Order Submit History',
      back: true
    },
    component: () => import(/* webpackChunkName: "engineerwohistory" */'../views/engineer/WorkOrderHistory.vue')
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
    component: () => import(/* webpackChunkName: 'historywo' */'../views/leader/WorkOrderHistory.vue')
  },
  {
    path: '/leader/workorder/detail',
    name: 'DetailWorkOrder',
    meta: {
      title: 'Detail',
      back: true
    },
    component: () => import(/* webpackChunkName: 'detailwo' */'../views/leader/EngineerWorkOrder.vue')
  },
  {
    path: '/administrator',
    name: 'Administrator',
    meta: {
      title: 'Administrator',
      back: true
    },
    component: () => import(/* webpackChunkName: 'adminstrator' */'../views/admin/Administrator.vue')
  },
  {
    path: '/stockin',
    name: 'StockIn',
    meta: {
      title: 'Stock In'
    },
    component: () => import(/* webpackChunkName: 'stockin' */'../views/admin/StockIn.vue')
  },
  {
    path: '/stockout',
    name: 'StockOut',
    meta: {
      title: 'Stock Out'
    },
    component: () => import(/* webpackChunkName: 'stockout' */'../views/admin/StockOut.vue')
  },
  {
    path: '/stockoutreport',
    name: 'StockOutReport',
    meta: {
      title: 'Stock Out Report'
    },
    component: () => import(/* webpackChunkName: 'stockoutreport' */'../views/admin/StockOutReport.vue')
  },
  {
    path: '/stockinreport',
    name: 'StockInReport',
    meta: {
      title: 'Stock In Report'
    },
    component: () => import(/* webpackChunkName: 'stockinreport' */'../views/admin/StockInReport.vue')
  },
  {
    path: '/stockopnamereport',
    name: 'StockOpnameReport',
    meta: {
      title: 'Stock Opname Report'
    },
    component: () => import(/* webpackChunkName: 'stockopnamereport' */'../views/admin/StockOpnameReport.vue')
  },
  {
    path: '/engineer/submitwo',
    name: 'SubmitWO',
    meta: {
      title: 'Submit WO'
    },
    component: () => import(/* webpackChunkName: 'submitwo' */'../views/engineer/SubmitWorkOrder.vue')
  },
  {
    path: '/engineer/revisiwo',
    name: 'RevisiWO',
    meta: {
      title: 'Revisi WO'
    },
    component: () => import(/* webpackChunkName: 'submitwo' */'../views/engineer/SubmitWorkOrder.vue')
  },
  {
    path: '/stock',
    name: 'Stock',
    meta: {
      title: 'Stock'
    },
    component: () => import(/* webpackChunkName: 'stock' */'../views/admin/Stock.vue')
  }, {
    path: '/woconfirm',
    name: 'ConfirmWO',
    meta: {
      title: 'Confirm WO'
    },
    component: () => import(/* webpackChunkName: 'confirmWO' */'../views/leader/DetailWOSubmit.vue')
  },
  {
    path: '/wosubmitdetail',
    name: 'EngineerWOSubmitDetail',
    meta: {
      title: 'WO Submit Detail'
    },
    component: () => import(/* webpackChunkName: 'wosubmitdetail' */'../views/engineer/DetailWoSubmit.vue')
  },
  {
    path: '/stockopname',
    name: 'StockOpname',
    meta: {
      title: 'Stock Opname'
    },
    component: () => import(/* webpackChunkName: 'stockopname' */'../views/admin/StockOpname.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      title: 'Settings'
    },
    component: () => import(/* webpackChunkName: 'settings' */'../views/Settings.vue')
  },
  {
    path: '/woreport',
    name: 'WOReport',
    meta: {
      title: 'WO Report',
    },
    component: () => import(/* webpackChunkName: 'woreport' */'../views/admin/WOReport.vue')
  }
]

const router = new VueRouter({
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
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
