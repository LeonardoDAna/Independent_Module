<template>
  <div class="all">
    <div class="">
      <div
        class="outsideBox"
        v-for="(item, index) in datas"
        :key="index"
        @click="goLink(item.path)"
      >
        <div class="modelBox">
          <div>
            {{ item.name }}
          </div>
          <div class="Tags">
            <template v-for="tagItem in item.tags" :key="tagItem">
              <tag>
                {{ tagItem }}
              </tag>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routerData } from "@/router/routerData.js";
import tag from "@/components/tag/index";
export default {
  name: "home",
  components: {
    tag,
  },
  data() {
    return {
      datas: routerData,
    };
  },
  methods: {
    goLink(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  // height: 100vh;
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
  padding: 20px;
  background-color: #000000;
}
.outsideBox {
  // width: 10%;
}
.modelBox {
  cursor: pointer;
  margin: 5px;
  color: #fff;
  transition: 0.5s;
  align-items: center;
  padding: 8px 20px;
  box-sizing: border-box;
  background-color: rgb(69, 85, 116);
}
.modelBox:hover {
  transform: scale(1.02);
}
</style>
