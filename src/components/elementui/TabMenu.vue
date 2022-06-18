<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      text-color="#000"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in menuList"
        :key="item.path"
        >{{ item.title }}</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
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
  methods: {},
  watch: {},
};
</script>

<style scoped='scoped'>
</style>