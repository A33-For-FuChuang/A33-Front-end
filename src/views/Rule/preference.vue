<template>
  <div>
    <h1>我的偏好</h1>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="爱好一">
        <el-input
          ref="inputVal"
          v-model="form.hobbyType1"
          placeholder="爱好名称"
        ></el-input>
        <el-input v-model="form.hobbyValue1" placeholder="爱好内容"></el-input>
      </el-form-item>
      <el-form-item label="爱好二">
        <el-input v-model="form.hobbyType2" placeholder="爱好名称"></el-input>
        <el-input v-model="form.hobbyValue2" placeholder="爱好内容"></el-input>
      </el-form-item>
      <el-form-item label="爱好三">
        <el-input v-model="form.hobbyType3" placeholder="爱好名称"></el-input>
        <el-input v-model="form.hobbyValue3" placeholder="爱好名"></el-input>
      </el-form-item>

      <el-form-item class="but">
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button type="primary" @click="change()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { employeeinfo } from "../../api/employee";

import { reqRole } from "../../api/employeeRole";
import { Toast } from "../../composables/utils";

export default {
  data() {
    return {
      form: {
        id: "",
        hobbyType1: "",
        hobbyValue1: "",
        hobbyType2: "",
        hobbyValue2: "",
        hobbyType3: "",
        hobbyValue3: "",
      },
    };
  },
  created() {},
  methods: {
    change() {
      //点击修改聚焦到输入框
      this.$nextTick(function () {
        this.$refs.inputVal.focus();
      });
    },
    async save() {
      const res = await employeeinfo();
      this.id = res.data.id;
      console.log(res);

      const res2 = await reqRole(this.form);
      console.log("我是res2哦");
      console.log(res2.state);
      if (res2.state == 200) {
        Toast("保存成功!");
      }
    },
  },
};
</script>
<style scoped>
.elmbc {
  width: 60%;
  margin-left: 160px;
  height: 600px;
}
.el-form-item {
  margin-top: 10px;
}
.el-input {
  width: 250px;
  height: 80px;
  padding-left: 40px;
  margin-top: 10px;
}
.but {
  margin-left: 120px;
}
.el-button {
  margin-left: 80px;
}
</style>
