<template>
  <div class="national-park-card">
    <h2 class="card-title">{{ nationalPark.name }}</h2>
    <div class="card-content">
      <p v-if="userPosition.latitude != 0">Distance: {{ updateDistance }} km</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nationalPark: Object,
    userPosition: Object
  },
  data() {
    return {
      distanceFromUser: 0
    };
  },
  methods: {
    calculateDistanceBetweenTwoPoints(
      startPosition,
      destinationPositionLong,
      destinationPositionLat
    ) {
      const earthRadiusKm = 6371;
      const lateralDifferenceInRad = this.convertDegreesToRadians(
        destinationPositionLat - startPosition.latitude
      );
      const longitudalDifferenceInRad = this.convertDegreesToRadians(
        destinationPositionLong - startPosition.longitude
      );
      const startLatitudeInRad = this.convertDegreesToRadians(
        startPosition.latitude
      );
      const destinationLatitudeInRad = this.convertDegreesToRadians(
        destinationPositionLat
      );
      const centralAngle =
        Math.sin(lateralDifferenceInRad / 2) *
          Math.sin(lateralDifferenceInRad / 2) +
        Math.sin(longitudalDifferenceInRad / 2) *
          Math.sin(longitudalDifferenceInRad / 2) *
          Math.cos(startLatitudeInRad) *
          Math.cos(destinationLatitudeInRad);

      const c =
        2 * Math.atan2(Math.sqrt(centralAngle), Math.sqrt(1 - centralAngle));
      let distanceBetweenPointsKm = earthRadiusKm * c;
      distanceBetweenPointsKm = Math.round(distanceBetweenPointsKm * 10) / 10; // Round the number to two decimals.
      return distanceBetweenPointsKm;
    },
    convertDegreesToRadians(degreeValue) {
      return degreeValue * (Math.PI / 180);
    }
  },
  computed: {
    updateDistance() {
      // Update the distance to national park when userPosition is updated.
      return this.calculateDistanceBetweenTwoPoints(
        this.userPosition,
        this.nationalPark.longitude,
        this.nationalPark.latitude
      );
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

.mini-img {
  height: 100%;
  max-width: 100%;
}
</style>
