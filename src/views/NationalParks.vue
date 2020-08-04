<template>
  <div>
    <h1>National Parks</h1>
    <div>
      <button @click="toggleAddParkVisibility">Add New</button>
      <div v-if="addParkFormVisible">
        <AddNationalPark />
      </div>
    </div>
    <div>
      <div v-for="nationalPark in nationalParks" :key="nationalPark.id">
        {{ nationalPark.name }}
        {{ nationalPark.longitude }}
        {{ nationalPark.latitude }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AddNationalPark from "@/components/AddNationalPark";

export default {
  components: {
    AddNationalPark
  },
  data() {
    return {
      addParkFormVisible: false,
      nationalParks: []
    };
  },
  methods: {
    toggleAddParkVisibility() {
      this.addParkFormVisible = !this.addParkFormVisible;
    },
    getNationalParks() {
      const path = "/national_parks";
      axios
        .get(path)
        .then(res => {
          let nationalParks = res.data.national_parks;
          this.nationalParks = nationalParks;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.getNationalParks();
  }
};
</script>
