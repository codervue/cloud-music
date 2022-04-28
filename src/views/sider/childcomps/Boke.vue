<template>
  <div id="boke">
    <banner></banner>
    <recommend></recommend>
  </div>
</template>

<script>
import Banner from "@/components/boke/Banner";
import Recommend from "@/components/boke/Recommend";
export default {
  name: "",
  data() {
    return {};
  },

  components: { Banner, Recommend },

  methods: {},
};
</script>

<style scoped='scoped'>
#boke {
  width: 780px;
  margin: 0 10px;
}

</style>