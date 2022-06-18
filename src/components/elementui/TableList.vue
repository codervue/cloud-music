<template>
  <div class="table">
    <el-table
      :data="result"
      stripe
      lazy
      style="width: 100%"
      @row-dblclick="songsClick"
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

      <!-- 爱心 -->
      <el-table-column label="" width="40" v-if="isShow">
        <template slot-scope="scope">
          <!-- 未喜欢-->
          <span
            v-if="!isLiked(scope.row.id)"
            class="icon aixin"
            @click="likedMusic(scope.row.id)"
          >
            <i class="iconfont icon-aixin1"></i>
          </span>
          <!-- 喜欢 -->
          <span v-else class="icon aixin" @click="likedMusic(scope.row.id)">
            <i class="iconfont icon-aixin2"></i>
          </span>
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

      <el-table-column prop="dt" label="时长" width="">
        <template v-slot="{ row }">
          {{ (row.dt / 1000) | timeFormat }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { likeThisMusic } from "@/network/song";
export default {
  props: {
    result: {
      type: Array,
    },
    length1: {
      type: Number,
      default: 310,
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
  mounted() {
    //存储喜欢函数（底部导航栏需调用）
    this.$store.commit("likedFunction", this.likedMusic);
  },
  computed: {},
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
    isLiked(id) {
      return this.$store.state.likedMusicList.find((uid) => uid === id);
    },
    //喜欢、取消喜欢该音乐回调
    likedMusic(id) {
      if (!this.$store.state.isLogin) return this.$message.error("请先登录哦");
      let liked = this.isLiked(id);
      likeThisMusic(id, !liked).then((res) => {
        if (res.code === 200)
          return this.$message.success(`${liked ? "取消喜欢" : "喜欢"}成功`);
      });
      if (!liked) {
        this.$store.commit("setMusic", { type: "喜欢", data: id });
      } else {
        this.$store.commit("setMusic", { type: "取消喜欢", data: id });
      }
    },
  },
};
</script>

<style scoped='scoped'>
.icon i {
  /* 图片居中 */
  vertical-align: middle;
}
.icon-aixin2 {
  color: #d61e1e;
}
.aixin {
  cursor: pointer;
}
</style>