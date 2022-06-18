<template>
  <div>
    <div
      class="album"
      v-for="(item, index) in list"
      :key="index"
      @click="itemClick(item.id)"
    >
      <div class="left">
        <div class="image" v-if="item.picUrl">
          <img v-lazy="item.picUrl" alt="" />
        </div>
        <div class="image" v-if="item.coverImgUrl">
          <img v-lazy="item.coverImgUrl" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
      <div class="right">
        <div class="count" v-if="item.trackCount">{{ item.trackCount }}首</div>
        <div class="creator" v-if="item.creator">
          by{{ item.creator.nickname }}
        </div>
        <div class="singer" v-if="item.artist">{{ item.artist.name }}</div>
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
      this.$emit("itemClick", id);
    },
  },
};
</script>

<style scoped='scoped'>
.album {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.album:nth-child(odd) {
  background-color: #f9f9f9;
}
.album:hover {
  background-color: #e0e0e0;
}
.left {
  width: 65%;
  display: flex;
  align-items: center;
}
.image img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 10px;
  vertical-align: middle;
}
.name {
  font-size: 15px;
  color: #2c3e50;
}
.right {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count {
  width: 50%;
  font-size: 12px;
  color: #919191;
}
.creator {
  width: 50%;
  font-size: 13px;
  color: #666;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.singer {
  font-size: 13px;
  color: #666;
}
</style>