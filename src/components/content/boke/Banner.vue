<template>
  <div>
    <h4 class="dj">电台精选</h4>
    <div class="banner">
      <span v-for="(item, index) in result" :key="index"
        ><img :src="item.pic" alt=""
      /></span>
    </div>
  </div>
</template>

<script>
import { djBanner } from "@/network/boke.js";
export default {
  data() {
    return {
      result: "",
    };
  },
  created() {
    djBanner().then((res) => {
      this.result = res.data;
    });
  },
  methods: {},
};
</script>

<style scoped='scoped'>
.dj{
  margin: 10px 0;
}
.banner {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.banner span img {
  width: 250px;
  height: 100px;
  border-radius: 5px;
}
</style>