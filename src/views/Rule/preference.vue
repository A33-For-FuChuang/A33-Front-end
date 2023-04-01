<template>
  <div>
    <h1>我的偏好</h1>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="工作日偏好">
        <el-select v-model="workDay1" placeholder="请选择" class="week">
          <el-option label="无" value="无"></el-option>

          <el-option label="星期一" value="星期一"></el-option>
          <el-option label="星期二" value="星期二"></el-option>
          <el-option label="星期三" value="星期三"></el-option>
          <el-option label="星期四" value="星期四"></el-option>
          <el-option label="星期五" value="星期五"></el-option>
          <el-option label="星期六" value="星期六"></el-option>
          <el-option label="星期日" value="星期日"></el-option>
        </el-select>
        <el-select v-model="workDay2" placeholder="请选择" class="week">
          <el-option label="无" value="无"></el-option>
          <el-option label="星期一" value="星期一"></el-option>
          <el-option label="星期二" value="星期二"></el-option>
          <el-option label="星期三" value="星期三"></el-option>
          <el-option label="星期四" value="星期四"></el-option>
          <el-option label="星期五" value="星期五"></el-option>
          <el-option label="星期六" value="星期六"></el-option>
          <el-option label="星期日" value="星期日"></el-option>
        </el-select>
        <el-button type="primary" @click="save()" class="but1">保存</el-button>
      </el-form-item>
      <el-form-item label="工作时间偏好">
        <el-time-picker
          is-range
          v-model="workTime1"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
        <el-time-picker
          is-range
          v-model="workTime2"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          class="chosetime"
        >
        </el-time-picker>
        <el-button type="primary" @click="worktimesave()" class="but3"
          >保存</el-button
        >
      </el-form-item>
      <el-form-item label="班次时长偏好">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable
          class="inpt"
        >
          {{ lastTime }}
        </el-input>
        <el-button type="primary" @click="lasttimesave()" class="but3"
          >保存</el-button
        >
      </el-form-item>

      <el-form-item class="but">
        <!-- <el-button type="primary" @click="change()">修改</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { employeeinfo } from "../../api/employee";

import { reqRole, reqTime } from "../../api/employeeRole";
import { Toast } from "../../composables/utils";

export default {
  data() {
    return {
      workDay1: "",
      workDay2: "",
      workTime1: "",
      workTime2: "",
      input: "",
      day: {
        day1: "",
        day2: "",
      },
      time:{
        time1:"",
        time2:"",
      },
      form: {},
    };
  },
  created() {
    this.personalinfo();
  },
  methods: {
    // change() {
    //   //点击修改聚焦到输入框
    //   this.$nextTick(function () {
    //     this.$refs.inputVal.focus();
    //   });
    // },
    async personalinfo() {
      const res = await employeeinfo();
      this.form = res.data;
      console.log("个人信息页面");
      console.log(this.form);
    },
    async save() {
      console.log(this.workDay1);
      this.day.day1 = this.workDay1;
      this.day.day2 = this.workDay2;
      const res = await reqRole(this.day);
      console.log(res);
      console.log("-------------------------------------");
      const res2 = await employeeinfo();
      console.log("我是res2哦");
      console.log(res2);
      if (res.state == 200) {
        Toast("保存成功!");
      }
    },
    //工作上班时长
    async worktimesave() {
       this.time.time1 = this.workTime1;
       this.time.time2 = this.workTime2;
      const res = await reqWorkTime(this.time);
      console.log("************************");
      console.log(res);
      const res2 = await employeeinfo();
      console.log("我是res2哦");
      console.log(res2);
    },
    //班次时长
    async lasttimesave() {
      console.log(this.input);
      const res = await reqTime(this.input);
      console.log("************************");
      console.log(res);
      const res2 = await employeeinfo();
      console.log("我是res2哦");
      console.log(res2);
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
.el-form-item__label {
  width: 200px;
}
.but {
  margin-left: 120px;
}
.but2 {
  margin-left: 20px;
}

.el-range-editor {
  width: 220px;
}
.chosetime {
  margin-left: 10px;
}

.week {
  margin-left: 10px;
}
.but1 {
  width: 60px;
  margin-left: 20px;
}
.inpt {
  width: 200px;
}
</style>
