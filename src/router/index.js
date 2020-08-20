import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NationalParksView from "../views/NationalParksView.vue";
import OneNationalParkView from "../views/OneNationalParkView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/national_parks",
    name: "nationalParks",
    component: NationalParksView
  },
  {
    path: "/national_park/:nationalParkId",
    name: "singleNationalPark",
    component: OneNationalParkView
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
