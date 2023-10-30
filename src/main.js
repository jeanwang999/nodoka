import { createApp } from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(vueAxios, axios);
app.mount('#app');
