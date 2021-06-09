<template>
  <v-main>
    <v-container class="d-flex justify-center flex-wrap">
    </v-container>
  </v-main>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {
  VMain, 
  VContainer, 
  VCard, 
  VCardActions, 
  VBtn, 
  VIcon, 
  VListItemContent,
  VListItem,
  VListItemTitle,
  VListItemSubtitle} from 'vuetify/lib'

export default {
  name: 'Home',
  components: {
    VMain, 
    VContainer, 
    VCard, 
    VCardActions, 
    VBtn, 
    VIcon, 
    VListItemContent,
    VListItem,
    VListItemTitle,
    VListItemSubtitle
    }
}
</script>
