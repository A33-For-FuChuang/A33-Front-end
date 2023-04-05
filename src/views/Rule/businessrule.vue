<template>
  <div class="shop-rules">
    <h2>开店规则</h2>
    <el-form :model="openRule" label-width="120px">
      <el-col :span="10">
        <el-form-item label="开店时间/h">
          <el-input
            v-model="openRule.openTime"
            ref="openTimeInput"
            @mouseover="showIcon"
            @mouseout="hideIcon"
          ></el-input>

          <span class="icon-container" v-show="iconVisible">
            <i class="el-icon-edit" @click="edit('openTimeInput')"></i>
            <i class="el-icon-check" @click="save('openTimeInput')"></i>
          </span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="基础值">
          <el-input
            v-model="openRule.openbaseValue"
            ref="baseValueInput"
          ></el-input>
          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('baseValueInput')"></i>
            <i class="el-icon-check" @click="save('baseValueInput')"></i>
          </span>
        </el-form-item>
      </el-col>
    
      <el-form-item label="当值员工数">
        <el-input
          v-model="openRule.employeeValue"
          ref="employeeValueInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('employeeValueInput')"></i>
          <i class="el-icon-check" @click="save('employeeValueInput')"></i>
        </span>
      </el-form-item>
   
    </el-form>
    <h2>关店规则</h2>
    <el-form :model="closeRule" label-width="120px">
      <el-col :span="10">
        <el-form-item label="关店时间/h">
          <el-input
            v-model="closeRule.closeTime"
            ref="closeTimeInput"
          ></el-input>

          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('closeTimeInput')"></i>
            <i class="el-icon-check" @click="save('closeTimeInput')"></i>
          </span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="基础值">
          <el-input
            v-model="closeRule.closebaseValue"
            ref="closebaseValueInput"
          ></el-input>
          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('closebaseValueInput')"></i>
            <i class="el-icon-check" @click="save('closebaseValueInput')"></i>
          </span>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="当值员工数">
          <el-input
            v-model="closeRule.employeeValue2"
            ref="close-employeeInput"
          ></el-input>
          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('close-employeeInput')"></i>
            <i class="el-icon-check" @click="save('close-employeeInput')"></i>
          </span>
        </el-form-item>
      </el-col>
  
        <el-form-item label="最少当值员工数">
          <el-input
            v-model="closeRule.minemployeeValue"
            ref="minemployeeInput"
          ></el-input>
          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('minemployeeInput')"></i>
            <i class="el-icon-check" @click="save('minemployeeInput')"></i>
          </span>
        </el-form-item>
 
    </el-form>
    <h2>客流规则</h2>
    <el-form :model="flowRule" label-width="120px">
      <el-form-item label="基础值">
        <el-input v-model="flowRule.flowBase" ref="flowBaseInput"></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('flowBaseInput')"></i>
          <i class="el-icon-check" @click="save('flowBaseInput')"></i>
        </span>
      </el-form-item>
    </el-form>
    <h2>分组规则</h2>
    <el-form :model="groupRule" label-width="120px">
      <el-form-item label="组内人数">
        <el-input
          v-model="groupRule.groupBase"
          ref="groupBaseInput"
          class="input2"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('groupBaseInput')"></i>
          <i class="el-icon-check" @click="save('groupBaseInput')"></i>
        </span>
      </el-form-item>
    </el-form>
    <h2>进货规则</h2>
    <el-form :model="stockRule" label-width="140px">
      <el-col :span="10">
        <el-form-item label="进货最长持续时长/h">
          <el-input
            v-model="stockRule.maxDuration"
            ref="maxDurationInput"
          ></el-input>
          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('maxDurationInput')"></i>
            <i class="el-icon-check" @click="save('maxDurationInput')"></i>
          </span>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="最小员工数">
          <el-input v-model="stockRule.minStaff" ref="minStaffInput"></el-input>
          <span class="icon-container">
            <i class="el-icon-edit" @click="edit('minStaffInput')"></i>
            <i class="el-icon-check" @click="save('minStaffInput')"></i>
          </span>
        </el-form-item>
      </el-col>
    
      <el-form-item label="进货最短持续时间/h">
        <el-input
          v-model="stockRule.minDuration"
          ref="minDurationInput"
        ></el-input>
        <span class="icon-container">
          <i class="el-icon-edit" @click="edit('minDurationInput')"></i>
          <i class="el-icon-check" @click="save('minDurationInput')"></i>
        </span>
      </el-form-item>
    
    </el-form>
  </div>
</template>

