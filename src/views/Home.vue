<template>
  <div class="home">
    <h1 class="mg-top-0 mg-bot-m">Retkiapuri</h1>
    <p class="subtext">Helping you to find and prepare for your hike!</p>
    <div>
      <AddRouteForm @hikeRouteAdded="updateHikeRoutes" />
    </div>
    <div class="hike-route-list">
      <HikeRoute
        v-for="hikeRoute in hikeRoutes"
        :key="hikeRoute.id"
        :hikeRoute="hikeRoute"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddRouteForm from "@/components/AddRouteForm";
import HikeRoute from "@/components/HikeRoute";
export default {
  name: "Home",
  components: {
    AddRouteForm,
    HikeRoute
  },
  data() {
    return {
      hikeRoutes: []
    };
  },
  methods: {
    updateHikeRoutes() {
      const path = "/hike_routes";

      axios
        .get(path)
        .then(res => {
          this.hikeRoutes = res.data.hike_routes;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.updateHikeRoutes();
  }
};
</script>
