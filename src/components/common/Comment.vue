<template>
  <div
    class="comment"
    v-loading="loading"
    element-loading-text="正在加载歌词中"
    element-loading-spinner="el-icon-loading"
  >
    <!-- 全部评论 -->
    <div v-if="comment.comments">
      <h3>全部评论({{ comment.total }})</h3>
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
          <div class="bottom">
            <div class="time">{{ item.timeStr }}</div>
            <div class="icon">
              <div class="count">
                <i class="iconfont icon-dianzan"></i
                ><span>{{ item.likedCount }}</span>
              </div>
              <div class="other"><i class="iconfont icon-fenxiang"></i></div>
              <div class="other"><i class="iconfont icon-pinglun"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="more"><span>更多精彩评论>>></span></div>
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
          <div class="bottom">
            <div class="time">{{ item.timeStr }}</div>
            <div class="icon">
              <div class="count">
                <i class="iconfont icon-dianzan"></i
                ><span>{{ item.likedCount }}</span>
              </div>
              <div class="other"><i class="iconfont icon-fenxiang"></i></div>
              <div class="other"><i class="iconfont icon-pinglun"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    // this.Loding();
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    //加载函数
    // Loading() {
    //   this.Loding = true;
    //   setTimeout(() => {
    //     this.Loading = false;
    //   }, 500);
    // },
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
.user {
  color: #5a8ab9;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
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
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
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
</style>