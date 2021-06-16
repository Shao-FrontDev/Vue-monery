import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Labels from "../views/Labels.vue";
import Statistics from "../views/Statistics.vue";
import NotFound from "../views/NotFound.vue";
import EditLabel from "../views/EditLabel.vue";
import Home from "../views/Home.vue";
import Detail from "../views/Detail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: "/home"
  },

  { path: "/home", name: "Home", component: Home },
  {
    path: "/labels",
    name: "Labels",
    component: Labels
  },
  { path: "/labels/edit/:id", component: EditLabel },

  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
