<template>
  <!-- 下拉选择框 -->
  <div class="selectInput">
    {{ selectedOne }}
    <input
      style="width: 100%"
      size="1"
      type="text"
      readonly="readonly"
      autocomplete="off"
      placeholder="请选择"
      :value="selectedOne"
      @focus="inputOnFocus()"
      @blur="inputOnBlur()"
    />
    <span class="arrowSpan">
      <span>
        <i
          class="el-icon-arrow-up input__icon"
          :class="{ is_reverse: isFocus }"
        ></i>
      </span>
    </span>
    <div class="optionsList" v-if="isFocus">
      <div
        class="selectOption"
        v-for="(item, index) in selectOption"
        :key="index"
        @click="selectOptFn(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectOption: Array,
    selectValue: String,
  },
  data() {
    return {
      isFocus: false,
      selectedOne: null,
    };
  },
  methods: {
    selectOptFn(item) {
      this.selectedOne = item.label;
      console.log(this.selectedOne);
    },
    inputOnFocus() {
      this.isFocus = true;
    },
    inputOnBlur() {
      this.isFocus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.optionsList {
  position: absolute;
  top: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #c8cccf;
  width: 100%;
  transition: ease-in-out 0.3s;
}
.selectOption {
  cursor: pointer;
  padding: 5px 10px;
  color: #606266;
}
.selectOption:hover {
  background-color: #f5f7fa;
}
.is_reverse {
  transform: rotate(180deg);
  transition: 0.3s;
  color: #c0c4cc;
  font-size: 14px;
}
.selectInput {
  width: 100%;
  position: relative;
}
.arrowSpan {
  position: absolute;
  height: 100%;
  font-size: 14px;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transform: rotate(0deg);
  transition: transform 0.3s;
  pointer-events: none;
}
.el-icon-arrow-up {
  transition: transform 0.3s;
}
.input__icon {
  line-height: 30px;
}
</style>