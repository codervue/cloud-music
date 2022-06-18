<template>
  <div class="go-top" v-if="$store.state.isShowSongsDetail">
    <span>
      <i class="iconfont icon-huidaodingbu"></i>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // window.addEventListener("scroll", this.backTop, true);
  },
  methods: {
    backTop(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped='scoped'>
.icon-huidaodingbu {
  font-size: 25px;
}
.go-top {
  position: fixed;
  bottom: 197px;
  right: 470px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: rgba(179, 171, 171, 0.163);
  cursor: pointer;
  padding: 5px;
}
.go-top:hover {
  background-color: rgba(102, 102, 102, 0.292);
}
</style>