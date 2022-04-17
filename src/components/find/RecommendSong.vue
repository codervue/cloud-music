<template>
  <div class="recommend">
    <p class="recommend-a"><b>推荐歌单></b></p>
    <div class="container">
      <div
        class="box"
        v-for="(item, index) in recommend"
        :key="index"
        @click="itemClick(index)"
      >
        <div class="image"><img :src="item.picUrl" alt="" /></div>
        <p class="word">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "@/network/find";
export default {
  data() {
    return {
      recommend: "",
    };
  },
  created() {
    getRecommend().then((res) => {
      this.recommend = res.result;
    });
  },
  methods: {
    itemClick(index) {
      //提交歌单id至index
      this.$store.commit("listDetailId", this.recommend[index].id);
      this.$router.push("/listdetail").catch((err) => {});
    },
  },
};
</script>

<style scoped='scoped'>
.recommend-a {
  font-size: 17px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.image img {
  height: 150px;
  border-radius: 10px;
}
.word {
  width: 120px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.box {
  text-align: center;
  cursor: pointer;
}
</style>