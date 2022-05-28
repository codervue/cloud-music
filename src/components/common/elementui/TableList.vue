<template>
  <div class="table">
    <el-table
      :data="result"
      stripe
      lazy
      style="width: 100%"
      @row-dblclick="songsClick"
      :highlight-current-row="true"
      :row-class-name="activeRow"
    >
      <!-- 序号 -->
      <el-table-column label="" width="40">
        <template slot-scope="scope">
          <!-- 小喇叭 -->
          <span v-if="$store.state.songsId === scope.row.id" class="icon">
            <i class="iconfont icon-shengyintianchong"></i>
          </span>
          <!-- 索引 -->
          <span v-else>{{ handleIndex(scope.$index) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="标题"
        :width="length1"
      ></el-table-column>

      <el-table-column prop="ar[0].name" label="歌手" :width="length2">
      </el-table-column>

      <el-table-column
        prop="al.name"
        label="专辑"
        :width="length2"
        v-if="isShow"
      >
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
      default: 350,
    },
    length2: {
      type: Number,
      default: 150,
    },
    isShow: {
      type: Boolean,
      default: true,
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
    //加 0操作
    handleIndex(index) {
      index += 1;
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },
    //高亮选中行样式
    activeRow(row) {
      if (row.row.id === this.$store.state.songsId) {
        return "active-row";
      }
    },
  },
};
</script>

<style scoped='scoped'>
.icon i{
  /* 图片居中 */
  vertical-align: middle;
}
</style>