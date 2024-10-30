<template>
  <div>
    <div id="domId"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewToken: "7e35453341f046e5a0a1f08cbf856374",
      viewer3D: "",
      app: "",
      viewAdded: false,
      isMapLoaded: false,
      loaderConfig: null,
    };
  },
  mounted() {
    // 设置BIMFACE JSSDK加载器的配置信息
    var loaderConfig = new BimfaceSDKLoaderConfig();
    loaderConfig.viewToken = this.viewToken;
    // 加载BIMFACE JSSDK加载器
    BimfaceSDKLoader.load(
      loaderConfig,
      this.successCallback,
      this.failureCallback
    );
  },

  methods: {
    setButtonText(btnId, text) {
      var dom = document.getElementById(btnId);
      if (dom != null && dom.nodeName == "BUTTON") {
        dom.innerText = text;
      }
    },
    // 加载成功回调函数
    successCallback(viewMetaData) {
      console.log("success");
      var dom4Show = document.getElementById("domId");
      new Glodon.Bimface.Application.WebApplicationDemo(viewMetaData, dom4Show);
      // var that = this;
      // var dom4Show = document.getElementById("domId");
      // // 设置WebApplication3D的配置项
      // var webAppConfig =
      //   new Glodon.Bimface.Application.WebApplication3DConfig();
      // webAppConfig.domElement = dom4Show;
      // webAppConfig.enableLogarithmicDepthBuffer = true;
      // // 创建WebApplication3D，用以显示模型
      // var app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
      // app.addView(viewMetaData.viewToken);
      // var viewer3D = app.getViewer();
      // that.viewer3D = viewer3D;
      // // 增加加载完成监听事件
      // viewer3D.addEventListener(
      //   Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
      //   function () {
      //     that.viewAdded = true;
      //     //自适应屏幕大小
      //     window.onresize = function () {
      //       viewer3D.resize(
      //         document.documentElement.clientWidth,
      //         document.documentElement.clientHeight - 40
      //       );
      //     };
      //     // 渲染场景
      //     viewer3D.render();
      //   }
      // );
    },
    // 加载失败回调函数
    failureCallback(error) {
      console.log(error);
    },

    // 添加构件嵌套关系
    loadMap() {
      var that = this;
      if (!that.viewAdded) {
        return;
      }
      if (!that.isMapLoaded) {
        // 构造地图配置项
        var mapConfig = new Glodon.Bimface.Plugins.TileMap.MapConfig();
        mapConfig.viewer = that.viewer3D;
        // 设置模型载入的基点
        mapConfig.basePoint = {
          x: -85689.088,
          y: -62066.347,
        };
        mapConfig.modelPosition = [121.63259566511255, 29.837978723638756];
        mapConfig.modelRotationZ = (0 * Math.PI) / 180;
        mapConfig.modelAltitude = 0;
        // 构造地图对象
        var map = new Glodon.Bimface.Plugins.TileMap.Map(mapConfig);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#domId {
  flex: 1;
  height: 500px;
}
</style>