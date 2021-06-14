<template>
  <v-app>
    <v-app-bar
      v-if="logged"
      app
      color="primary"
      dark
      >
      <v-app-bar-nav-icon @click="appNavAction"><v-icon v-if="backBar">mdi-arrow-left</v-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{titleBar}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-if="logged"
      v-model="drawer"
      fixed
      temporary>
      <v-system-bar></v-system-bar>
      <v-list shaped>
          <v-list-item>
            <v-list-item-avatar size="80">
            </v-list-item-avatar>
          </v-list-item>
          <v-list
            nav
            dense>
            <v-list-item-group
              v-model="selectedItem"
              color="primary">
              <v-list-item
                v-for="(item, i) in items[userType]"
                :key="i"
                @click="$router.push(item.link)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: null,
    drawers: {
      // sets the open status of the drawer
      open: true,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: false,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: true,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: true,
      // sets the drawer to the mini variant, showing only icons, of itself (true) 
      // or showing the full drawer (false)
      mini: false
    },
    selectedItem: 0,
    items: [
      [
        { text: "Dashboard", icon: 'mdi-home', link: '/'},
        { text: "Asset", icon: 'mdi-folder', link: '/asset'},
        { text: "Work Order", icon: 'mdi-folder', link: '/workorder'},
        { text: "Location", icon: 'mdi-map  ', link: '/location'},
        { text: "Brand", icon: 'mdi-office', link: '/brand'},
        { text: "Device", icon: 'mdi-office', link: '/device'},
        { text: "Customer", icon: 'mdi-office', link: '/customer'},
        { text: "Warehouse", icon: 'mdi-office', link: '/warehouse'},
        { text: "Admin", icon: 'mdi-account', link: '/administrator'},
        { text: "Leader", icon: 'mdi-account', link: '/leader'},
        { text: "Backup Leader", icon: 'mdi-account', link: '/backupleader'},
        { text: "Engginer", icon: 'mdi-account', link: '/engginer'},
        { text: "System Log", icon: 'mdi-history  ', link: '/history'}
      ],
      [
        { text: "Dashboard", icon: 'mdi-home', link: '/'},
        { text: "WO", icon: 'mdi-map  ', link: '/leader/workorder'},
        { text: "WO confirm", icon: 'mdi-history  ', link: '/leader/workorderhistory'}
      ],
      [
        { text: "Dashboard", icon: 'mdi-home', link: '/'},
        { text: "WO", icon: 'mdi-map  ', link: '/leader/workorder'},
        { text: "WO confirm", icon: 'mdi-history  ', link: '/leader/workorderhistory'}
      ],
      [
        { text: "Dashboard", icon: 'mdi-home', link: '/'},
        { text: "WO", icon: 'mdi-map  ', link: '/engginer/workorder'},
        { text: "Work Order History", icon: 'mdi-history  ', link: '/engginer/workorderhistory'}
      ]
    ]
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
    appNavAction() {
      if(this.backBar) {
        this.$router.go(-1)
      } else {
        this.drawer = !this.drawer
      }
    }
  },
  computed: {
    logged() {
      return this.$store.getters['auth/logStatus']
    },
    userType() {
      return this.$store.getters['auth/getUserType']
    },
    titleBar() {
      return this.$route.meta.title
    },
    backBar() {
      return this.$route.meta.back
    }
  }
};
</script>
