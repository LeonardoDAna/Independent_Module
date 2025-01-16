<script setup>
import dayjs from "dayjs";
import { nextTick, reactive, ref, onMounted, watch, computed } from "vue";
import { useAppStore } from "@/stores/modules/app";
import preview from "./components/preview.vue";
import elColorPicker from "el-color-picker";
import { message } from "ant-design-vue";

const fileInput = ref();
const canvasRef = ref();
const testCanvasRef = ref();
const appStore = useAppStore();

const waterMarkConfig = reactive({
  color: "rgba(129, 129, 129, 0.68)",
  content: "测试文本",
  type: 1,
  fontSize: 18,
  gap: 30,
  waterMark_width: 82,
  waterMark_height: 82,
  previewCanvas_width: 200,
  previewCanvas_height: 200,
});

const labelCol = reactive({ style: { width: "100px" } });

const textContent = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));

const types = [
  { value: 1, label: "左上" },
  { value: 2, label: "右上" },
  { value: 3, label: "水平" },
];

let typeIndex = ref(0);

const setupData = reactive({
  photoList: [],
});

const isMobile = computed(() => {
  return appStore.getIsMoblie;
});

onMounted(() => {});

const setCanvasSize = () => {
  console.log("setCanvasSize");
  // 获取页面大小
  const waterMark = document.getElementsByClassName("waterMark")[0];
  waterMarkConfig.previewCanvas_width = waterMark.offsetWidth - 40;
  console.log(waterMarkConfig.previewCanvas_width);
};

watch(
  isMobile,
  async (val) => {
    await nextTick();
    if (val) {
      setCanvasSize();
    } else {
      waterMarkConfig.previewCanvas_width = 200;
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

const upload = async () => {
  fileInput.value.click();
};

const loadImageFromBase64 = (blobimage) => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([blobimage], {
      type: blobimage.type || "image/jpg",
    }); //类型一定要写！！
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Failed to load image from Base64"));
    };
    reader.onerror = (error) => reject(error);
  });
};

const getFiles = async (e) => {
  await nextTick();
  const files = e.target.files;

  const requestList = Array.from(files).map((file) => {
    console.log(file);
    return loadImageFromBase64(file).then((image) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      image, // 假设 loadImageFromBase64 返回的是图像数据
    }));
  });

  try {
    const images = await Promise.all(requestList);
    console.log(images);
    setupData.photoList = images;
  } catch (error) {
    console.log(error);
  }
};

const getImgInfo = (index, imgUrl) => {
  let img = new Image();
  img.src = imgUrl;
  img.onload = function () {
    setupData.photoList[index].coverUrl = imgUrl;
    setupData.photoList[index].height = img.height;
    setupData.photoList[index].width = img.width;
  };
};

const addWaterMark = () => {
  if (setupData.photoList.length === 0) {
    message.warn("请上传图片！");
    return;
  }

  for (let i = 0; i < setupData.photoList.length; i++) {
    let element = setupData.photoList[i];
    let img = element.image;
    waterMarkInit(img, i);
  }
};

const waterMarkInit = (img, index) => {
  let scale = 0.4;

  let config = {
    fontSize: waterMarkConfig.fontSize,
    text: waterMarkConfig.content,
    // gap: 300 * scale,
    gap: waterMarkConfig.gap,
    waterMark_width: waterMarkConfig.waterMark_width,
    waterMark_height: waterMarkConfig.waterMark_height,
  };
  // const canvas = canvasRef.value;
  const canvas = document.getElementsByClassName(`canvasRef_${index}`)[0];
  const ctx = canvas.getContext("2d");

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);
  // 旋转 45 度让文字变倾斜

  const fontSize = Math.floor(canvas.width / 30);

  ctx.font = `${waterMarkConfig.fontSize}px Arial`;
  ctx.fillStyle = waterMarkConfig.color; // 黑色文字，透明度为0.5
  ctx.textBaseline = "middle";

  let count = 10;

  // ctx.rotate((Math.PI / 180) * 45);
  let line = 0;
  let column = 0;

  let metrics = ctx.measureText(config.text);
  var textWidth = metrics.width;
  var textHeight = metrics.emHeightAscent + metrics.emHeightDescent;
  let block_width = textWidth + config.gap * 2;
  let block_height =
    textHeight >= config.waterMark_height ? textHeight : config.waterMark_height;

  let compute_column = canvas.width % block_width;
  let compute_line = canvas.height % block_height;
  count = compute_column * compute_line + 4;

  for (let index = 0; index < count; index++) {
    let x, y;

    x = config.waterMark_width * column;
    y = block_height * line;

    ctx.strokeStyle = "green";
    ctx.lineWidth = 30;

    column++;

    console.log(x, canvas.width, y, canvas.height);
    if (x + textWidth / 2 > canvas.width) {
      line++;
      column = 0;
    }

    // 将文字绘制到Canvas上
    ctx.save(); // 保存当前状态
    ctx.translate(x, y); // 移动到指定位置
    switch (waterMarkConfig.type) {
      case 1:
        ctx.rotate((45 * Math.PI) / 180); // 旋转45度
        break;
      case 2:
        ctx.rotate((-45 * Math.PI) / 180); // 旋转45度
      case 3:
        break;
    }
    ctx.fillText(config.text, 0, 0); // 绘制文字
    ctx.restore(); // 恢复到之前的状态
  }
};

