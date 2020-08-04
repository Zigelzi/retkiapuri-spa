import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NationalParks from "../views/NationalParks.vue";
import OneNationalPark from "../views/OneNationalPark.vue";

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
    component: NationalParks
  },
  {
    path: "/national_park/:nationalParkId",
    name: "singleNationalPark",
    component: OneNationalPark
  }
];

const router = new VueRouter({
  routes
});

export default router;
