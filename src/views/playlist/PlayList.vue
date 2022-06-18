<template>
  <div class="play-list">
    <!-- 播放列表 -->
    <div class="list">播放列表({{$store.state.playList.length}})</div>
    <table-list
      :result="result"
      :length1="90"
      :length2="90"
      :isShow="false"
    ></table-list>
  </div>
</template>

<script>
import TableList from "@/components/elementui/TableList.vue";

export default {
  data() {
    return {};
  },
  computed: {
    result() {
      return this.$store.state.playList;
    },
  },
  created() {},
  components: {
    TableList,
  },
  methods: {},
  watch: {},
};
</script>

<style scoped='scoped'>
.list {
  color: #919191;
  font-size: 13px;
  text-align: center;
  margin: 5px 0;
}
</style>