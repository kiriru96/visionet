<template>
  <v-main>
    <v-container fill-width
      v-if="userType == 0"
      class="d-flex justify-space-between flex-wrap">
      <v-row
        no-gutters
        style="height: 160px">
        <v-col>
          <v-card      
            style="margin: 4px"  
            class="pa-2"
            color="#26c6da"
            dark
            outlined>
            <v-card-title>
              Customer
            </v-card-title>
            <v-card-subtitle v-text="homeData.customer">
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text
                @click="toLocation('/customer')">
                View Detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card      
            style="margin: 4px"  
            class="pa-2"
            color="#26c6da"
            dark
            outlined>
            <v-card-title>
              Asset
            </v-card-title>
            <v-card-subtitle>
              {{homeData.assets}}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text
                @click="toLocation('/asset')">
                View Detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card      
            style="margin: 4px"  
            class="pa-2"
            color="#26c6da"
            dark
            outlined>
            <v-card-title>
              Work Order
            </v-card-title>
            <v-card-subtitle>
              {{homeData.wo}}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text
                @click="toLocation('workorder')">
                View Detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card      
            style="margin: 4px"  
            class="pa-2"
            color="#26c6da"
            dark
            outlined>
            <v-card-title>
              Stock
            </v-card-title>
            <v-card-subtitle>
              {{homeData.stock}}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text
                @click="toLocation('/stock')">
                View Detail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-else>
      <v-img
        contain
        :height="120"
        lazy-src="../assets/visionet.jpg"
        src="../assets/visionet.jpg">
      </v-img>
    </v-container>
    <v-snackbar
        :value="errorMsg"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'">
        {{ errorMsg }}
        <v-divider
        class="mx-4"
        inset
        vertical
        ></v-divider>
        <v-btn
            dark
            text
            @click="removeError()">
            Close
        </v-btn>
    </v-snackbar>
  </v-main>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      asset_count: 10,
      timeout: 6000,
      color: '',
      mode: '',
    }
  },
  created() {
    this.getHomeAPI()
  },
  methods: {
    toLocation(link) {
      if(this.$route.path !== link) {
        this.$router.push(link)
      }
    },
    getHomeAPI() {
      if(this.isLoading) return
      
      if(this.userType == 0) {
        const {dispatch} = this.$store

        dispatch('home/getHomeData')
      }
    }
  },
  computed: {
    homeData() {
      console.log(this.$store.getters['home/getData'])
      return this.$store.getters['home/getData']
    },
    isLoading() {
      return this.$store.getters['home/getLoading']
    },
    userType() {
      return this.$store.getters['auth/getUserType']
    },
    errorMsg() {
      return this.$store.getters['home/getError']
    }
  }
}
</script>
