import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import router from "./router/index.js";
import axios from "axios";
window.axios = axios;

import {
  Input,
  Form,
  Select,
  Avatar,
  Table,
  Card,
  Menu,
  List,
  Drawer,
  Button,
  message,
} from "ant-design-vue";
import App from "./App.vue";
import { registerGlobalComponents } from "./utils/import.js";

import "./static/fontawesome-free-6.4.0-web/css/all.min.css";
import "./style.css";
import "ant-design-vue/dist/reset.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

let app;

app = createApp(App);

registerGlobalComponents(app);

app.use(pinia);
app.use(router);
app.use(Input);
app.use(Form);
app.use(Select);
app.use(Avatar);
app.use(Table);
app.use(Card);
app.use(Menu);
app.use(List);
app.use(Button);
app.use(Drawer);

app.mount("#app");

app.config.globalProperties.$message = message;
