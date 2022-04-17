<template>
  <div class="swipe">
    <div class="recommend"><b>个性推荐></b></div>
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <el-image :src="item.imageUrl"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { getSwipe } from "@/network/find";

export default {
  name: "",
  data() {
    return {
      banners: [],
    };
  },
  created() {
    getSwipe().then((res) => {
      this.banners = res.banners;
    });
  },
  components: {},

  methods: {},
};
</script>

<style scoped='scoped'>
.recommend {
  font-size: 17px;
}
.el-image {
  height: 150px;
  border-radius: 10px;
}
</style>