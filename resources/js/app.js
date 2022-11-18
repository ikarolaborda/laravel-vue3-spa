require('./bootstrap');

import {createApp} from "vue";
import App from "./layouts/App";

import router from './routes/index';
const app = createApp(App);
app.use(router)
app.mount('#app');

