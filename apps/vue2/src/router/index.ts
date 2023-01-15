import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Vanilla",
    component: () =>
      import(
        /* webpackChunkName: "VanillaTodoList" */ "../components/vanilla/TodoApp.vue"
      ),
  },
  {
    path: "/element2",
    name: "Element2",
    component: () =>
      import(
        /* webpackChunkName: "Element2TodoList" */ "../components/element2/TodoApp.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
