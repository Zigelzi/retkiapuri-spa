<template>
  <div class="home">
    <h1 class="mg-top-0 mg-bot-m">Retkiapuri</h1>
    <p class="subtext">Helping you to find and prepare for your hike!</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
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
