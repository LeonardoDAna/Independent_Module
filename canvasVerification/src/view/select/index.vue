<template>
  <div class="indexStyle">
    <selectOption :selectValue="selectValue" :selectOption="selectOption" />
  </div>
</template>

<script>
import selectOption from "@/components/selectOption";
export default {
  components: {
    selectOption,
  },
  name: "selectIndex",
  data() {
    return {
      selectValue: null,
      selectOption: [
        {
          value: 1,
          label: "first",
        },
        {
          value: 2,
          label: "second",
        },
        {
          value: 3,
          label: "third",
        },
        {
          value: 4,
          label: "fourth",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.indexStyle {
  width: 240px;
}
</style>