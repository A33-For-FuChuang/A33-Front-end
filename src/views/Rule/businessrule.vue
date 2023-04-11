<template>
  <div class="shop-rules">

    <div class="box1">
      <h2>开店规则</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog1"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="openRule" label-width="120px">
      <el-col :span="8">
        <el-form-item label="开店时间/h">
          <el-input v-model="openRule.openTime"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="基础值">
          <el-input v-model="openRule.openbaseValue"></el-input>
        </el-form-item>
      </el-col>

      <el-form-item label="当值员工数">
        <el-input v-model="openRule.employeeValue"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible1" class="dialog1">
      <el-form :model="openRule" label-width="120px">
        <el-form-item label="开店时间/h">
          <el-input v-model="openRule.openTime"></el-input>
        </el-form-item>

        <el-form-item label="基础值">
          <el-input v-model="openRule.openbaseValue"></el-input>
        </el-form-item>

        <el-form-item label="当值员工数">
          <el-input v-model="openRule.employeeValue"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>关店规则</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog2"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="closeRule" label-width="120px">
      <el-col :span="10">
        <el-form-item label="关店时间/h">
          <el-input v-model="closeRule.closeTime"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="基础值">
          <el-input v-model="closeRule.closebaseValue"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="当值员工数">
          <el-input v-model="closeRule.employeeValue2"></el-input>
        </el-form-item>
      </el-col>

      <el-form-item label="最少当值员工数">
        <el-input v-model="closeRule.minemployeeValue"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible2">
      <el-form :model="closeRule" label-width="120px" :inline="true">
        <el-form-item label="关店时间/h">
          <el-input v-model="closeRule.closeTime"></el-input>
        </el-form-item>

        <el-form-item label="基础值">
          <el-input v-model="closeRule.closebaseValue"></el-input>
        </el-form-item>

        <el-form-item label="当值员工数">
          <el-input v-model="closeRule.employeeValue2"></el-input>
        </el-form-item>

        <el-form-item label="最少当值员工数">
          <el-input v-model="closeRule.minemployeeValue"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel2">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>客流规则</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog3"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="flowRule" label-width="120px">
      <el-form-item label="基础值">
        <el-input v-model="flowRule.flowBase"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible3"  class="dialog4">
      <el-form :model="flowRule" label-width="120px">
        <el-form-item label="基础值">
          <el-input v-model="flowRule.flowBase"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button @click="cancel3">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>分组规则</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog4"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="groupRule" label-width="120px">
      <el-form-item label="组内人数">
        <el-input v-model="groupRule.groupBase" class="input2"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible4" class="dialog4">
      <el-form :model="flowRule" label-width="120px">
        <el-form-item label="组内人数">
          <el-input v-model="groupRule.groupBase"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm4">确 定</el-button>
        <el-button @click="cancel4">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>进货规则</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog5"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="stockRule" label-width="140px">
      <el-col :span="8">
        <el-form-item label="进货最长持续时长/h">
          <el-input v-model="stockRule.maxDuration"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="最小员工数">
          <el-input v-model="stockRule.minStaff"></el-input>
        </el-form-item>
      </el-col>

      <el-form-item label="进货最短持续时间/h">
        <el-input v-model="stockRule.minDuration"></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible5" class="dialog5">
      <el-form :model="stockRule" label-width="140px">
        <el-form-item label="进货最长持续时长/h">
          <el-input v-model="stockRule.maxDuration"></el-input>
        </el-form-item>

        <el-form-item label="最小员工数">
          <el-input v-model="stockRule.minStaff"></el-input>
        </el-form-item>

        <el-form-item label="进货最短持续时间/h">
          <el-input v-model="stockRule.minDuration"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm5">确 定</el-button>
        <el-button @click="cancel5">取 消</el-button>
      </div>
    </el-dialog>
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
import { employeeinfo } from "../../api/employee";

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
      editDialogVisible1: false,
      editDialogVisible2: false,
      editDialogVisible3: false,
      editDialogVisible4: false,
      editDialogVisible5: false,
      showedit:false
    };
  },
  created() {
    this.personalinfo();
    this.shopRule();
  },

  methods: {
    async personalinfo() {
      const res = await employeeinfo();
      this.form = res.data;
      if (this.form.position != "店长" && this.form.position != "经理") {
        this.showedit = false;
        console.log("我不是店长");
        return this.showedit;
      } else {
        this.showedit = true;
        return this.showedit;
      }
    },
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
    async submitForm1() {
      const res1 = await reqopenRule(this.openRule);
      console.log("这是开店时间");
      console.log(res1);
      Toast("修改成功");
       this.editDialogVisible1 = false;
    },
    async submitForm2() {
      const res2 = await reqcloseRule(this.closeRule);
      console.log("这是关店时间");
      console.log(res2);
      Toast("修改成功");
       this.editDialogVisible2 = false;
    },
    async submitForm3() {
      const res3 = await reqFlowRule(this.flowRule);
      console.log("这是客流规则");
      console.log(res3);
      Toast("修改成功");
       this.editDialogVisible3 = false;
    },
    async submitForm4() {
      const res4 = await reqGroupRule(this.groupRule);
      console.log("这是分组规则");
      console.log(res4);
      Toast("修改成功");
       this.editDialogVisible4 = false;
    },
    async submitForm5() {
      const res4 = await reqStockRule(this.stockRule);
      console.log("这是进货规则");
      console.log(res4);
      Toast("修改成功");
       this.editDialogVisible5 = false;
    },
    showEditDialog1() {
      this.editDialogVisible1 = true;
    },
    showEditDialog2() {
      this.editDialogVisible2 = true;
    },
    showEditDialog3() {
      this.editDialogVisible3 = true;
    },
    showEditDialog4() {
      this.editDialogVisible4 = true;
    },
    showEditDialog5() {
      this.editDialogVisible5 = true;
    },
    //取消
    cancel1() {
      this.editDialogVisible1 = false;
    },
    cancel2() {
      this.editDialogVisible2 = false;
    },
    cancel3() {
      this.editDialogVisible3 = false;
    },
    cancel4() {
      this.editDialogVisible4 = false;
    },
    cancel5() {
      this.editDialogVisible5 = false;
    },
  },
};
</script>

<style  scoped>
.el-input {
  position: relative;
  width: 120px;
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
.box1 {
  position: relative;
  margin-bottom: 18px;
}
.but1 {
  position: absolute;
  margin-left: 170px;
  width: 50px;
  height: 30px;
  padding: 10px;
  margin-top: -33px;
}
.dialog1,.dialog4 {
  width: 1000px;
  height: 1000px;
  margin-left: 270px;
}
.dialog5{
  width: 1300px;
    margin-left: 130px;

}
.el-form-item__content {
  margin-top: 20px;
}
.eloption {
  margin-left: 320px;
}
</style>