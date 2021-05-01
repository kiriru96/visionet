<template>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field prepend-icon="mdi-account" name="login" label="Username" type="text" v-model="username" :rules="userRules" required></v-text-field>
                  <v-text-field prepend-icon="mdi-lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="passRules" required></v-text-field>
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
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
</template>

<script>
import {
  VMain, 
  VContainer, 
  VLayout, 
  VFlex, 
  VCard, 
  VToolbar, 
  VToolbarTitle, 
  VSpacer, 
  VCardText, 
  VForm, 
  VTextField, 
  VSelect, 
  VCardActions} from 'vuetify/lib'
export default {
  components: {
    VMain,
    VContainer,
    VLayout, 
    VFlex, 
    VCard, 
    VToolbar, 
    VSpacer, 
    VCardText, 
    VForm, 
    VTextField,  
    VSelect, 
    VCardActions,
    VToolbarTitle
  },
  data() {
    return {
        valid: false,
        username: "",
        password: "",
        passRules: [ 
            (v) => !!v || "password is required",
            (v) => v && v.length > 6 || "Password must more than 6 character"
            ],
        userRules: [ 
            v => !!v || "Username is required",
            v => v && v.length > 5 || "Username must more than 5 character"
            ],
        loadaction: false,
        errMessage: '',
        type: 'Enginner',
        typeList: ['Enginner', 'Leader', 'Backup Leader', 'Admin']
    }
  }
}
</script>
