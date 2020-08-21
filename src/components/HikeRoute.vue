<template>
  <div class="hike-route-card">
    <h1 class="card-title">{{ hikeRoute.name }}</h1>
    <p>Length: {{ hikeRoute.length }} km</p>
    <p>{{ hikeRoute.difficulty }}</p>
  </div>
</template>

<script>
export default {
  props: {
    hikeRoute: Object
  }
};
</script>
<style lang="scss">
.hike-route-card {
  background-color: var(--primary-brown-400);
  max-width: 100%;
  padding: var(--p-s) var(--p-m);
  margin: var(--mg-m) 0;
}
</style>
