<template>
  <div class="recommend">
    <el-carousel :interval="4000" type="card" height="150px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <el-image :src="item.imageUrl"></el-image>
      </el-carousel-item>
    </el-carousel>
    <p class="recommend-a"><b>推荐歌单></b></p>
    <box-list :list="recommend" />
  </div>
</template>

<script>
import { getSwipe, getRecommend } from "@/network/find";
import BoxList from "@/components/list/BoxList";
export default {
  data() {
    return {
      banners: [],
      recommend: [],
    };
  },
  created() {
    this.getData();
  },
  components: {
    BoxList,
  },
  methods: {
    getData() {
      getSwipe().then((res) => {
        this.banners = res.banners;
      });
      getRecommend().then((res) => {
        this.recommend = res.result;
      });
    },
  },
};
</script>

<style scoped='scoped'>
.recommend{
  margin-top: 20px;
}
.el-image {
  height: 150px;
  border-radius: 10px;
}
.recommend-a {
  font-size: 17px;
}
</style>