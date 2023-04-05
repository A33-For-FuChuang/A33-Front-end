<template>
  <div class="shop-rules">
    <h2>门店营业时间段</h2>
    <el-form :model="lastTime" label-width="120px">
      
      <el-form-item label="工作日">
        <el-input v-model="lastTime.workDay" ref="workDayInput"></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('workDayInput')"></i>
          <i class="el-icon-check" @click="save('openDayInput')"></i>
        </span>
      </el-form-item>
     
     
      <el-form-item label="上班时间">
        <el-input v-model="lastTime.workStart" ref="workStartInput"></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('workStartInput')"></i>
          <i class="el-icon-check" @click="save('workStartInput')"></i>
        </span>
      </el-form-item>
 
      <el-form-item label="下班时间">
        <el-input v-model="lastTime.workEnd" ref="workEndInput"></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('workEndInput')"></i>
          <i class="el-icon-check" @click="save('workEndInput')"></i>
        </span>
      </el-form-item>
      <el-form-item label="周末上班">
        <el-input v-model="lastTime.weekend" ref="weekendInput"></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('weekendInput')"></i>
          <i class="el-icon-check" @click="save('weekendInput')"></i>
        </span>
      </el-form-item>
      <el-form-item label="周末上班时间">
        <el-input
          v-model="lastTime.weekendStart"
          ref="weekendStartInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('weekendStartInput')"></i>
          <i class="el-icon-check" @click="save('weekendStartInput')"></i>
        </span>
      </el-form-item>
      <el-form-item label="周末下班时间">
        <el-input
          v-model="lastTime.weekendEnd"
          ref="weekendEndInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('weekendEndInput')"></i>
          <i class="el-icon-check" @click="save('weekendEndInput')"></i>
        </span>
      </el-form-item>
    </el-form>
    <h2>员工工作时长</h2>
    <el-form :model="employeeworkTime" label-width="140px">
      <el-form-item label="单周最长工作时间/h">
        <el-input
          v-model="employeeworkTime.weekMaxTime"
          ref="weekMaxTimeInput"
        ></el-input>

        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('weekMaxTimeInput')"></i>
          <i class="el-icon-check" @click="save('weekMaxTimeInput')"></i>
        </span>
      </el-form-item>

      <el-form-item label="单日最长工作时间">
        <el-input
          v-model="employeeworkTime.dayMaxTime"
          ref="dayMaxTimeInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('dayMaxTimeInput')"></i>
          <i class="el-icon-check" @click="save('dayMaxTimeInput')"></i>
        </span>
      </el-form-item>

      <el-form-item label="单次工作时间最小值">
        <el-input
          v-model="employeeworkTime.locationMinTime"
          ref="locationMinTimeInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('locationMinTimeInput')"></i>
          <i class="el-icon-check" @click="save('locationMinTimeInput')"></i>
        </span>
      </el-form-item>
      <el-form-item label="单次工作时间最大值">
        <el-input
          v-model="employeeworkTime.locationMaxTime"
          ref="locationMaxTimeInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('locationMaxTimeInput')"></i>
          <i class="el-icon-check" @click="save('locationMaxTimeInput')"></i>
        </span>
      </el-form-item>
    </el-form>
    <h2>休息时间段</h2>
    <el-form :model="restTime" label-width="120px">
      <el-form-item label="午餐时长/h">
        <el-input v-model="restTime.lunchTime" ref="lunchTimeInput"></el-input>

        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('lunchTimeInput')"></i>
          <i class="el-icon-check" @click="save('lunchTimeInput')"></i>
        </span>
      </el-form-item>

      <el-form-item label="午餐开始时间">
        <el-input
          v-model="restTime.lunchTimeStart"
          ref="lunchTimeStartInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('lunchTimeStartInput')"></i>
          <i class="el-icon-check" @click="save('lunchTimeStartInput')"></i>
        </span>
      </el-form-item>

      <el-form-item label="午餐结束时间">
        <el-input
          v-model="restTime.lunchTimeEnd"
          ref="lunchTimeEndInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('lunchTimeEndInput')"></i>
          <i class="el-icon-check" @click="save('lunchTimeEndInput')"></i>
        </span>
      </el-form-item>

      <el-form-item label="晚餐时长">
        <el-input
          v-model="restTime.dinnerTime"
          ref="dinnerTimeInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('dinnerTimeInput')"></i>
          <i class="el-icon-check" @click="save('dinnerTimeInput')"></i>
        </span>
      </el-form-item>
      <el-form-item label="晚餐开始时间">
        <el-input
          v-model="restTime.dinnerTimeStart"
          ref="dinnerTimeStart"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('dinnerTimeStart')"></i>
          <i class="el-icon-check" @click="save('dinnerTimeStart')"></i>
        </span>
      </el-form-item>
      <el-form-item label="晚餐结束时间">
        <el-input
          v-model="restTime.dinnerTimeEnd"
          ref="dinnerTimeEnd"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('dinnerTimeEnd')"></i>
          <i class="el-icon-check" @click="save('dinnerTimeEnd')"></i>
        </span>
      </el-form-item>
      <el-form-item label="休息时长">
        <el-input v-model="restTime.resttime" ref="resttimeInput"></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('resttimeInput')"></i>
          <i class="el-icon-check" @click="save('resttimeInput')"></i>
        </span>
      </el-form-item>
    </el-form>
    <h2>班次职位安排</h2>
    <el-form :model="groupPosition" label-width="120px">
      <el-form-item label="职位人数">
        <el-input
          v-model="groupPosition.positionMap"
          ref="positionMapInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('positionMapInput')"></i>
          <i class="el-icon-check" @click="save('positionMapInput')"></i>
        </span>
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          v-model="groupPosition.position"
          ref="positionInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('positionInput')"></i>
          <i class="el-icon-check" @click="save('positionInput')"></i>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqShowSystem } from "../../api/shopRule";
