<template>
  <div>
    <!-- 隔离标签 -->
    <p></p>
    <row-list :list="result"></row-list>
    <div class="reason">
      <span>{{ reason }}</span>
    </div>
    <table-list :result="result"></table-list>
  </div>
</template>

<script>
import { getRecommendMusic } from "@/network/recommend";
import RowList from "@/components/elementui/RowList";
import TableList from "@/components/elementui/TableList";

export default {
  data() {
    return {
      reason: "",
      result: [],
    };
  },
  created() {
    this.getRecommendMusic();
  },
  components: {
    RowList,
    TableList,
  },
  methods: {
    getRecommendMusic() {
      getRecommendMusic().then((res) => {
        this.reason = res.data.recommendReasons[0].reason;
        this.result = res.data.dailySongs;
      });
    },
  },
};
</script>

<style scoped='scoped'>
.reason {
  margin: 15px 0;
}
.reason span {
  font-size: 15px;
  color: #919191;
}
</style>