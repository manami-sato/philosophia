import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Biography from "../views/Biography.vue";
import About from "../views/About.vue";
Vue.use(VueRouter);

// const route = "/";
const route = "/ecc/msatou/Philosophia/";

const routes = [
  {
    path: `${route}`,
    name: "Home",
    component: Home,
  },
  {
    path: `${route}biography`,
    name: "Biography",
    component: Biography,
  },
  {
    path: `${route}about`,
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
