<template>
  <div>
    <el-table
      :data="result"
      stripe
      lazy
      style="width: 100%"
      @row-dblclick="songsClick"
    >
      <!-- @row-dblclick双击行绑定事件 -->
      <el-table-column
        prop="name"
        label="标题"
        :width="length1"
      ></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" :width="length2">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" :width="length2">
      </el-table-column>
      <el-table-column prop="dt" label="时长" width=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Array,
    },
    length1: {
      type: Number,
    },
    length2: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    //双击歌曲实现播放
    songsClick(row) {
      //将歌曲id提交到vuex中
      this.$store.commit("songsId", row.id);
    },
  },
};
</script>

<style scoped='scoped'>
</style>