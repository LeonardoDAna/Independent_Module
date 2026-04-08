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
    });
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
      image,
    }));
  });

  try {
    const images = await Promise.all(requestList);
    setupData.photoList = images;
  } catch (error) {
    console.error(error);
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
    gap: waterMarkConfig.gap,
    waterMark_width: waterMarkConfig.waterMark_width,
    waterMark_height: waterMarkConfig.waterMark_height,
  };
  const canvas = document.getElementsByClassName(`canvasRef_${index}`)[0];
  const ctx = canvas.getContext("2d");

  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale);

  const fontSize = Math.floor(canvas.width / 30);

  ctx.font = `${waterMarkConfig.fontSize}px Arial`;
  ctx.fillStyle = waterMarkConfig.color;
  ctx.textBaseline = "middle";

  let count = 10;
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

    ctx.save();
    ctx.translate(x, y);
    switch (waterMarkConfig.type) {
      case 1:
        ctx.rotate((45 * Math.PI) / 180);
        break;
      case 2:
        ctx.rotate((-45 * Math.PI) / 180);
      case 3:
        break;
    }
    ctx.fillText(config.text, 0, 0);
    ctx.restore();
  }
};

const downloadImages = (images) => {
  images.forEach((img, index) => {
    let canvas = document.getElementsByClassName(`canvasRef_${index}`)[0];
    const base64Img = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = dayjs().valueOf("YYYY-MM-DD HH:mm:ss");
    a.href = base64Img;
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
    <!-- 上传区 -->
    <div class="upload-area" @click="upload">
      <span class="upload-icon">+</span>
      <span>批量上传图片</span>
    </div>
    <input ref="fileInput" type="file" id="fileInput" name="file" multiple @change="getFiles" />

    <!-- 图片列表 -->
    <div class="section">
      <div class="section-title">图片列表</div>
      <div class="imgList">
        <template v-for="(item, index) in setupData.photoList" :key="index">
          <div class="imgItem">
            <img :src="item.image.currentSrc" alt="" />
            <div class="imgItem-info">
              <div class="img-name">{{ item.name }}</div>
              <div class="img-size">{{ (item.size / 1024).toFixed(1) }} KB</div>
            </div>
          </div>
        </template>
        <div v-if="setupData.photoList.length === 0" class="imgList-empty">暂无图片</div>
      </div>
    </div>

    <!-- 主操作区：侧边栏配置 + 右侧内容 -->
    <div class="section">
      <div class="section-title">操作区</div>
      <div class="main-layout">
        <!-- 左侧配置面板 -->
        <div class="sidebar">
          <a-form :model="waterMarkConfig" :label-col="labelCol" layout="vertical">
            <a-form-item label="内容">
              <a-input v-model:value="waterMarkConfig.content" />
            </a-form-item>
            <a-form-item label="位置">
              <a-select v-model:value="waterMarkConfig.type">
                <template v-for="item in types" :key="item">
                  <a-select-option :value="item.value">{{ item.label }}</a-select-option>
                </template>
              </a-select>
            </a-form-item>
            <a-form-item label="字号">
              <a-input-number v-model:value="waterMarkConfig.fontSize" :min="1" style="width:100%">
                <template #suffix><span>px</span></template>
              </a-input-number>
            </a-form-item>
            <a-form-item label="颜色">
              <el-color-picker
                :value="waterMarkConfig.color"
                show-alpha
                @change="handleColorPickerChange"
              />
            </a-form-item>
            <a-form-item label="水印宽度">
              <a-input-number :min="1" v-model:value="waterMarkConfig.waterMark_width" style="width:100%">
                <template #suffix><span>px</span></template>
              </a-input-number>
            </a-form-item>
            <a-form-item label="水印高度">
              <a-input-number :min="1" v-model:value="waterMarkConfig.waterMark_height" style="width:100%">
                <template #suffix><span>px</span></template>
              </a-input-number>
            </a-form-item>
            <!-- PC端按钮在侧边栏底部 -->
            <div class="sidebar-actions">
              <div class="operation_btn addBtn" @click="addWaterMark">添加水印</div>
              <div class="operation_btn downloadBtn" @click="handleDownload">下载图片</div>
            </div>
          </a-form>
        </div>

        <!-- 右侧：预览 + 水印结果 -->
        <div class="content-area">
          <div class="preview-wrap">
            <div class="preview-label">效果预览</div>
            <preview :width="waterMarkConfig.previewCanvas_width" :config="waterMarkConfig" />
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
      </div>
    </div>

    <!-- 移动端底部固定操作栏 -->
    <div class="mobile-action-bar">
      <div class="operation_btn addBtn" @click="addWaterMark">添加水印</div>
      <div class="operation_btn downloadBtn" @click="handleDownload">下载图片</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#fileInput {
  display: none;
}

.waterMark {
  margin: 0 auto;
  padding: 24px;
  background-color: #f5f6fa;
  min-height: 100%;
  box-sizing: border-box;
}

// ---- 上传区 ----
.upload-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 2px dashed #4f80ff;
  border-radius: 10px;
  height: 64px;
  cursor: pointer;
  color: #4f80ff;
  font-size: 15px;
  font-weight: 500;
  background-color: #f0f4ff;
  transition: background 0.2s;
  user-select: none;

  &:hover {
    background-color: #e3eaff;
  }

  .upload-icon {
    font-size: 22px;
    font-weight: 300;
    line-height: 1;
  }
}

// ---- Section 卡片 ----
.section {
  margin-top: 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e8eaf0;
  overflow: hidden;
}

.section-title {
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #7a7f99;
  border-bottom: 1px solid #e8eaf0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

// ---- 图片列表 ----
.imgList {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 20px;
  min-height: 80px;
}

.imgList-empty {
  color: #7a7f99;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.imgItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e8eaf0;
  }
}

.imgItem-info {
  text-align: center;
  max-width: 80px;
}

.img-name {
  font-size: 11px;
  color: #1a1d2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

.img-size {
  font-size: 11px;
  color: #7a7f99;
}

// ---- 主布局 ----
.main-layout {
  display: flex;
  min-height: 420px;
}

.sidebar {
  width: 220px;
  flex-shrink: 0;
  padding: 20px 16px;
  border-right: 1px solid #e8eaf0;
  display: flex;
  flex-direction: column;

  :deep(.ant-form-item) {
    margin-bottom: 14px;
  }

  :deep(.ant-form-item-label > label) {
    font-size: 12px;
    color: #7a7f99;
    font-weight: 500;
  }
}

.sidebar-actions {
  margin-top: auto;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.content-area {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}

.preview-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-label {
  font-size: 12px;
  color: #7a7f99;
  font-weight: 500;
}

.waterMarkList {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.canvas_container {
  border-radius: 8px;
  border: 1px solid #e8eaf0;
  max-width: 100%;
}

// ---- 按钮 ----
.operation_btn {
  height: 40px;
  line-height: 40px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s, transform 0.1s;
  width: 100%;

  &:hover {
    opacity: 0.88;
  }

  &:active {
    transform: scale(0.97);
  }
}

.addBtn {
  background-color: #4f80ff;
}

.downloadBtn {
  background-color: #36c27a;
}

// ---- 移动端底部固定栏 ----
.mobile-action-bar {
  display: none;
}

// ---- 响应式 ----
@media (max-width: 600px) {
  .waterMark {
    width: 100%;
    padding: 16px;
    padding-bottom: 80px;
  }

  .main-layout {
    flex-direction: column;
    min-height: unset;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e8eaf0;
    padding: 16px;

    .sidebar-actions {
      display: none;
    }
  }

  .content-area {
    padding: 16px;
  }

  .waterMarkList {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .mobile-action-bar {
    display: flex;
    gap: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    background: #ffffff;
    border-top: 1px solid #e8eaf0;
    z-index: 100;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);

    .operation_btn {
      flex: 1;
    }
  }
}

@media (min-width: 601px) {
  .waterMark {
    width: 960px;
  }

  .mobile-action-bar {
    display: none !important;
  }
}
</style>
