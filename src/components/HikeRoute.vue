<template>
  <div class="hike-route-card">
    <h1 class="card-title">{{ hikeRoute.name }}</h1>
    <p>Length: {{ hikeRoute.length }} km</p>
  </div>
</template>

<script>
export default {
  props: {
    hikeRoute: Object
  }
};
</script>
