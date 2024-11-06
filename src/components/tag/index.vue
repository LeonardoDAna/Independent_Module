<template>
  <div
    :class="tagColor"
    class="tagClass"
    :style="{ backgroundColor: customBackgroundColor, color: customTextColor }"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
  label: {
    type: String,
    required: true,
  },
  customColor: {
    type: String,
    default: "",
  },
});

const tagColor = computed(() => {
  return {
    "tag-default": props.type === "default" && !props.customColor,
    "tag-success": props.type === "success" && !props.customColor,
    "tag-warning": props.type === "warning" && !props.customColor,
    "tag-error": props.type === "error" && !props.customColor,
  };
});

const customBackgroundColor = computed(() => {
  return props.customColor ? props.customColor : "";
});

const customTextColor = computed(() => {
  return props.type === "warning" ? "black" : "white";
});
</script>

<style lang="scss" scoped>
.tagClass {
  padding: 0px 6px;
  display: inline-block;
  margin: 0 5px;
  text-align: center;
  font-size: 12px;
  min-width: 40px;
}
.tag-default {
  background-color: gray;
  color: white;
}
.tag-success {
  background-color: green;
  color: white;
}
.tag-warning {
  background-color: yellow;
  color: black;
}
.tag-error {
  background-color: red;
  color: white;
}
</style>
