<template>
  <!-- 下拉选择框 -->
  <div class="selectInput">
    <input
      type="text"
      readonly="readonly"
      autocomplete="off"
      placeholder="请选择"
      width="300"
      :onfocus="inputOnFocus()"
    />
    <span class="arrowSpan">
      <span>
        <i class="el-icon-arrow-up input__icon"></i>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    selectOption: Array,
    selectValue: String,
  },
  data() {
    return {};
  },
  methods: {
    inputOnFocus() {
      console.log("选中");
    },
  },
};
</script>

<style lang="scss" scoped>
.selectInput {
  width: 100%;
  position: relative;
}
.arrowSpan {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}
.arrowSpan:hover {
  transform: rotate(180deg);
}
.input__icon{
  line-height: 30px;
}
</style>