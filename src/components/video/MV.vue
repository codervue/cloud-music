<template>
  <div class="mv">
    <h4 class="title">最新MV></h4>
    <div class="new">
      <div v-for="(item, index) in result" :key="index">
        <div class="image" @click="itemClick(item.id)">
          <img :src="item.cover+'?param=250y140'" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="singer">{{ item.artistName }}</div>
      </div>
    </div>
    <h4 class="title">网易出品></h4>
    <div class="new">
      <div v-for="(item, index) in netData" :key="index">
        <div class="image" @click="itemClick(item.id)"><img :src="item.cover+'?param=250y140'" alt="" /></div>
        <div class="name hide">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { newMv, netMv } from "@/network/video";
export default {
  data() {
    return {
      result: [],
      netData: [],
    };
  },
  created() {
    newMv().then((res) => {
      this.result = res.data.slice(0, 6);
    });
    netMv().then((res) => {
      this.netData = res.data.slice(0, 6);
    });
  },
  methods: {
    itemClick(id) {
      this.$store.commit("videoId", id);
      this.$store.commit("isVideo",false)
      this.$router.push("/videodetail").catch((error) => {});
    },
  },
};
</script>

<style scoped='scoped'>
.title {
  margin-left: 5px;
}
.new {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.image img {
  width: 250px;
  height: 140px;
  border-radius: 5px;
  cursor: pointer;
}
.name {
  font-size: 13px;
}
.singer {
  font-size: 12px;
  color: #666666;
  margin: 5px 0;
}
.hide {
  width: 250px;
}
</style>