import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const BASE_URL = (() => {
  if (process.env.NODE_ENV === "production") {
    return process.env.BASE_URL + "/random-string";
  } else {
    return process.env.BASE_URL;
  }
})();

const router = createRouter({
  history: createWebHashHistory(BASE_URL),
  routes,
});

export default router;
