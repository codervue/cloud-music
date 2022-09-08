<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      :mode="mode"
      router
      text-color="#000"
      @select="select"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in menuList"
        :key="item.path"
        :disabled="isLogin === item.login"
      >
        {{ item.title }}
      </el-menu-item>
      <slot></slot>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
    },
    menuList: {
      type: Array,
    },
    activeIndex: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    select(e) {
      this.$emit("select",e);
    },
  },
  watch: {},
};
</script>

<style scoped='scoped'>
</style>