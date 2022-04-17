<template>
  <div id="find">
    <swipe></swipe>
    <recommend-song></recommend-song>
  </div>
</template>

<script>
import Swipe from "@/components/find/Swipe";
import RecommendSong from "@/components/find/RecommendSong";
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
#find {
  width: 780px;
  margin: 0 10px;
}
</style>