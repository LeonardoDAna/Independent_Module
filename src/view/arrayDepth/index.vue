<template>
  <div>
    <div class="row justify-between my-mb-20">
      <el-row class="height-full flex-other">
        <el-col :span="5" class="row align-middle my-mr-10">
          <span class="flex-shrink"> 关键字： </span>
          <el-input v-model="keyword" placeholder="请输入内容"> </el-input>
        </el-col>
      </el-row>
      <div>
        <el-button type="primary">
          <i class="el-icon-search"></i>
          <span class="my-px-5">搜索</span>
        </el-button>
        <el-button type="primary">
          <i class="el-icon-refresh"></i>
          <span class="my-px-5">重置</span>
        </el-button>
        <el-button type="primary">
          <i class="el-icon-download"></i>
          <span class="my-px-5">导出</span>
        </el-button>
        <el-button type="success" @click="addNew">
          <i class="el-icon-circle-plus-outline"></i>
          <span class="my-px-5">添加</span>
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <el-tree
      ref="tree"
      :data="menuData"
      node-key="id"
      default-expand-all
      :filter-node-method="filterNode"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :expand-on-click-node="false"
    >
      <!-- show-checkbox -->
      <!-- :render-content="renderContent" -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <span class="opeartionBtn fc-editColor" @click="() => editShow(data)">
            修改
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="opeartionBtn fc-appendColor" @click="() => addNew(data)">
            新增
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="opeartionBtn fc-deleteColor" @click="() => remove(node, data)">
            删除
          </span>
        </span>
      </span>
    </el-tree>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="editForm.menuName" placeholder="请输入菜单名称"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { matchMax } from "@/utils/commons.js";
