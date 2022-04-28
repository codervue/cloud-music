<template>
  <div class="detail">
    <div class="video-detail" v-if="result || data">
      <h4>{{ $store.state.isVideo ? "视频详情" : "MV详情" }}</h4>
      <div class="video">
        <video :src="url || mUrl" width="500" height="280" controls></video>
      </div>
      <div class="title">{{ result.title || data.name }}</div>
      <!-- 图片加载问题易出现报错， -->
      <div
        class="creator"
        v-if="$store.state.isVideo ? result.coverUrl : data.cover"
      >
        <div class="image">
          <img
            :src="
              $store.state.isVideo
                ? result.creator.avatarUrl
                : data.artists[0].img1v1Url
            "
            alt=""
          />
        </div>
        <div class="name">
          {{
            $store.state.isVideo
              ? result.creator.nickname
              : data.artists[0].name
          }}
        </div>
      </div>
    </div>
    <!-- 相关-->
    <div class="relate">
      <h4>{{ $store.state.isVideo ? "相关视频" : "相关MV" }}</h4>
      <!-- 相关视频 -->
      <div v-if="$store.state.isVideo">
        <div
          class="relate-item"
          v-for="(item, index) in relateV"
          :key="index"
          @click="itemClick(item.vid)"
        >
          <div class="image"><img :src="item.coverUrl" alt="" /></div>
          <div>
            <div class="r-title">{{ item.title }}</div>
            <div class="r-name">by{{ item.creator[0].userName }}</div>
          </div>
        </div>
      </div>
      <!-- 相关mv -->
      <div v-else>
        <div
          class="relate-item"
          v-for="(item, index) in relateM"
          :key="index"
          @click="itemClick(item.id)"
        >
          <div class="image"><img :src="item.cover" alt="" /></div>
          <div>
            <div class="r-title">{{ item.name }}</div>
            <div class="r-name">by{{ item.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  videoDetail,
  videoUrl,
  mvDetail,
  mvUrl,
  relateVideo,
  relateMv,
} from "@/network/video";
export default {
  name: "videodetail",
  data() {
    return {
      url: "",
      result: "",
      data: "",
      mUrl: "",
      relateV: "",
      relateM: "",
    };
  },
  //此组件不能缓存，否则无法刷新数据
  activated() {
    console.log("---");
  },
  methods: {
    //视频详情
    videoDetail(id) {
      videoDetail(id).then((res) => {
        this.result = res.data;
      });
    },
    //videoUrl
    videoUrl(id) {
      videoUrl(id).then((res) => {
        this.url = res.urls[0].url;
      });
    },
    //mv详情
    mvDetail(id) {
      mvDetail(id).then((res) => {
        this.data = res.data;
      });
    },
    //mvUrl
    mvUrl(id) {
      mvUrl(id).then((res) => {
        this.mUrl = res.data.url;
      });
    },
    //相关视频
    relateVideo(id) {
      relateVideo(id).then((res) => {
        // console.log(res);
        this.relateV = res.data;
      });
    },
    //相关mv
    relateMv(id) {
      relateMv(id).then((res) => {
        // console.log(res);
        this.relateM = res.mvs;
      });
    },
    //点击相关回调
    itemClick(id) {
      this.$store.commit("videoId", id);
    },
  },
  watch: {
    "$store.state.videoId": {
      immediate: true,
      handler: function (id) {
        if (this.$store.state.isVideo) {
          this.videoDetail(id);
          this.videoUrl(id);
          this.relateVideo(id);
        } else {
          this.mvDetail(id);
          this.mvUrl(id);
          this.relateMv(id);
        }
      },
    },
  },
};
</script>

<style scoped='scoped'>
.detail {
  width: 780px;
  margin: 0 10px;
  display: flex;
}
h4 {
  margin: 10px 0;
}
.title {
  font-weight: 600;
}
.creator {
  display: flex;
  margin: 10px 0;
}
.creator img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.name {
  line-height: 54px;
}
.relate-item img {
  width: 150px;
  height: 90px;
  border-radius: 5px;
  cursor: pointer;
}
.r-title {
  width: 120px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 20px;
}
.r-name {
  font-size: 12px;
  color: #666666;
  margin: 10px 0;
}
.relate-item {
  display: flex;
}
.relate {
  margin-left: 10px;
}
</style>