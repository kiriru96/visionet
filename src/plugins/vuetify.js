import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import {
  VApp, 
  VBtn, 
  VAppBar, 
  VAppBarNavIcon, 
  VToolbarTitle, 
  VSpacer, 
  VIcon, 
  VNavigationDrawer, 
  VSystemBar, 
  VList, 
  VListItem, 
  VListItemAvatar, 
  VImg, 
  VListItemGroup,
  VListItemIcon,
  VListItemContent,
  VListItemTitle,
  VMain, 
  VContainer, 
  VLayout, 
  VFlex, 
  VCard, 
  VToolbar, 
  VCardText, 
  VForm, 
  VTextField, 
  VSelect, 
  VCardActions,
  VListItemSubtitle} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
    components: {
        VApp, 
        VBtn, 
        VAppBar, 
        VAppBarNavIcon, 
        VToolbarTitle, 
        VSpacer, 
        VIcon, 
        VNavigationDrawer, 
        VSystemBar, 
        VList, 
        VListItem, 
        VListItemAvatar, 
        VImg, 
        VListItemGroup,
        VListItemIcon,
        VListItemContent,
        VListItemTitle,
        VMain, 
        VContainer, 
        VLayout, 
        VFlex, 
        VCard, 
        VToolbar, 
        VCardText, 
        VForm, 
        VTextField, 
        VSelect, 
        VCardActions,
        VListItemSubtitle
    },
    directives: {
      Ripple,
    },
});

export default new Vuetify({
});
