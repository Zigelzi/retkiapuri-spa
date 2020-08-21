<template>
  <div>
    <h1>National Parks</h1>
    <div>
      <button class="retki-btn" @click="toggleAddParkVisibility">
        Add New
      </button>
      <transition name="fade">
        <div v-if="addParkFormVisible">
          <r-add-national-park />
        </div>
      </transition>
    </div>
    <div>
      <r-dropdown
        inputName="sortType"
        inputLabel="Sort"
        :inputOptions="sortOptions"
        @input="sortLocations"
      />
      <div>
        <h2>Total number of national parks: {{ nationalParks.length }}</h2>
      </div>
      <transition name="fade">
        <div v-if="!nationalParksLoading">
          <div v-for="nationalPark in nationalParks" :key="nationalPark.id">
            <r-national-park :nationalPark="nationalPark" />
          </div>
        </div>
        <div v-else>Loading...</div>
      </transition>
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
      nationalParksLoading: true,
      userPosition: {
        longitude: 0.0,
        latitude: 0.0
      },
      distance: 0.0,
      sortOptions: ["A-Z", "Z-A", "Closest first", "Furthest first"]
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
          // Successfully get position
          this.getDistanceToNationalParks,
          // Error on getting position
          this.logErrorMessage
        );
      }
    },
    getDistanceToNationalParks(position) {
      this.updateUserPosition(position);
      if (position) {
        this.nationalParks.forEach(nationalPark => {
          let dist = this.calculateDistanceBetweenTwoPoints(
            this.userPosition,
            nationalPark.longitude,
            nationalPark.latitude
          );
          nationalPark.distance = dist;

          // Trigger rendering of the national parks when data is available.
          this.nationalParksLoading = false;
        });
      }
    },
    updateUserPosition(position) {
      this.userPosition.longitude = position.coords.longitude;
      this.userPosition.latitude = position.coords.latitude;
      this.$emit("userPositionAcquired");
    },
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
    },
    logErrorMessage() {
      console.log("Unable to retrieve your location");
    },
    sortLocations(sortType) {
      if (sortType === "A-Z") {
        this.nationalParks.sort(this.sortByNameAscending);
      }
      if (sortType === "Z-A") {
        this.nationalParks.sort(this.sortByNameDescending);
      }
      if (sortType === "Closest first") {
        this.nationalParks.sort(this.sortByDistanceAscending);
      }

      if (sortType === "Furthest first") {
        this.nationalParks.sort(this.sortByDistanceDescending);
      }
    },
    sortByNameAscending(firstItem, secondItem) {
      let nameA = firstItem.name.toLowerCase();
      let nameB = secondItem.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    },
    sortByNameDescending(firstItem, secondItem) {
      let nameA = firstItem.name.toLowerCase();
      let nameB = secondItem.name.toLowerCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }

      return 0;
    },
    sortByDistanceAscending(firstItem, secondItem) {
      return firstItem.distance - secondItem.distance;
    },
    sortByDistanceDescending(firstItem, secondItem) {
      return secondItem.distance - firstItem.distance;
    }
  },
  created() {
    this.getNationalParks();
    this.getUserLocation();
  }
};
</script>
