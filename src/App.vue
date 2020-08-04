<template>
  <div id="app">
    <header>
      <nav>
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'nationalParks' }"
          >National Parks</router-link
        >
      </nav>
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
