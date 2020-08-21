<template>
  <div class="national-park-card" @click="goToNationalPark">
    <h2 class="card-title">{{ nationalPark.name }}</h2>
    <div class="card-content">
      <p>Distance: {{ nationalPark.distance }} km</p>
      <div class="route-mark-container">
        <r-route-marker
          v-for="route in nationalPark.routes"
          :key="route.id"
        ></r-route-marker>
      </div>
    </div>
  </div>
</template>
<script>
import RouteMarker from "@/components/RouteMarker";
export default {
  props: {
    nationalPark: Object
  },
  components: {
    "r-route-marker": RouteMarker
  },
  methods: {
    goToNationalPark() {
      this.$router.push({
        name: "singleNationalPark",
        params: {
          nationalParkId: this.nationalPark.id
        }
      });
    }
  }
};
</script>
<style lang="scss">
.national-park-card {
  background-color: var(--primary-brown-400);
  max-width: 100%;
  padding: var(--p-s) var(--p-m);
  margin: var(--mg-m) 0;
}

.card-title {
  font-weight: 600;
  font-size: var(--text-18);
}

.route-mark-container {
  display: flex;
}
</style>
