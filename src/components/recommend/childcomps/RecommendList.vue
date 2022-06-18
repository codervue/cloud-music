<template>
  <div class="list">
    <flex-list :list="result" @itemClick="itemClick"></flex-list>
  </div>
</template>

<script>
import { getRecommendList } from "@/network/recommend";
import FlexList from "@/components/list/FlexList";

export default {
  data() {
    return {
      result: [],
    };
  },
  created() {
    this.getRecommendList();
  },
  components: { FlexList },
  methods: {
    getRecommendList() {
      getRecommendList().then((res) => {
        this.result = res.recommend;
      });
    },
    itemClick(id) {
      this.$router.push("/listdetail/" + id);
    },
  },
};
</script>

<style scoped='scoped'>
.list {
  padding-top: 20px;
}
</style>