import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import biography from "../views/biography.vue";
import about from "../views/about.vue";
// views はページそれぞれ（SPA）用
// componentsはviewsの中のvueファイルで使用する

Vue.use(VueRouter);

const routes = [
  {
    path: "/ecc/msatou/Philosophia/", //これが最初に出る（index）
    name: "Home",
    component: Home,
  },
  {
    path: "/ecc/msatou/Philosophia/biography", //こっちで別ページを読み込み
    name: "biography",
    component: biography,
  },
  {
    path: "/ecc/msatou/Philosophia/about",
    name: "about",
    component: about,
  },
];

const router = new VueRouter({
  mode: "history",
  // base: "/philosophia/",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