export default {
  name: "floor",
  data() {
    return {
      keyword: "",
      targetItemID: "",
      dialogVisible: false,
      dialogTitle: "编辑",
      editForm: {
        menuName: "",
      },
      editFormRules: {
        menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
      },
      menuData: [
        {
          id: 1,
          label: "RF空调冷热源设备",
          fileId: "10000713243357",
          viewToken: "6885ff29b3464f06931c73c68cb0494d",
          children: [],
        },
        {
          id: 2,
          label: "RF排风热回收型新风机组",
          children: [],
        },
        {
          id: 3,
          label: "4F办公区域",
          children: [
            {
              id: 4,
              label: "4F建筑模型",
              children: [],
              fileId: "10000713242231",
              viewToken: "4c079ddafe5b46b7922490fffc1792d9",
            },
            {
              id: 5,
              fileId: "10000713237848",
              children: [],
              viewToken: "fcf12606ba534c0fb3d8c3be65cabbe3",
              label: "4F空调系统",
            },
            {
              id: 6,
              label: "4F配电系统",
              children: [],
            },
            {
              id: 7,
              label: "4F照明系统",
              fileId: "10000713242262",
              children: [],
              viewToken: "639d2b12718f4bb5acb7fe2300d6882c",
            },
          ],
        },
        {
          id: 8,
          label: "B1新风机房",
          children: [],
        },
        {
          id: 9,
          label: "B1空调换热器机房",
          fileId: "10000713240692",
          viewToken: "7fe940114cd34621b2316f4cf3cf7345",
          children: [],
        },
        {
          id: 10,
          label: "B1变电所的低配室",
          children: [],
          fileId: "10000713242728",
          viewToken: "6adb5902acb14573911f2826ddedcb36",
        },
        {
          id: 11,
          label: "B2生活热水机房",
          children: [],
        },
      ],
    };
  },
  watch: {
    keyword(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    let deep = this.getArrayMaxDepth(this.menuData);
    console.log(deep);
  },
  methods: {
    // 关键词过滤tree
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 弹出框关闭
    handleClose() {
      this.dialogVisible = false;
      this.editForm.date = "";
      this.editForm.status = "";
    },
    // 目标子节点增加
    append(data, name) {
      const h = this.$createElement;
      let deep = this.getArrayMaxDepth(this.menuData);
      if (data.depth >= 2) {
        this.$notify({
          title: "三维菜单",
          message: h(
            "i",
            { style: "color: teal" },
            `三维菜单层级不可超过2,当前最大层数为${deep}`
          ),
        });
        return;
      }
      const newChild = {
        id: data.id ? data.id + Math.random() * 100 : Math.random() * 100,
        label: name,
        children: [],
      };
      if (data.id != undefined) {
        if (!data.children) {
          this.$set(data, "children", []);
        }
        data.children.push(newChild);
      } else {
        this.menuData.push(newChild);
      }
    },
    // 目标节点删除
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    handleDragStart(node, ev) {
      // console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      this.getArrayMaxDepth(this.menuData);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      // 1.选择节点的总深度和被插入节点深度相加不能超过2; 返回true
      // 2.如果选中节点没有子节点，且被插入节点也没有子节点 则返回true
      // 3.选中节点深度超过2且选中节点有子节点 &&  被插入节点深度超过2且有子节点 返回false
      let targetNodeHasChild =
        draggingNode.children == undefined && draggingNode.children?.length;
      let insertedNodeHasChild =
        dropNode.children == undefined && dropNode.children?.length;
      if (
        (targetNodeHasChild && insertedNodeHasChild) ||
        this.singleNodeDepth(dropNode.parent) >= 2 ||
        this.singleNodeDepth(dropNode.data) + this.singleNodeDepth(draggingNode.data) >=
          3 ||
        this.singleNodeDepth(draggingNode.data) >= 2 ||
        this.singleNodeDepth(draggingNode.parent) >= 2
      ) {
        if (
          this.singleNodeDepth(dropNode.data) >= 2 &&
          !insertedNodeHasChild &&
          this.singleNodeDepth(draggingNode.data) >= 2 &&
          !targetNodeHasChild
        ) {
          return false;
        }
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    // 最外部节点增加
    addNew(data) {
      this.emptyForm();
      this.dialogTitle = "新建";
      this.dialogVisible = true;
      this.targetItemID = data;
    },
    submitForm() {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == "新建") {
            this.append(this.targetItemID, this.editForm.menuName);
            // add new success submit
          } else {
            this.editFn(this.targetItemID, this.editForm.menuName);
            // edit item
          }
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 清空editFrom值
    emptyForm() {
      for (let key in this.editForm) {
        this.editForm[key] = "";
      }
    },
    // 模拟编辑更新
    editFn(data, name) {
      data.label = name;
    },
    // 弹出编辑框
    editShow(data) {
      this.emptyForm();
      this.dialogTitle = "编辑";
      this.dialogVisible = true;
      this.targetItemID = data;
      this.editForm.menuName = data.label;
    },
    deleteFn(id) {
      // delete item
    },
    // 单节点遍历深度
    singleNodeDepth(data) {
      let depth = data.depth;
      function getMaxDepth(data, depth) {
        depth = data.depth;
        console.log("depth", depth);
        if (data.children != undefined && data.children.length > 0) {
          for (let i = 0; i < data.children.length; i++) {
            getMaxDepth(data.children[i], depth);
          }
        } else {
          return depth;
        }
      }
      if (data.children != undefined && data.children.length > 0) {
        for (let i = 0; i < data.children.length; i++) {
          return getMaxDepth(data.children[i], depth);
        }
      } else {
        return depth;
      }
    },
    // 获取 treeData 最大深度
    getArrayMaxDepth(arr) {
      if (!Array.isArray(arr) && !arr.length > 0) return;
      let deepArr = [];
      for (let i = 0; i < arr.length; i++) {
        getDeep(arr[i], 0, deepArr);
      }
      function getDeep(data, i, deepArr) {
        var treeRoot = data.children != undefined && data.children.length > 0;
        if (!treeRoot) {
          i++;
          data.depth = i;
          deepArr.push(i);
          return;
        }
        i++;
        data.depth = i;
        for (let j = 0; j < data.children.length; j++) {
          getDeep(data.children[j], i, deepArr);
        }
      }
      return matchMax(deepArr);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.opeartionBtn {
  padding: 0 10px;
}
</style>
