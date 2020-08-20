<template>
  <div class="dropdown-container">
    <div :id="inputName" class="dropdown-label">{{ inputLabel }}</div>
    <div class="dropdown-area" @click="toggleOptions">
      <div class="dropdown-select">{{ selectedValue || inputPlaceholder }}</div>
      <div
        class="dropdown-button"
        :class="{ 'dropdown-button__active': showOptions }"
      ></div>
    </div>
    <transition name="fade">
      <div class="dropdown-options-menu" v-if="showOptions">
        <div
          class="dropdown-option"
          v-for="(option, index) in inputOptions"
          :key="index"
          @click="selectOption(option)"
        >
          {{ option }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    inputName: String,
    inputLabel: String,
    inputOptions: Array,
    inputPlaceholder: {
      type: String,
      default: "Select"
    }
  },
  data() {
    return {
      showOptions: false,
      selectedValue: ""
    };
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    selectOption(option) {
      this.selectedValue = option;
      this.showOptions = false;
      this.$emit("optionSelected", this.selectedValue);
    }
  }
};
</script>
<style lang="scss">
.dropdown-container {
  display: inline-block;
  margin: var(--mg-m) 0;
  position: relative;
  width: 180px;
}

.dropdown-label {
  margin-bottom: var(--mg-s);
}

.dropdown-area {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  background: white;
  border-radius: 5px;
  padding: var(--p-s);
  color: black;
  cursor: pointer;
}

.dropdown-select {
  display: inline-block;
  margin-right: var(--mg-m);
}

.dropdown-button {
  display: inline-block;
  border: none;
  border-top: 10px black solid;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  width: 0;
  height: 0;
  transition: transform 0.2s ease-in-out;
}

.dropdown-button__active {
  transform: rotate(180deg);
}

.dropdown-options-menu {
  position: absolute;
  top: 100%;
  width: 100%;
}

.dropdown-option {
  padding: var(--p-s);
  border: 1px solid gray;
  background: white;
  color: black;
  cursor: pointer;
}
</style>
