<template>
  <div class="container">
    <div
      class="box"
      v-for="(item, index) in list"
      :key="item.id"
      @click="itemClick(index)"
    >
      <div class="image"><img v-lazy="item.picUrl" alt="" /></div>
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
    itemClick(index) {
      this.$router
        .push("/listdetail/" + this.list[index].id)
        .catch((err) => {});
    },
  },
};
</script>

<style scoped='scoped'>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.image img {
  height: 150px;
  border-radius: 5px;
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