<template>
  <div>
    <div class="new">
      <div v-for="(item, index) in list" :key="index">
        <div class="image" @click="itemClick(item.id)">
          <img v-lazy="item.cover + '?param=250y140'" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="singer">{{ item.artistName }}</div>
      </div>
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
  width: 250px;
  font-size: 13px;
}
.singer {
  font-size: 12px;
  color: #666666;
  margin: 5px 0;
}
</style>