<template>
  <div class="new">
    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="image" @click="itemClick(item.id)">
        <img v-lazy="item.cover || item.imgurl + '?param=250y140'" alt="" />
        <div class="playcount" v-if="item.playCount">
          <i class="iconfont icon-bofang"></i>
          {{ item.playCount | countFormat }}
        </div>
        <div class="btn">
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="singer">{{ item.artistName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick(id) {
      this.$store.commit("isVideo", false);
      this.$router.push("/videodetail/" + id).catch((error) => {});
    },
  },
};
</script>

<style scoped='scoped'>
.new {
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 33.3%;
  padding: 10px;
  box-sizing: border-box;
}
.image {
  position: relative;
}
.image img {
  width: 100%;
  height: 140px;
  border-radius: 5px;
  cursor: pointer;
}
.name {
  width: 100%;
  font-size: 13px;
  margin: 3px 0;
}
.singer {
  font-size: 12px;
  color: #666666;
}
.playcount {
  font-size: 12px;
  position: absolute;
  top: 5px;
  right: 5px;
  color: #ffffff;
}
.playcount i {
  font-size: 12px;
  color: aliceblue;
}
.btn {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  right: 40%;
  bottom: 40%;
  text-align: center;
  line-height: 30px;
  opacity: 0;
  transition: all 1s;
  cursor: pointer;
}
.image:hover .btn {
  opacity: 1;
}
.btn i {
  font-size: 17px;
  color: red;
}
</style>