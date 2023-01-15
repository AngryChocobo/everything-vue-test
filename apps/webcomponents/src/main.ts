import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

// 改用按需加载就不需要手动配置plugin了;
// import Antdv from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

// register webcomponents
import "./defineCustomElements";

const app = createApp(App);

// app.use(Antdv);
app.use(createPinia());
app.use(router);

app.mount("#app");
