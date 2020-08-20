<template>
  <div class="national-park-card">
    <h2 class="card-title">{{ nationalPark.name }}</h2>
    <div class="card-content">
      <p>Distance: {{ nationalPark.distance }} km</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nationalPark: Object
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

.mini-img {
  height: 100%;
  max-width: 100%;
}
</style>
