<template>
  <div class="route-mark" :class="routeDifficultyClass"></div>
</template>
<script>
export default {
  props: {
    route: Object
  },
  data() {
    return {
      testClass: "test-class"
    };
  },
  computed: {
    routeDifficultyClass() {
      let difficultyClass = "";
      if (this.route.difficulty === "Easy") {
        difficultyClass = { "difficulty-easy": true };
      }
      if (this.route.difficulty === "Average") {
        difficultyClass = { "difficulty-average": true };
      }
      if (this.route.difficulty === "Hard") {
        difficultyClass = { "difficulty-hard": true };
      }
      if (this.route.difficulty === "Very Hard") {
        difficultyClass = { "difficulty-very-hard": true };
      }
      return difficultyClass;
    }
  }
};
</script>
<style lang="scss">
.route-mark {
  width: 10px;
  height: 10px;
  margin-right: var(--mg-s);
}

.difficulty-easy {
  background: green;
}

.difficulty-average {
  background: yellow;
}

.difficulty-hard {
  background: tomato;
}

.difficulty-very-hard {
  background: red;
}
</style>
