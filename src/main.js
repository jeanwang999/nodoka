import { createApp } from 'vue';
import axios from 'axios';
import vueAxios from 'vue-axios';
import LoadingPlugin from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(vueAxios, axios);
app.component('LoadingCp', LoadingPlugin);
app.mount('#app');
