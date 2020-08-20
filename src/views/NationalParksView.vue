<template>
  <div>
    <h1>National Parks</h1>
    <div>
      <button class="retki-btn" @click="toggleAddParkVisibility">
        Add New
      </button>
      <div v-if="addParkFormVisible">
        <r-add-national-park />
      </div>
    </div>
    <div>
      <r-dropdown
        inputName="sortType"
        inputLabel="Sort"
        :inputOptions="['A-Z', 'Z-A']"
      />
      <div>
        <h2>Total number of national parks: {{ nationalParks.length }}</h2>
      </div>
      <div v-for="nationalPark in nationalParks" :key="nationalPark.id">
        <r-national-park
          :nationalPark="nationalPark"
          :userPosition="userPosition"
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NationalPark from "@/components/NationalPark";
import AddNationalPark from "@/components/AddNationalPark";
import Dropdown from "@/components/Dropdown";

export default {
  components: {
    "r-national-park": NationalPark,
    "r-add-national-park": AddNationalPark,
    "r-dropdown": Dropdown
  },
  data() {
    return {
      addParkFormVisible: false,
      nationalParks: [],
      userPosition: {
        longitude: 0.0,
        latitude: 0.0
      },
      distance: 0.0
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
    },
    getUserLocation() {
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          this.updateUserPosition,
          this.logErrorMessage
        );
      }
    },
    updateUserPosition(position) {
      this.userPosition.longitude = position.coords.longitude;
      this.userPosition.latitude = position.coords.latitude;
      this.$emit("userPositionAcquired");
    },
    logErrorMessage() {
      console.log("Unable to retrieve your location");
    }
  },
  created() {
    this.getNationalParks();
    this.getUserLocation();
  }
};
</script>
