<template>
  <div id="app">
    <header>
      <r-nav />
    </header>
    <section>
      <router-view />
    </section>
  </div>
</template>

<style lang="scss">
#app {
  max-width: 920px;
  width: 90%;
  margin: var(--mg-m) auto var(--mg-xxl) auto;
}
</style>
<script>
import Nav from "@/components/Nav";
export default {
  components: {
    "r-nav": Nav
  }
};
</script>
