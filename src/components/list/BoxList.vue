<template>
  <div class="container">
    <div
      class="box"
      v-for="item in list"
      :key="item.id"
      @click="itemClick(item.id)"
    >
      <div class="image">
        <img v-lazy="item.picUrl || item.coverImgUrl" alt="" />
        <div class="playcount" v-if="item.playCount">
          <i class="iconfont icon-bofang"></i>
          {{ item.playCount | countFormat }}
        </div>
        <div class="btn" v-if="item.playCount">
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <p class="word">{{ item.name }}</p>
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
      this.$emit("itemClick", id);
    },
  },
};
</script>

<style scoped='scoped'>
.container {
  display: flex;
  flex-wrap: wrap;
}
.box {
  width: 20%;
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
.word {
  width: 100%;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  right: 5px;
  bottom: 10px;
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