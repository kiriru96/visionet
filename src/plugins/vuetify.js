import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: localStorage.getItem('theme') === 'dark',
        themes: {
            light: {
                primary: '#FB8C00'
            },
            dark: {
                primary: '#E65100'
            }
        }
    }
})