<script>
import {
  reqShowDiy,
  reqopenRule,
  reqcloseRule,
  reqFlowRule,
  reqGroupRule,
  reqStockRule,
} from "../../api/shopRule";
import { Toast, resetObj } from "../../composables/utils";
export default {
  data() {
    return {
      openRule: {
        openbaseValue: "",
        openTime: "",
        employeeValue: "",
      },
      closeRule: {
        closebaseValue: "",
        closeTime: "",
        employeeValue2: "",
        minemployeeValue: "",
      },
      flowRule: {
        flowBase: "",
      },
      groupRule: {
        groupBase: "",
      },
      stockRule: {
        maxDuration: "",
        minStaff: "",
        minDuration: "",
      },
      iconVisible: false,
    };
  },
  created() {
    this.shopRule();
  },

  methods: {
    async shopRule() {
      const res = await reqShowDiy();

      console.log("商铺规则页面");
      console.log(res);
      //开店规则
      console.log("基础值");
      const opentime = JSON.parse(res.data[0].shopRoleValue);
      this.openRule.openTime = opentime.openTime;
      console.log(this.openRule.openTime);
      const openbaseNum = JSON.parse(res.data[0].shopRoleValue);
      this.openRule.openbaseValue = openbaseNum.baseNum;
      const openpeople = JSON.parse(res.data[0].shopRoleValue);
      this.openRule.employeeValue = parseInt(openpeople.fomula);
      //关店规则
      console.log("基础值");
      const closetime = JSON.parse(res.data[1].shopRoleValue);
      this.closeRule.closeTime = closetime.endTime;
      const closebaseNum = JSON.parse(res.data[1].shopRoleValue);
      this.closeRule.closebaseValue = closebaseNum.baseNum;
      const closepeople = JSON.parse(res.data[1].shopRoleValue);
      this.closeRule.employeeValue2 = parseInt(closepeople.fomula);
      const minclosepeople = JSON.parse(res.data[1].shopRoleValue);
      this.closeRule.minemployeeValue = parseInt(minclosepeople.fomula);
      //客流规则
      const flow = JSON.parse(res.data[2].shopRoleValue);
      this.flowRule.flowBase = flow.baseNum;

      //分组规则
      const group = JSON.parse(res.data[3].shopRoleValue);
      this.groupRule.groupBase = group.deadLineEmployee;

      //进货规则
      const maxDuration = JSON.parse(res.data[4].shopRoleValue);
      this.stockRule.maxDuration = maxDuration.maxLastTime;
      const minDuration = JSON.parse(res.data[4].shopRoleValue);
      this.stockRule.minDuration = minDuration.minLastTime;
      const minStaff = JSON.parse(res.data[4].shopRoleValue);
      this.stockRule.minStaff = minDuration.minEmployee;
    },
    showIcon() {
      this.iconVisible = true;
    },
    hideIcon() {
      this.iconVisible = false;
    },
    edit(refName) {
      this.$refs[refName].focus();
      console.log("这是修改框");
      console.log(refName);
    },
    async save(refName) {
      if (
        refName === "openTimeInput" ||
        refName === "baseValueInput" ||
        refName === "employeeValueInput"
      ) {
        console.log(refName);
        console.log("*****************-------------------");
        console.log(this.openRule);
        const res2 = await reqopenRule(this.openRule);
        console.log("这是修改openRule");
        console.log(res2);
        if (res2.state == 200) {
          Toast("修改成功");
        }
      } else if (
        refName === "closeTimeInput" ||
        refName === "closebaseValueInput" ||
        refName === "close-employeeInput" ||
        refName === "minemployeeInput"
      ) {
        const res3 = await reqcloseRule(this.closeRule);
        console.log("这是修改关店规则");
        console.log(res3);
        if (res3.state == 200) {
          Toast("修改成功");
        }
      } else if (refName === "flowBase") {
        const res4 = await reqFlowRule(this.flowRule);
        console.log("这是修改客流规则");
        console.log(res4);
        if (res4.state == 200) {
          Toast("修改成功");
        }
      } else if (refName === "groupBaseInput") {
        const res5 = await reqGroupRule(this.groupRule);
        console.log("这是修改分组规则");
        console.log(res5);
        if (res5.state == 200) {
          Toast("修改成功");
        }
      } else if (
        refName === "maxDurationInput" ||
        refName === "minStaffInput" ||
        refName === "minDurationInput"
      ) {
        const res6 = await reqStockRule(this.stockRule);
        console.log("这是修改进货规则");
        console.log(res6);
        if (res6.state == 200) {
          Toast("修改成功");
        }
      }
    },
  },
};
</script>

<style  scoped>
.el-input {
  position: relative;
  width: 140px;
}
.icon-container {
  position: absolute;
  width: 60px;
  margin-top: -20px;
  left: 20%;
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
h2{
  color:#409EFF;
}
</style>