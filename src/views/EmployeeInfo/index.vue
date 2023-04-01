<template>
  <div>
    <el-descriptions title="基本信息" direction="vertical" :column="4" border>
      <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
      <el-descriptions-item label="手机号">
        <el-input ref="inputVal" v-model="form.phone"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="邮箱" :span="2">
        <el-input v-model="form.email"></el-input>
      </el-descriptions-item>
      <el-descriptions-item label="职位">{{
        form.position
      }}</el-descriptions-item>
      <el-descriptions-item label="店名">{{
        form.shopName
      }}</el-descriptions-item>
      <el-descriptions-item label="组名" :span="2">{{
        form.groupName
      }}</el-descriptions-item>

      <el-descriptions-item label="工作日偏好"
        ></el-descriptions-item
      >
      <el-descriptions-item label="工作时间偏好"
        > </el-descriptions-item
      >

      <el-descriptions-item label="班次时间偏好"
        >{{form.employeeWorkTimeDTO}}</el-descriptions-item
      >
    </el-descriptions>

    <br />

    <el-button type="primary" @click="save" class="but1">保 存</el-button>
    <el-button type="primary" @click="change" class="but2">修改</el-button>

    
  </div>
</template>

<script>
import { employeeinfo, reqChangeinfo } from "../../api/employee";
import { Toast, resetObj } from "../../composables/utils";

export default {
  name: "Person",
  data() {
    return {
      form: {},

      adddata: {
        phone: "",
        email: "",
      },
    };
  },

  created() {
    this.personalinfo();
  },
  methods: {
    async personalinfo() {
      const res = await employeeinfo();
      this.form = res.data;
      console.log("个人信息页面");
      console.log(res);
    },

    change() {
      //点击修改聚焦到输入框
      this.$nextTick(function () {
        this.$refs.inputVal.focus();
      });
    },
    async save() {
      this.adddata.phone = this.form.phone;
      this.adddata.email = this.form.email;
      console.log("这是员工信息更改界面");
      const res = await reqChangeinfo(this.adddata);
      console.log(res);
      if (res.state == 200) {
        Toast("保存成功！");
      }
    },
  
  },
};
</script>

 


<style scoped>
.avatar-uploader {
  text-align: left;
  padding-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}
.el-card {
  margin-top: 40px;
}
.el_box {
  margin-top: 150px;
  margin-left: -70px;
}
.el-form-item__label {
  width: 150px;
}
.el-card__body {
  margin-left: 40px;
}
.el-input__inner {
  width: 200px;
}

.but1 {
  margin-left: 260px;
}
.but2 {
  margin-top: 20px;

  margin-left: 50px;
}

.elmbc {
  width: 800px;
  height: 500px;
  margin-left: 220px;
}
.el-input {
  width: 170px;

  vertical-align: middle;
  text-align: justify;
  line-height: 3px;
}

.el-input__inner {
  width: 150px;
  margin-left: 0px;
}
.input2 {
  float: right;
}
</style>
