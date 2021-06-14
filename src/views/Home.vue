<template>
  <v-main>
    <v-container fill-width
       class="d-flex justify-space-between flex-wrap">
      <v-card        
        class="pa-2"
        style="margin:10px"
        max-width="400"
        min-width="360"
        color="#26c6da"
        dark
        outlined>
        <v-card-title class="text-h5">
          All Asset
        </v-card-title>
        <v-card-subtitle>
          {{homeData.all}}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text>
            View Detail
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card        
        class="pa-2"
        style="margin:10px"
        max-width="400"
        min-width="360"
        color="#26da94"
        dark
        outlined>
        <v-card-title class="text-h5">
          New Asset
        </v-card-title>
        <v-card-subtitle>
          {{homeData.new}}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text>
            View Detail
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card        
        class="pa-2"
        style="margin:10px"
        max-width="400"
        min-width="360"
        color="#2677da"
        dark
        outlined>
        <v-card-title class="text-h5">
          Used Asset
        </v-card-title>
        <v-card-subtitle>
          {{homeData.used}}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text>
            View Detail
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card        
        class="pa-2"
        style="margin:10px"
        max-width="400"
        min-width="360"
        color="#da2641"
        dark
        outlined>
        <v-card-title class="text-h5">
          Damaged Asset
        </v-card-title>
        <v-card-subtitle>
          {{homeData.damaged}}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text>
            View Detail
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card        
        class="pa-2"
        style="margin:10px"
        max-width="400"
        min-width="360"
        color="#dada26"
        dark
        outlined>
        <v-card-title class="text-h5">
          Reparied Asset
        </v-card-title>
        <v-card-subtitle>
          {{homeData.repaired}}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text>
            View Detail
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card        
        class="pa-2"
        style="margin:10px"
        max-width="400"
        min-width="360"
        color="#9e9e9e"
        dark
        outlined>
        <v-card-title class="text-h5">
          Dump Asset
        </v-card-title>
        <v-card-subtitle>
          {{homeData.dump}}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn text>
            View Detail
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-snackbar
        :value="errorMsg"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
        >
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
    getHomeAPI() {
      if(this.isLoading) return
      
      const {dispatch} = this.$store

      dispatch('home/getHomeData')
    }
  },
  computed: {
    homeData() {
      return this.$store.getters['home/getData']
    },
    isLoading() {
      return this.$store.getters['home/getLoading']
    },
    errorMsg() {
      return this.$store.getters['home/getError']
    }
  }
}
</script>
