<template>
  <div id="find">
    <swipe></swipe>
    <recommend-song></recommend-song>
  </div>
</template>

<script>
import Swipe from "@/components/content/find/Swipe";
import RecommendSong from "@/components/content/find/RecommendSong";
export default {
  name: "",
  data() {
    return {};
  },

  components: { Swipe, RecommendSong },

  methods: {},
};
</script>

<style scoped='scoped'>

</style>