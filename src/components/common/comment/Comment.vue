<template>
  <div class="comment">
    <!-- 全部评论 -->
    <div v-if="comment.comments">
      <h3>全部评论({{ comment.total }})</h3>
      <!-- 发表评论 -->
      <div class="my-comment">
        <div @click="(visible = true), (tType = 1)">发表我的评论</div>
      </div>
      <!-- 弹出框 -->
      <el-dialog
        title="评论"
        :visible.sync="visible"
        width="30%"
        center
        :modal="false"
      >
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请留下你的足迹"
          v-model="textarea"
          resize="none"
        ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="btnClick">发 表</el-button>
        </span>
      </el-dialog>

      <div
        class="content"
        v-for="(item, index) in comment.comments"
        :key="index"
      >
        <div class="image"><img :src="item.user.avatarUrl" alt="" /></div>
        <div class="right">
          <div class="top">
            <span class="user">{{ item.user.nickname }}:</span>
            <span class="word"> {{ item.content }}</span>
          </div>
          <!-- 被回复评论 -->
          <div
            class="center"
            v-for="(item1, index1) in item.beReplied"
            :key="index1"
          >
            <span class="user">@{{ item1.user.nickname }}:</span>
            <span class="word center-word"> {{ item1.content }}</span>
          </div>

          <div class="bottom">
            <div class="time">{{ item.timeStr }}</div>
            <div class="icon">
              <div class="count">
                <i
                  title="点赞"
                  class="iconfont icon-dianzan"
                  v-if="!item.liked"
                  @click="zanClick(index, item.commentId, item.liked, true)"
                ></i>
                <i
                  title="取消点赞"
                  class="iconfont icon-dianzan_kuai"
                  v-else
                  @click="zanClick(index, item.commentId, item.liked, true)"
                ></i>
                <span>{{ item.likedCount }}</span>
              </div>
              <div class="other"><i class="iconfont icon-fenxiang"></i></div>
              <div
                title="回复"
                class="other"
                @click="
                  (visible = true), (tType = 2), (commentId = item.commentId)
                "
              >
                <i class="iconfont icon-pinglun"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="more"><span @click="moreComment">更多精彩评论>>></span></div>
    </div>

    <!-- 热门评论 -->
    <!-- 外层需包裹一个div否则会因为：key中的index相同而报错 -->
    <div>
      <h3>热门评论</h3>

      <div
        class="content"
        v-for="(item, index) in comment.hotComments"
        :key="index"
      >
        <div class="image"><img :src="item.user.avatarUrl" alt="" /></div>
        <div class="right">
          <div class="top">
            <span class="user">{{ item.user.nickname }}:</span>
            <span class="word"> {{ item.content }}</span>
          </div>
          <div class="bottom hot-bottom">
            <div class="time">{{ item.timeStr }}</div>
            <div class="icon">
              <div class="count">
                <i
                  title="点赞"
                  class="iconfont icon-dianzan"
                  v-if="!item.liked"
                  @click="zanClick(index, item.commentId, item.liked, false)"
                ></i>
                <i
                  title="取消点赞"
                  class="iconfont icon-dianzan_kuai"
                  v-else
                  @click="zanClick(index, item.commentId, item.liked, false)"
                ></i>
                <span>{{ item.likedCount }}</span>
              </div>
              <div class="other"><i class="iconfont icon-fenxiang"></i></div>
              <div class="other" @click="hotComClick" title="回复">
                <i class="iconfont icon-pinglun"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postComment, likeComment } from "@/network/comment";
export default {
  props: {
    comment: {
      type: Object,
    },
    //评论类型（视频，歌曲，mv）
    commentType: {
      type: Number,
    },
    //资源id（歌曲、mvid）
    typeId: {
      //多个可能类型
      type: [String, Number],
    },
  },
  created() {},
  data() {
    return {
      loading: false,
      visible: false,
      textarea: "",
      //发送或回复评论
      tType: "",
      //评论id
      commentId: "",
    };
  },
  methods: {
    moreComment() {
      this.$message("似乎没有更多评论。。。");
    },
    //发表评论点击
    btnClick() {
      if (!this.$store.state.isLogin) return this.$message.error("请先登录哦!");
      let t = this.tType;
      let type = this.commentType;
      let id = this.typeId;
      let content = this.textarea;
      let commentId = this.commentId;
      if (content == "") return this.$message.error("请写点东西吧!");
      postComment(t, type, id, content, commentId).then((res) => {
        if (res.code === 200) {
          this.$message.success("评论成功!");
          this.visible = false;
        }
      });
    },
    //热门评论点击
    hotComClick() {
      this.$message({
        type: "warning",
        message: "热门评论暂时不支持回复哦!",
      });
    },
    //点赞
    zanClick(index, iid, liked, cType) {
      if (!this.$store.state.isLogin) return this.$message.error("请先登录哦!");
      let id = this.typeId;
      let cid = iid;
      let t = "";
      if (liked) {
        t = 0;
      } else {
        t = 1;
      }
      let type = this.commentType;
      likeComment(id, cid, t, type).then((res) => {
        if (res.code == 200) {
          this.$message.success(`${liked ? "取消点赞" : "点赞"}成功`);
          //判断点击的是全部评论还是热门评论
          if (cType) {
            this.comment.comments[index].liked =
              !this.comment.comments[index].liked;
            if (liked) {
              this.comment.comments[index].likedCount--;
            } else {
              this.comment.comments[index].likedCount++;
            }
          } else {
            this.comment.hotComments[index].liked =
              !this.comment.hotComments[index].liked;
            if (liked) {
              this.comment.hotComments[index].likedCount--;
            } else {
              this.comment.hotComments[index].likedCount++;
            }
          }
        }
      });
    },
  },
  watch: {},
};
</script>

<style scoped='scoped'>
h3 {
  margin: 10px 0;
}
.image img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.content {
  display: flex;
}
.top {
  font-size: 13px;
}
.center {
  background-color: rgba(179, 171, 171, 0.163);
  font-size: 12px;
  border-radius: 7px;
  margin-top: 10px;
  padding: 7px;
}
.center-word {
  color: #666;
}
.user {
  color: #5a8ab9;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
}
.word {
  /* 解决非文字文本不自动换行的问题 */
  word-break: break-all;
}
.right {
  width: 95%;
  margin-left: 10px;
}
.time {
  font-size: 12px;
  color: #919191;
}
.content {
  border-bottom: solid 0.1px rgba(220, 216, 216, 0.336);
  padding: 15px 0;
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.icon {
  width: 27%;
  display: flex;
  justify-content: space-between;
}
.icon div {
  cursor: pointer;
}
.count {
  display: flex;
  line-height: 20px;
}
.count span {
  font-size: 13px;
  color: #666;
  vertical-align: middle;
}
.other {
  width: 25px;
  text-align: center;
}
.more {
  margin: 20px auto;
  text-align: center;
  font-size: 14px;
}
.more span {
  display: inline-block;
  width: 27%;
  border: #919191 solid 1px;
  border-radius: 20px;
  padding: 5px 0;
  cursor: pointer;
}
.more:hover {
  color: #5a8ab9;
}
.my-comment {
  display: flex;
  justify-content: center;
}
.my-comment div {
  text-align: center;
  width: 150px;
  border-radius: 20px;
  font-size: 13px;
  background-color: rgba(179, 171, 171, 0.163);
  padding: 5px;
  cursor: pointer;
}
.my-comment div:hover {
  background-color: rgba(102, 102, 102, 0.292);
}
.icon-dianzan_kuai {
  color: #d61e1e;
}
</style>