import { Toast, resetObj } from "../../composables/utils";
export default {
  data() {
    return {
      lastTime: {
        workDay: "",
        workStart: "",
        //结束时间
        workEnd: "",
        //周末
        weekend: "",
        weekendStart: "",
        weekendEnd: "",
      },
      employeeworkTime: {
        weekMaxTime: "",
        dayMaxTime: "",
        locationMinTime: "",
        locationMaxTime: "",
      },
      restTime: {
        lunchTime: "",
        lunchTimeStart: "",
        lunchTimeEnd: "",
        dinnerTime: "",
        dinnerTimeStart: "",
        dinnerTimeEnd: "",
        resttime: "",
      },
      groupPosition: {
        positionMap: "",
        position: "",
      },
    };
  },
  created() {
    this.systemRule();
  },

  methods: {
    async systemRule() {
      const res = await reqShowSystem();

      console.log("商铺系统规则页面");
      console.log(res);
      console.log(res.data[0].systemRoleValue)
      const worktime1 = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.workDay = worktime1.workDay;
      console.log(worktime1.workDay);
      const workStart = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.workStart = workStart.workStart;
      const workover = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.workEnd = workover.workEnd;
      const workend = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.weekend = workend.weekend;
      console.log(workend.weekend)
        const workendStart = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.weekendStart = workendStart.weekendStart;
        const workendEnd = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.weekendEnd = workendEnd.weekendEnd;

      //员工工作时长
      const weekMaxTime = JSON.parse(res.data[1].systemRoleValue);
      this.employeeworkTime.weekMaxTime = weekMaxTime.weekMaxTime;
      const dayMaxTime = JSON.parse(res.data[1].systemRoleValue);
      this.employeeworkTime.dayMaxTime = dayMaxTime.dayMaxTime;
      const locationMinTime = JSON.parse(res.data[1].systemRoleValue);
      this.employeeworkTime.locationMinTime = locationMinTime.locationMinTime;
      const locationMaxTime = JSON.parse(res.data[1].systemRoleValue);
      this.employeeworkTime.locationMaxTime = locationMaxTime.locationMaxTime;

      //休息时间段
      const lunchTime = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.lunchTime = lunchTime.lunchTime;
      const lunchTimeStart = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.lunchTimeStart = lunchTimeStart.lunchTimeStart;
      const lunchTimeEnd = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.lunchTimeEnd = lunchTimeEnd.lunchTimeEnd;
      const dinnerTime = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.dinnerTime = dinnerTime.dinnerTime;
      const dinnerTimeStart = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.dinnerTimeStart = dinnerTimeStart.dinnerTimeStart;
      const dinnerTimeEnd = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.dinnerTimeEnd = dinnerTimeEnd.dinnerTimeEnd;
      const resttime2 = JSON.parse(res.data[2].systemRoleValue);
      this.restTime.resttime = resttime2.restTime;

      //班次职位安排
      const positionMap = JSON.parse(res.data[3].systemRoleValue);
      // this.groupPosition. positionMap =  positionMap.positionMap;
      console.log(res.data[3].systemRoleValue)
      console.log(positionMap.PositionMap)
      //    const position = JSON.parse(res.data[3].systemRoleValue);
      // this.groupPosition. position =  position. position;


    },

    // edit(refName) {
    //   this.$refs[refName].focus();
    //   console.log("这是修改框");
    //   console.log(refName);
    // },
    // async save(refName) {
    //   if (
    //     refName === "openTimeInput" ||
    //     refName === "baseValueInput" ||
    //     refName === "employeeValueInput"
    //   ) {
    //     console.log(refName);
    //     console.log("*****************-------------------");
    //     console.log(this.openRule);
    //     const res2 = await reqopenRule(this.openRule);
    //     console.log("这是修改openRule");
    //     console.log(res2);
    //     if (res2.state == 200) {
    //       Toast("修改成功");
    //     }
    //   } else if (
    //     refName === "closeTimeInput" ||
    //     refName === "closebaseValueInput" ||
    //     refName === "close-employeeInput" ||
    //     refName === "minemployeeInput"
    //   ) {
    //     const res3 = await reqcloseRule(this.closeRule);
    //     console.log("这是修改关店规则");
    //     console.log(res3);
    //     if (res3.state == 200) {
    //       Toast("修改成功");
    //     }
    //   } else if (refName === "flowBase") {
    //     const res4 = await reqFlowRule(this.flowRule);
    //     console.log("这是修改客流规则");
    //     console.log(res4);
    //     if (res4.state == 200) {
    //       Toast("修改成功");
    //     }
    //   } else if (refName === "groupBaseInput") {
    //     const res5 = await reqGroupRule(this.groupRule);
    //     console.log("这是修改分组规则");
    //     console.log(res5);
    //     if (res5.state == 200) {
    //       Toast("修改成功");
    //     }
    //   } else if (
    //     refName === "maxDurationInput" ||
    //     refName === "minStaffInput" ||
    //     refName === "minDurationInput"
    //   ) {
    //     const res6 = await reqStockRule(this.stockRule);
    //     console.log("这是修改进货规则");
    //     console.log(res6);
    //     if (res6.state == 200) {
    //       Toast("修改成功");
    //     }
    //   }
    // },
  },
};
</script>

<style  scoped>
.el-input {
  position: relative;
  width: 250px;
}
.icon-container {
  position: absolute;
  width: 60px;
  margin-top: -20px;
  left: 34%;
  transform: translateY(-50%);
  right: 12px;
}

.icon-container i {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.icon-container {
  display: block;
  width: 60px;
}
.el-form-item:hover .icon-container {
  display: block;
}

.elmbc {
  width: 1000px;
  margin-left: 120px;
}
.el-form-item__label {
  width: 200px;
}
.el-form-item__content {
  width: 0px;
}
h2 {
  color: #409eff;
}
</style>