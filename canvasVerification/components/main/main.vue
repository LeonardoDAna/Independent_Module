<template>
  <div class="All">
    <el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      a: "hello world!",
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="css" scoped>
.aside-component_scroll {
  overflow-x: hidden;
}
.All {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow:hidden;
}
.el-container { 
  height: 100%;
}
.el-header {
  background-color: white;
  text-align: center;
  line-height: 60px;
  height: 100%;
}
.header {
  padding: 0;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  /* height: 100%; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  /* overflow-y: auto; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-main {
  text-align: left;
  line-height: 65px;
}
li {
  padding: 0;
}
</style>
