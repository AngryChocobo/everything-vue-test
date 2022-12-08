import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todolist",
    name: "TodoList",
    // route level code-splitting
    // this generates a separate chunk (TodoList.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "TodoList" */ "../views/TodoList.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
