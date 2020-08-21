<template>
  <form class="form-container pad-m">
    <h1 class="form-title mg-bot-m mg-top-0">Add new route</h1>
    <div class="input-group">
      <label class="form-label" for="route-name">Name</label>
      <input
        v-model="hikeRoute.name"
        class="form-input pad-s"
        type="text"
        name="route-name"
        id=""
      />
    </div>
    <div class="input-group">
      <label class="form-label" for="route-length">Length</label>
      <input
        v-model="hikeRoute.length"
        class="form-input pad-s input-short"
        type="number"
        name="route-length"
        id=""
      />
    </div>
    <div>
      <r-dropdown
        inputName="routeDifficulty"
        inputLabel="Difficulty"
        :inputOptions="routeDifficulties"
        v-model="hikeRoute.difficulty"
      />
    </div>

    <input
      class="retki-btn"
      type="submit"
      value="Submit"
      @click.prevent="submithikeRoute"
    />
  </form>
</template>
<script>
import axios from "axios";
import Dropdown from "@/components/Dropdown";
export default {
  props: {
    nationalParkId: [Number, String]
  },
  components: {
    "r-dropdown": Dropdown
  },
  data() {
    return {
      hikeRoute: {
        name: "",
        length: 0,
        difficulty: ""
      },
      routeDifficulties: ["Easy", "Average", "Hard", "Very hard"]
    };
  },
  methods: {
    submithikeRoute() {
      const path = "/hike_route";
      let hikeRoute = this.hikeRoute;
      hikeRoute.national_park_id = this.nationalParkId;

      axios
        .post(path, hikeRoute)
        .then(res => {
          let newHikeRoute = res.data.hike_route;
          this.$emit("hikeRouteAdded", newHikeRoute);
        })
        .catch(error => {
          console.error(error);
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss"></style>
