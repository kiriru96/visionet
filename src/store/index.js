import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth.store'
import {asset} from './asset.store'
import {dashboard} from './dashboard.store'
import {location} from './location.store'
import {brand} from './brand.store'
import {customer} from './customer.store'
import {device} from './device.store'
import {warehouse} from './warehouse.store'
import {admin} from './admin.store'
import {leader} from './leader.store'
import {backupleader} from './backupleader.store'
import {engginer} from './engginer.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    asset,
    dashboard,
    location
  }
})