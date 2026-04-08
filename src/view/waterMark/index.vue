<script setup>
import dayjs from "dayjs";
import { nextTick, reactive, ref, onMounted, watch, computed } from "vue";
import { useAppStore } from "@/stores/modules/app";
import preview from "./components/preview.vue";
import elColorPicker from "el-color-picker";
import { message } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";

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

/** 操作区「水印结果」当前展示的列表项下标（多图时切换预览，canvas 仍全部挂载以便下载） */
const activeResultIndex = ref(0);

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
    activeResultIndex.value = 0;
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

/**
 * 从列表中移除指定索引的图片。
 * @param {number} index - 要移除项在 `setupData.photoList` 中的下标
 */
const removePhoto = (index) => {
  const prevActive = activeResultIndex.value;
  setupData.photoList.splice(index, 1);
  if (prevActive > index) {
    activeResultIndex.value = prevActive - 1;
  } else if (prevActive === index) {
    activeResultIndex.value = Math.min(prevActive, Math.max(0, setupData.photoList.length - 1));
  }
};

/**
 * 多图切换条上展示的短文件名。
 * @param {string} rawName
 * @param {number} index - 从 0 开始的序号（用于无文件名时占位）
 * @returns {string}
 */
const shortPreviewLabel = (rawName, index) => {
  const name = String(rawName || "").trim() || `图片${index + 1}`;
  return name.length > 14 ? `${name.slice(0, 12)}…` : name;
};

/**
 * 生成带水印导出用的安全、唯一文件名（含 .png）。
 * @param {string} rawName - 原始上传文件名
 * @param {number} index - 当前项在列表中的下标
 * @returns {string}
 */
const buildWatermarkedFileName = (rawName, index) => {
  const ts = dayjs().format("YYYYMMDDHHmmss");
  const base = String(rawName || "image")
    .replace(/\.[^.]+$/, "")
    .replace(/[\\/:*?"<>|]/g, "_")
    .trim() || "image";
  return `${base}_watermark_${index}_${ts}.png`;
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

/**
 * 依次触发每张 canvas 的下载，文件名唯一并错开时间以降低浏览器合并/拦截概率。
 * @param {Array<{ name?: string }>} images - 与 canvas 顺序一致的列表项
 */
const downloadImages = (images) => {
  const delayMs = 80;
  images.forEach((item, index) => {
    setTimeout(() => {
      const canvas = document.getElementsByClassName(`canvasRef_${index}`)[0];
      if (!canvas) {
        return;
      }
      const base64Img = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = buildWatermarkedFileName(item.name, index);
      a.href = base64Img;
      a.dispatchEvent(new MouseEvent("click"));
    }, index * delayMs);
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
            <div class="imgItem-thumb">
              <img :src="item.image.currentSrc" alt="" />
              <button
                type="button"
                class="imgItem-remove"
                aria-label="移除图片"
                @click.stop="removePhoto(index)"
              >
                <CloseOutlined />
              </button>
            </div>
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
          <div v-if="setupData.photoList.length" class="waterMarkResult">
            <div v-if="setupData.photoList.length > 1" class="waterMarkResult-toolbar">
              <span class="waterMarkResult-toolbarLabel">水印结果</span>
              <a-radio-group
                v-model:value="activeResultIndex"
                button-style="solid"
                size="small"
                class="waterMarkResult-radioGroup"
              >
                <a-radio-button
                  v-for="(item, index) in setupData.photoList"
                  :key="index"
                  :value="index"
                >
                  {{ shortPreviewLabel(item.name, index) }}
                </a-radio-button>
              </a-radio-group>
            </div>
            <div class="waterMarkList">
              <template v-for="(item, index) in setupData.photoList" :key="index">
                <div
                  v-show="activeResultIndex === index"
                  class="waterMarkList-item"
                >
                  <canvas
                    :ref="`canvasRef_${index}`"
                    :class="`canvasRef_${index}`"
                    class="canvas_container"
                  ></canvas>
                </div>
              </template>
            </div>
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
}

.imgItem-thumb {
  position: relative;
  width: 80px;
  height: 80px;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e8eaf0;
    display: block;
  }
}

.imgItem-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(220, 53, 69, 0.95);
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

.waterMarkResult {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 0;
}

.waterMarkResult-toolbar {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.waterMarkResult-toolbarLabel {
  font-size: 12px;
  color: #7a7f99;
  font-weight: 500;
  line-height: 24px;
  flex-shrink: 0;
}

.waterMarkResult-radioGroup {
  flex: 1;
  min-width: 0;

  :deep(.ant-radio-group) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  :deep(.ant-radio-button-wrapper) {
    border-radius: 6px !important;
  }
}

.waterMarkList {
  position: relative;
  width: 100%;
  min-height: 220px;
  max-height: min(480px, 70vh);
  display: flex;
  align-items: center;
  justify-content: center;
}

.waterMarkList-item {
  width: 100%;
  height: 100%;
  min-height: 220px;
  max-height: min(480px, 70vh);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #e8eaf0;
  border-radius: 8px;
  background: #fafbfc;
}

.canvas_container {
  display: block;
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
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

  .waterMarkResult-radioGroup {
    width: 100%;

    :deep(.ant-radio-group) {
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
    }
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
