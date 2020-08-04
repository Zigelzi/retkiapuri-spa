<template>
  <form class="form-container pad-m">
    <h1 class="form-title mg-bot-m mg-top-0">Add new national park</h1>
    <div class="input-group">
      <label class="form-label" for="route-name">Name</label>
      <input
        v-model="nationalPark.name"
        class="form-input pad-s"
        type="text"
        name="route-name"
        id=""
      />
    </div>
    <div class="input-group">
      <label class="form-label" for="park-longitude">Longitude</label>
      <input
        v-model="nationalPark.longitude"
        class="form-input pad-s input-short"
        type="number"
        name="park-longitude"
        id=""
      />
    </div>
    <div class="input-group">
      <label class="form-label" for="park-latitude">Latitude</label>
      <input
        v-model="nationalPark.latitude"
        class="form-input pad-s input-short"
        type="number"
        name="park-latitude"
        id=""
      />
    </div>
    <input
      class="form-submit"
      type="submit"
      value="Submit"
      @click.prevent="submitNationalPark"
    />
  </form>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      nationalPark: {
        name: "",
        longitude: 0.0,
        latitude: 0.0
      }
    };
  },
  methods: {
    submitNationalPark() {
      const path = "/national_park";
      const nationalPark = this.nationalPark;

      axios
        .post(path, nationalPark)
        .then(res => {
          let newNationalPark = res.data.national_park;
          this.$emit("nationalParkAdded", newNationalPark);
          this.goToNationalPark(newNationalPark);
        })
        .catch(error => {
          console.error(error);
          console.log(error);
        });
    },
    goToNationalPark(nationalPark) {
      this.$router.push({
        name: "singleNationalPark",
        params: {
          nationalParkId: nationalPark.id
        }
      });
    }
  }
};
</script>
<style lang="scss"></style>
