<template>
  <div>
    <el-descriptions title="基本信息" direction="vertical" :column="4" border>
      <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
      <el-descriptions-item label="手机号">
        {{ form.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="职位" :span="2">{{
        form.position
      }}</el-descriptions-item>
      <el-descriptions-item label="店名">{{
        form.shopName
      }}</el-descriptions-item>
      <el-descriptions-item label="组名">{{
        form.groupName
      }}</el-descriptions-item>

      <el-descriptions-item label="爱好一" :span="2"
        >{{ form.hobbyType1 }}:{{ form.hobbyValue1 }}</el-descriptions-item
      >
      <el-descriptions-item label="爱好二"
        >{{ form.hobbyType2 }}:{{ form.hobbyValue2 }}</el-descriptions-item
      >

      <el-descriptions-item label="爱好三"
        >{{ form.hobbyType3 }}:{{ form.hobbyValue3 }}</el-descriptions-item
      >
    </el-descriptions>

    <br />

    <el-button type="primary" class="but" @click="save">保 存</el-button>
    <!-- <el-button type="primary" @click="sign">修改</el-button> -->
    <!-- 表格 -->
    <div style="width: 100%; height: 100px"></div>
  </div>
</template>

<script>
import { employeeinfo, employeechange } from "../../api/employeeinfo";
import { Toast, resetObj } from "../../composables/utils";

export default {
  name: "Person",
  data() {
    return {
      form: {},
    };
  },
  mounted() {},

  created() {
    this.personalinfo();
  },
  methods: {
    async personalinfo() {
      const res = await employeeinfo();
      this.form = res.data;
      console.log("个人信息页面");
      console.log(res.data);
    },

    async save() {
      console.log(this.form);
      const res = await employeechange(this.form);
      console.log(res.data);
      if (res.data.state == 200) {
        Toast("信息保存成功");
      } else {
        console.log("hfdjdshfjgsh");
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
.but {
  margin-left: 460px;
  margin-top: 20px;
}
.but2 {
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
