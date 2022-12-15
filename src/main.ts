// import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/custom_bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
