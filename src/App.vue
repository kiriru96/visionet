<template>
  <v-app>
    <v-app-bar
      v-if="logged"
      app
      color="primary"
      dark
      >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{titleBar}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <Dialog :dialog="alert" :title="`Logout`" :text="`Confirm Logout?`" v-on:ok="confirmLogout" v-on:no="cancelLogout"/>
    <v-navigation-drawer
      v-if="logged"
      v-model="drawer"
      fixed
      app
      >
      <v-list>
          <v-list-item @click="toLocation('/profile')">
            <v-list-item-avatar size="80">
              <v-icon x-large>mdi-account</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
          <v-list
            nav
            dense>
            <v-list-item
              @click="toLocation('/')">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-group
              :value="false"
              prepend-icon="mdi-file"
              no-action>
              <template v-slot:activator>
                <v-list-item-title>Master Data</v-list-item-title>
              </template>
              <v-list-item
                v-for="(item, i) in items[userType]"
                :key="i"
                @click="toLocation(item.link)">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-group
              :value="false"
              prepend-icon="mdi-account"
              no-action>
              <template v-slot:activator>
                <v-list-item-title>Account</v-list-item-title>
              </template>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-download</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Stock In</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-download</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Stock In</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-download</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Stock In</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-group
              :value="false"
              prepend-icon="mdi-printer"
              no-action>
              <template v-slot:activator>
                <v-list-item-title>Report</v-list-item-title>
              </template>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-download</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Stock In</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-upload</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Stock Out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item
              @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    Dialog: () => import('./components/Dialog.vue')
  },
  data: () => ({
    alert: false,
    mini: true,
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
        { text: "Asset", icon: 'mdi-folder', link: '/asset'},
        { text: "Work Order", icon: 'mdi-briefcase', link: '/workorder'},
        { text: "Location", icon: 'mdi-map  ', link: '/location'},
        { text: "Brand", icon: 'mdi-office', link: '/brand'},
        { text: "Device", icon: 'mdi-hammer-wrench', link: '/device'},
        { text: "Customer", icon: 'mdi-account-multiple', link: '/customer'},
        { text: "Warehouse", icon: 'mdi-home', link: '/warehouse'},
        { text: "Admin", icon: 'mdi-account', link: '/administrator'},
        { text: "Leader", icon: 'mdi-account', link: '/leader'},
        { text: "Backup Leader", icon: 'mdi-account', link: '/backupleader'},
        { text: "Engginer", icon: 'mdi-account', link: '/engginer'}
      ],
      [
        { text: "WO", icon: 'mdi-map  ', link: '/leader/workorder'},
        { text: "WO confirm", icon: 'mdi-history  ', link: '/leader/workorderhistory'}
      ],
      [
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
      this.alert = true
    },
    toLocation(link) {
      if(this.$route.path !== link) {
        this.$router.push(link)
      }
    },
    appNavAction() {
      this.selectedItem = 0
      if(this.backBar) {
        this.$router.go(-1)
      } else {
        this.drawer = !this.drawer
      }
    },
    confirmLogout() {
      this.alert = false
      this.$store.dispatch('auth/logout')
    },
    cancelLogout() {
      this.alert = false
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
