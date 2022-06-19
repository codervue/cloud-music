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
</style>