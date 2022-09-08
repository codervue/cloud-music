<template>
  <div class="mv">
    <h4 class="title">最新MV></h4>
    <mv-list :list="result"></mv-list>

    <h4 class="title">网易出品></h4>
    <mv-list :list="netData"></mv-list>
  </div>
</template>

<script>
import { newMv, netMv } from "@/network/video";
import MvList from "@/components/list/MvList";
export default {
  data() {
    return {
      result: [],
      netData: [],
    };
  },
  components: {
    MvList,
  },
  created() {
    newMv().then((res) => {
      this.result = res.data.slice(0, 6);
    });
    netMv().then((res) => {
      this.netData = res.data.slice(0, 6);
    });
  },
  methods: {},
};
</script>

<style scoped='scoped'>
.title {
  margin-left: 5px;
}
h4{
  margin: 10px 0;
}
</style>