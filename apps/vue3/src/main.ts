import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { i18n } from "./plugins/i18n";

// 改用按需加载就不需要手动配置plugin了;
// import Antdv from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

const app = createApp(App);

// app.use(Antdv);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
