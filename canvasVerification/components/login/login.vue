<template>
  <div class="all">
    <div class="login">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="login-form admainFrom"
      >
        <p class="title">学生信息后台管理</p>
        <el-form-item label="账户：" label-width="60px" prop="username" class="admainInput">
          <el-input
            type="username"
            placeholder="请输入账户"
            v-model="ruleForm.username"
            autocomplete="off"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="60px" prop="password" class="admainInput">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            autocomplete="off"
            show-password
            prefix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <div class="adminbtn">
          <el-button style="margin-left:40px" type="primary" @click="submitForm(ruleForm)">提交</el-button>
          <el-button style="margin-left:40px" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(form) {
      // 简单做个静态判断
      if (form.username == "" || form.password == "") {
        alert("账户和密码不能为空");
      } else if (form.username === "admin" && form.password === "123456") {
        sessionStorage.setItem("updataloginStatus", true);
        this.$router.push("/home");
      } else {
        this.$message({
          message: "警告：登录密码错误",
          type: "warning"
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="css">
body {
  margin: 0;
}
.all {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
}
.login {
  position: relative;
  height: 600px;
  width: 500px;
}
.admainInput {
  margin-left: 0;
  margin-right: 20px;
  width: 440px;
}
.admainFrom {
  position: absolute;
  top: 30%;
  margin-top: -25%;
  color: white;
  font-size: 10px;
}
.title {
  margin-left: 0;
  color: white;
  text-align: center;
  font-size: 27px;
}
.adminbtn {
  display: flex;
  justify-content: center;
}
</style>