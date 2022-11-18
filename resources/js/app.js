require('./bootstrap');

import {createApp} from "vue";
import App from "./layouts/App";
import PostsIndex from "./components/Posts/Index";
import PostsCreate from "./components/Posts/Create";
import { createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/', component: PostsIndex },
    { path: '/posts/create', component: PostsCreate },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(router)
app.mount('#app');

