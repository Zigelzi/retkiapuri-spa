<template>
  <div>
    <h1>{{ nationalPark.name }}</h1>
    <div>
      <p>Longitude: {{ nationalPark.longitude }}</p>
      <p>Latitude: {{ nationalPark.latitude }}</p>
    </div>
    <div>
      <button class="retki-btn" @click="toggleShowAddHikeRouteForm">
        Add Hike Route
      </button>
    </div>
    <div v-if="showAddHikeRouteForm">
      <AddRouteForm />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AddRouteForm from "@/components/AddRouteForm";

export default {
  components: {
    AddRouteForm
  },
  data() {
    return {
      nationalParkId: this.$route.params.nationalParkId,
      nationalPark: {},
      showAddHikeRouteForm: false
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
    },
    toggleShowAddHikeRouteForm() {
      this.showAddHikeRouteForm = !this.showAddHikeRouteForm;
    }
  },
  created() {
    this.getNationalPark();
  }
};
</script>
