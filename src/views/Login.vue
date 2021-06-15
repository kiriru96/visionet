<template>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
          <v-alert
            :value="errStatus"
            color="error"
            type="warning"
            transition="fade-transition">
            {{errMessage}}
          </v-alert>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    prepend-icon="mdi-account" 
                    name="login" 
                    label="Username" 
                    type="text" 
                    v-model="username" 
                    :rules="userRules" 
                    required>
                  </v-text-field>
                  <v-text-field
                    prepend-icon="mdi-lock" 
                    name="password" 
                    label="Password" 
                    id="password" 
                    type="password" 
                    v-model="password" 
                    :rules="passRules" 
                    autocomplete
                    required>
                  </v-text-field>
                  <v-select
                    v-model="type"
                    :items="typeList"
                    menu-props="auto"
                    label="Login As"
                    hide-details
                    prepend-icon="mdi-account-switch">
                  </v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary" 
                  @click="authentication" 
                  :loading="isLoading" 
                  :disabled="isLoading">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
</template>

<script>
export default {
  data() {
    return {
        valid: false,
        username: "",
        password: "",
        passRules: [ 
            (v) => !!v || "password is required",
            (v) => v && v.length >= 6 || "Password must more than 6 character"
            ],
        userRules: [ 
            v => !!v || "Username is required",
            v => v && v.length >= 5 || "Username must more than 5 character"
            ],
        loadaction: false,
        type: 'Admin',
        typeList: ['Admin', 'Leader', 'Backup Leader', 'Enginner']
    }
  },
  methods: {
    authentication() {
      const {username, password, type} = this;
      const {dispatch} = this.$store;
      
      if(this.$refs.form.validate()) {
        dispatch('auth/login', {username, password, type})
      }
    }
  },
  computed: {
    isLoading: function() {
      return this.$store.getters['auth/getLoading'];
    },
    errStatus: function() {
      return this.$store.getters['auth/getError'] === null ? false : true;
    },
    errMessage: function() {
      return this.$store.getters['auth/getError'];
    },
    getType: function() {
      return this.$store.getters['auth/getUserType']
    },
    isLogged: function() {
      return this.$store.getters['auth/logStatus'];
    }
  }
}
</script>
