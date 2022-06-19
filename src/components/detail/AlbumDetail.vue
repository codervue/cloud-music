<template>
  <div>
    <div class="top" v-if="detail">
      <div class="image"><img v-lazy="detail.picUrl" alt="" /></div>
      <div class="right">
        <ul>
          <li>
            <span class="album">专辑</span>
            <span class="name">{{ detail.name }}</span>
          </li>
          <li>
            <row-list :list="songs"></row-list>
          </li>
          <li>
            歌手:
            <span
              class="artist"
              @click="toArtist(detail.artist.id)"
              v-if="detail.artist"
              >{{ detail.artist.name }}</span
            >
          </li>
          <li>
            时间:
            <span>{{ detail.publishTime | dateFormat }}</span>
          </li>
          <li>
            简介:
            <span>{{ detail.description }}</span>
          </li>
        </ul>
      </div>
    </div>
    <table-list :result="songs"></table-list>
  </div>
</template>

<script>
import { getAlbum } from "@/network/album";
import RowList from "@/components/elementui/RowList";
import TableList from "@/components/elementui/TableList";
export default {
  data() {
    return {
      detail: {},
      songs: [],
    };
  },
  created() {
    let id = this.$route.params.id;
    this.getAlbum(id);
  },
  components: {
    RowList,
    TableList,
  },
  methods: {
    getAlbum(id) {
      getAlbum(id).then((res) => {
        this.detail = res.album;
        this.songs = res.songs;
      });
    },
    //点击歌手跳转
    toArtist(id) {
      this.$router.push("/artistdetail/" + id);
    },
  },
  watch: {},
};
</script>

<style scoped='scoped'>
.top {
  display: flex;
}
.image img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.right ul {
  list-style: none;
  padding: 0;
  margin: 0 10px;
}
.right ul li {
  margin: 5px 0;
}
.right ul li span {
  font-size: 13px;
}
.album {
  border: solid 1px #ec4141;
  color: #ec4141;
  padding: 2px;
  border-radius: 2px;
}
.name {
  font-size: 20px !important ;
  font-weight: 600;
  vertical-align: middle;
  margin-left: 10px;
}
.artist {
  color: #6191c2;
  cursor: pointer;
}
</style>