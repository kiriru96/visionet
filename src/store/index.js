import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth.store'
import {asset} from './asset.store'
import {dashboard} from './dashboard.store'
import {location} from './location.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    asset,
    dashboard,
    location
  }
})