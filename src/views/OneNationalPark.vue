<template>
  <div>
    <h1>{{ nationalPark.name }}</h1>
    <div>
      <p>Longitude: {{ nationalPark.longitude }}</p>
      <p>Latitude: {{ nationalPark.latitude }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      nationalParkId: this.$route.params.nationalParkId,
      nationalPark: {}
    };
  },
  methods: {
    getNationalPark() {
      const path = "/national_park/" + this.nationalParkId;
      axios
        .get(path)
        .then(res => {
          let nationalPark = res.data.national_park;
          this.nationalPark = nationalPark;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.getNationalPark();
  }
};
</script>
