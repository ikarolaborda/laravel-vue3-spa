require('./bootstrap');

import {createApp} from "vue";
import App from "./layouts/App";
import VueSweetalert2 from "vue-sweetalert2";

import router from './routes/index';
const app = createApp(App);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');

