import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: localStorage.getItem('theme') === 'dark',
        themes: {
            light: {
                primary: '#FE860C'
            },
            dark: {
                primary: '#FE860C'
            }
        }
    }
})