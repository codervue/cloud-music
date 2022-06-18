<template>
  <div id="app">
    <lay-out />
  </div>
</template>

<script>
import LayOut from "./LayOut.vue";

export default {
  name: "App",
  components: {
    LayOut,
  },
  created() {},
  beforeCreate() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>