const downloadImages = (images) => {
  images.forEach((img, index) => {
    let canvas = document.getElementsByClassName(`canvasRef_${index}`)[0];
    const base64Img = canvas.toDataURL("image/png");
    var a = document.createElement("a"); // 生成一个a元素
    var event = new MouseEvent("click"); // 创建一个单击事件
    a.download = dayjs().valueOf("YYYY-MM-DD HH:mm:ss"); // 设置图片名称
    a.href = base64Img; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event);
  });
};

const handleDownload = () => {
  downloadImages(setupData.photoList);
};

const handleColorPickerChange = (e) => {
  console.log(e);

  waterMarkConfig.color = e;
};
</script>

<template>
  <div class="waterMark">
    <div class="uploadFilesBtn" @click="upload">批量上传图片</div>
    <input
      ref="fileInput"
      type="file"
      id="fileInput"
      name="file"
      multiple
      @change="getFiles"
    />
    <div>
      <h4>图片列表</h4>
      <div class="imgList">
        <template v-for="(item, index) in setupData.photoList" :key="index">
          <div class="imgItem">
            <img :src="item.image.currentSrc" alt="" />
            <div class="imgItem-info">
              <div>{{ item.name }}</div>
              <div>{{ item.size }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <h4>操作栏</h4>
    <div class="operation_container">
      <div class="left_container">
        <!-- <canvas ref="testCanvasRef" class="test_canvas_container"></canvas> -->
        <preview :width="waterMarkConfig.previewCanvas_width" :config="waterMarkConfig" />
      </div>
      <div class="middle_container">
        <a-form
          :model="waterMarkConfig"
          class="demo-form-inline"
          label-position="top"
          :inline="true"
          :label-col="labelCol"
        >
          <a-row>
            <a-col :span="12">
              <a-form-item label="内容">
                <a-input v-model:value="waterMarkConfig.content" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="位置">
                <a-select
                  v-model:value="waterMarkConfig.type"
                  placeholder="please select your zone"
                >
                  <template v-for="item in types" :key="item">
                    <a-select-option :value="item.value">
                      {{ item.label }}
                    </a-select-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="字号">
                <a-input-number v-model:value="waterMarkConfig.fontSize" :min="1">
                  <template #suffix>
                    <span>px</span>
                  </template>
                </a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="颜色">
                <el-color-picker
                  :value="waterMarkConfig.color"
                  show-alpha
                  @change="handleColorPickerChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="水印宽度">
                <a-input-number :min="1" v-model:value="waterMarkConfig.waterMark_width">
                  <template #suffix>
                    <span>px</span>
                  </template>
                </a-input-number>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="水印高度">
                <a-input-number :min="1" v-model:value="waterMarkConfig.waterMark_height">
                  <template #suffix>
                    <span>px</span>
                  </template>
                </a-input-number>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="right_container">
        <div class="operation_btn addBtn" @click="addWaterMark">添加水印</div>
        <div class="operation_btn downloadBtn" @click="handleDownload">下载图片</div>
        <!-- <div class="operation_btn resetBtn">重置</div> -->
      </div>
    </div>
    <div class="waterMarkList">
      <template v-for="(item, index) in setupData.photoList" :key="index">
        <canvas
          :ref="`canvasRef_${index}`"
          :class="`canvasRef_${index}`"
          class="canvas_container"
        ></canvas>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 600px) {
  // 手机端
  .waterMark {
    width: 100%;
  }
  .operation_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .left_container {
    // width: 100%;
    background-color: #ccccccff;
  }
  .right_container {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr); /* 6 列 */
    grid-template-rows: repeat(2, 1fr); /* 2 行 */
    gap: 10px; /* 网格间距 */
  }
  .waterMarkList {
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    .canvas_container {
      padding-top: 10px;
      padding-right: 10px;
    }
  }
}

@media (min-width: 601px) {
  // pc端
  .waterMark {
    width: 1000px;
  }
  .operation_container {
    display: flex;
    // flex-direction: column;
    align-items: center;
    height: 200px;
    flex-wrap: wrap;
  }
  .left_container {
    width: 200px;
    height: 200px;
    background-color: #ccccccff;
  }
  .middle_container {
    width: 100%;
    height: 200px;
    flex: 1;
    padding: 0 10px;
    .waterMarkConfig {
      background-color: #0077ff;
    }
  }
  .right_container {
    /* width: 50%; */
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    /* align-items: center; */
    // justify-content: space-between;
  }
  .waterMarkList {
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    .canvas_container {
      padding-top: 10px;
      padding-right: 10px;
    }
  }
}

.waterMark {
  margin: 0 auto;
  padding: 20px;
  background-color: #ffff;
  height: 100%;
}
.operation_container {
  display: flex;
  // height: 200px;
}

.addBtn {
  background-color: #5b97c8;
  /* margin-bottom: 20px; */
}
.downloadBtn {
  /* margin-bottom: 20px; */
  background-color: #37c376;
}
.operation_btn {
  width: 180px;
  height: 50px;
  line-height: 50px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  color: #ffff;
  text-align: center;
  margin-bottom: 10px;
}
.uploadFilesBtn {
  border: 2px dashed #0077ff;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  text-align: center;
}
.resetBtn {
  background-color: #a50000ff;
}
.canvas_container {
  margin-top: 10px;
}
#fileInput {
  display: none;
}
.imgList {
  display: flex;
  /* width: 80vw; */
  min-height: 100px;
  padding: 10px 0;
  background-color: #dddddd;
}
.imgItem {
  padding: 0 10px;
}
.imgItem img {
  /* width: 100px; */
  height: 100px;
}
.ant-input-number {
  width: 100%;
}
</style>
