<template>
  <div class="top">
    <div class="title">{{ item }}></div>
    <div class="category">
      <span
        v-for="(item, index) in category"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="tabClick(index, item.id)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
    },
    currentItem: {
      type: String,
    },
  },
  data() {
    return {
      currentIndex: 0,
      item: this.currentItem,
    };
  },
  methods: {
    // tabbar切换点击
    tabClick(index, id) {
      this.currentIndex = index;
      this.item = this.category[this.currentIndex].name;
      this.$emit("tabClick", id);
    },
  },
};
</script>

<style scoped='scoped'>
.top {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.title {
  line-height: 30px;
  height: 30px;
  font-size: 13px;
  text-align: center;
  width: 80px;
  border: solid 1px rgba(179, 171, 171, 0.336);
  border-radius: 15px;
}
.category span {
  font-size: 12px;
  color: #919191;
  cursor: pointer;
  padding: 2px 10px;
}
.active {
  /* 权重不够，颜色不生效 */
  color: #ec4141 !important;
  background-color: #fdf5f5;
  border-radius: 13px;
}
</style>