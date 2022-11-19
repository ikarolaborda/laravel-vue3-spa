require('./bootstrap');

import {createApp, onMounted} from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import useAuth from "./composables/auth";
import { abilitiesPlugin } from "@casl/vue";
import ability from './services/ability';

import router from './routes/index';
const app = createApp({
    setup() {
        const { getLoggedInUser } = useAuth()
        onMounted(getLoggedInUser)
    }
})
app.use(router);
app.use(VueSweetalert2);
app.use(abilitiesPlugin, ability);
app.mount('#app');

