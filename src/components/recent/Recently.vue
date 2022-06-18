<template>
  <div>
    <div class="top">
      <div class="left-word">
        <span class="play">最近播放</span>
        <span class="total">共{{ recentList.length }}首</span>
      </div>
      <div class="clear-list">
        <span @click="clearClick">清空列表</span>
      </div>
    </div>

    <row-list :list="recentList"></row-list>

    <table-list :result="recentList"></table-list>
  </div>
</template>

<script>
import RowList from "@/components/elementui/RowList.vue";
import TableList from "@/components/elementui/TableList.vue";

export default {
  data() {
    return {};
  },
  computed: {
    recentList() {
      return this.$store.state.recentList;
    },
  },
  components: {
    TableList,
    RowList,
  },
  methods: {
    //清空列表
    clearClick() {
      this.$store.state.recentList = [];
    },
  },
};
</script>

<style scoped='scoped'>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.play {
  font-size: 20px;
  font-weight: 600;
  margin-right: 5px;
}
.total {
  font-size: 14px;
  color: #919191;
}
.clear-list {
  color: #5a8ab9;
}
.clear-list span {
  cursor: pointer;
}
.clear-list span:hover {
  color: #137ce6;
}
</style>