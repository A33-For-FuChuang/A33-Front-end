<template>
  <div>
    <el-descriptions title="基本信息" direction="vertical" :column="4" border>
      <el-descriptions-item label="姓名">{{ form.name }}</el-descriptions-item>
      <el-descriptions-item label="手机号">
        {{ form.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱" :span="2">
        {{ form.email }}
      </el-descriptions-item>
      <el-descriptions-item label="职位">{{
        form.position
      }}</el-descriptions-item>
      <el-descriptions-item label="店名">{{
        form.shopName
      }}</el-descriptions-item>
      <el-descriptions-item label="组名" :span="2">
        {{ form.groupName }}
      </el-descriptions-item>

      <el-descriptions-item label="工作日偏好">{{
        workDayStr
      }}</el-descriptions-item>
      <el-descriptions-item label="工作时间偏好">{{
        workTimestr
      }}</el-descriptions-item>

      <el-descriptions-item label="班次时间偏好/h">{{
        this.lastTime
      }}</el-descriptions-item>
    </el-descriptions>

    <br />
    <el-dialog :close-on-click-modal="false" :visible.sync="editDialogVisible" class="dialog2">
      <el-form :model="form" label-width="100px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" @click="showEditDialog" class="but2"
      >修改</el-button
    >
  </div>
</template>

<script>
import { employeeinfo, reqChangeinfo } from "../../api/employee";
import { reqShowEmployeeRole } from "../../api/employeeRole";
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
      //工作日
      workDay: [],
      workDayStr: "",
      //班次时间
      lastTime: "",
      //工作时间
      workTime: [],
      workTimestr: "",
      editDialogVisible: false,
    };
  },

  created() {
    this.personalinfo();
  },
  methods: {
    async personalinfo() {
      const res = await employeeinfo();
      this.form = res.data;

      console.log("------------------");
      console.log(this.form);
      console.log("个人信息页面");
      console.log(res);
      const respone = this.form.employeeWorkDayDTO?.employeeWorkDayList;
      this.workDay.push(respone[0]);
      this.workDay.push(respone[1]);
      this.workDayStr = this.workDay.join(",");

      const lastTime = this.form.employeeLastTimeDTO;
      this.lastTime = lastTime.lastTime;

      const res2 = await reqShowEmployeeRole();
      const workTime = res2.data.employeeWorkTimeDTO.employeeWorkTimeList;
      this.workTime.push(workTime[0]);
      this.workTime.push(workTime[1]);

      this.workTimestr = this.workTime.join(",");

      return this.workTimestr;
    },
    async submitForm() {
      this.adddata.phone = this.form.phone;
      this.adddata.email = this.form.email;
      if (this.adddata.phone == "") {
        this.$message.error("手机号不能为空");
        return;
      }
      if (this.adddata.email == "") {
        Tthis.$message.error("邮箱不能为空");
        return;
      }

      const res = await reqChangeinfo(this.adddata);
      console.log("员工信息修改");
      console.log(res);
      if (res.state == 200) {
        Toast("修改成功");
        // setTimeout(() => {
        //   // 在延迟后执行的代码
        //   console.log("延迟函数已执行");
        // }, 2000); // 2秒延迟
      }
    },
    showEditDialog() {
      //点击修改聚焦到输入框
      this.editDialogVisible = true;
    },
    cancel() {
      console.log("点击了取消");
      this.editDialogVisible = false;
    },
    //这里显示网络错误
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

  margin-left: 600px;
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
.dialog2 {
  width: 1000px;
  margin-left: 300px;
}
</style>
