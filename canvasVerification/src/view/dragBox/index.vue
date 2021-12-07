<template>
  <div>
    <div v-for="(item, index) in dataList" :key="index" class="item">
      {{ index + 1 }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: new Array(12),
      dragSrcEl: null,
    };
  },
  mounted() {
    this.bindDrop();
  },
  methods: {
    bindDrop() {
      var cols = document.querySelectorAll(".item");
      [].forEach.call(cols, this.addDnDHandlers);
    },
    addDnDHandlers(elem, i) {
      elem.style.top = `${110 * i}px`;
      console.log(elem.style.top, 70 * i);
      elem.onmousedown = this.handleDragStart;
      elem.onmousemove = this.handleDragOver;
      elem.onmouseup = this.handleDragLeave;
      // elem.addEventListener("onmousemove", this.handleDragStart, false);
      // elem.addEventListener("onmouseup", this.handleDragStart, false);
      // elem.addEventListener("dragenter", this.handleDragEnter, false);
      // elem.addEventListener("dragover", this.handleDragOver, false);
      // elem.addEventListener("dragleave", this.handleDragLeave, false);
      // elem.addEventListener("drop", this.handleDrop, false);
      // elem.addEventListener("dragend", this.handleDragEnd, false);
    },
    verifyHowManyShow() {
      let index = 0;
      this.dataSource.map((e) => {
        if (e.show) index++;
      });
      return index >= 12;
    },
    onChange(item) {
      console.log(item.show);
      if (this.verifyHowManyShow() && !item.show) {
        this.$message.error("已经超过12个图表了！");
      } else {
        item.show = !item.show;
      }
    },
    handleDragStart(e) {
      var dragSrcEl = null;
      // Target (this) element is the source node.
      this.dragSrcEl = e.target;
      console.log(e);
      // this.chosedValue = this.getTargetValue(
      //   this.dragSrcEl.children[1].innerHTML.split(" ")[1]
      // );
      // e.dataTransfer.effectAllowed = "move";
      // e.dataTransfer.setData("text/html", this.dragSrcEl.outerHTML);
      this.dragSrcEl.classList.add("is-active");
    },
    handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }
      // console.log("over");
      // e.target.classList.add("over");
      // this.dragSrcEl.classList.add("over");
      // e.dataTransfer.dropEffect = "move"; // See the section on the DataTransfer object.
      return false;
    },
    handleDragEnter(e) {
      // this / e.target is the current hover target.
    },
    handleDragLeave(e) {
      e.target.classList.remove("is-active"); // this / e.target is previous target element.
    },
    handleDrop(e) {
      // this/e.target is current target element.
      if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
      }
      this.targetValue = this.getTargetValue(
        e.target.children[1].innerHTML.split(" ")[1]
      );
      // console.log(e != this.dragSrcEl);
      // Don't do anything if dropping the same column we're dragging.
      let targetDomText = e.target.innerHTML;
      let chosedDomText = this.dragSrcEl.children[1].innerHTML;
      if (targetDomText != chosedDomText) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        this.insertArrayValue();
      }
      e.target.classList.remove("over");
      return false;
    },
    handleDragEnd(e) {
      // this/e.target is the source node.
      e.target.classList.remove("over");

      /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: calc((100% / 3) - 26px);
  height: 50px;
  padding: 20px 0;
  user-select: none;
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  background: rgba(104, 103, 103, 0.75);
  transition: background-color 0.1s ease-in-out;
  cursor: grab;
  text-align: center;

  &.is-active {
    background: rgba(255, 255, 255, 0.9);
    cursor: grabbing;
  }
}
</style>