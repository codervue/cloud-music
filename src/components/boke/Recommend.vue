<template>
  <div class="recommend">
    <h4 class="like">猜你喜欢</h4>
    <div class="box">
      <div
        class="card"
        v-for="(item, index) in result"
        :key="index"
        @click="itemClick()"
      >
        <div class="image"><img :src="item.picUrl" alt="" /></div>
        <div class="word">
          <span class="category">{{ item.secondCategory }}</span>
          <span class="desc">{{ item.rcmdText }}</span>
        </div>
      </div>
    </div>

    <!-- 推荐电台 -->
    <h4 class="like">推荐电台</h4>
    <div class="box">
      <div
        class="card"
        v-for="(item, index) in recommend"
        :key="index"
        @click="itemClick()"
      >
        <div class="image"><img :src="item.picUrl" alt="" /></div>
        <div class="word">
          <span class="category">{{ item.program.radio.category }}</span>
          <span class="desc">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { djRecommend, Recommend } from "@/network/boke";
export default {
  data() {
    return {
      result: "",
      recommend: "",
    };
  },
  created() {
    djRecommend().then((res) => {
      this.result = res.data;
    });
    Recommend().then((res) => {
      this.recommend = res.result;
    });
  },
  methods: {
    itemClick(id) {
      // this.$store.commit("djId", id);
      // this.$router.push("/djdetail");
      this.$message("暂无播放接口");
    },
  },
};
</script>

<style scoped='scoped'>
.like {
  margin: 10px 0;
}
.box {
  display: flex;
  justify-content: space-around;
}
.card {
  cursor: pointer;
}
.image img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
}
.word {
  width: 120px;
}
.category {
  font-size: 12px;
  color: #666666;
  border: solid 1px #919191;
}
.desc {
  font-size: 13px;
}
</style>