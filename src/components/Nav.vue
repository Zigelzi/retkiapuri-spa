<template>
  <nav id="nav" class="nav">
    <transition>
      <div class="nav-overlay" v-if="navOpen">
        <router-link
          @click.native="toggleNav"
          class="nav-item"
          :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link
          @click.native="toggleNav"
          class="nav-item"
          :to="{ name: 'nationalParks' }"
          >National Parks</router-link
        >
      </div>
    </transition>
    <r-menu-icon
      class="nav-icon"
      @menuIconClicked="toggleNav"
      :navOpen="navOpen"
    />
  </nav>
</template>
<script>
import MenuIcon from "@/components/MenuIcon";
export default {
  components: {
    "r-menu-icon": MenuIcon
  },
  data() {
    return {
      navOpen: false
    };
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    }
  }
};
</script>
<style lang="scss">
.nav-item {
  font-size: var(--text-30);
  color: black;
  padding: var(--p-m);
  &:hover {
    color: tomato;
  }
}
.nav-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
}
.nav-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(75, 75, 75, 0.5);
}
</style>
