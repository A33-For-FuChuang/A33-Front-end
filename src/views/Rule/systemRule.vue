<template>
  <div class="shop-rules">
    <div class="box1">
      <h2>门店营业时间段</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog1"
        v-if="showedit"
        >编辑</el-button
      >
    </div>

    <el-form :model="lastTime" label-width="120px">
      <el-col :span="8">
        <el-form-item label="工作日">
          <el-input v-model="lastTime.workDay" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="上班时间/点">
          <el-input v-model="lastTime.workStart" :readonly="true"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="下班时间/点">
          <el-input
            v-model="lastTime.workEnd"
            ref="workEndInput"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="周末上班">
          <el-input
            v-model="lastTime.weekend"
            ref="weekendInput"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="周末上班时间/点">
          <el-input
            v-model="lastTime.weekendStart"
            ref="weekendStartInput"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="周末下班时间/点">
        <el-input
          v-model="lastTime.weekendEnd"
          ref="weekendEndInput"
          :readonly="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible1">
      <el-form :model="lastTime" label-width="120px" :inline="true">
        <el-form-item label="工作日">
          <el-input v-model="lastTime.workDay"></el-input>
        </el-form-item>

        <el-form-item label="上班时间/点">
          <el-select
            v-model="lastTime.workStart"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="number in numbers" :key="number" :value="number">
              {{ number }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="下班时间/点">
          <el-select
            v-model="lastTime.workEnd"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="number in numbers" :key="number" :value="number">
              {{ number }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="周末上班">
          <el-input v-model="lastTime.weekend" ref="weekendInput"></el-input>
        </el-form-item>

        <el-form-item label="周末上班时间/点">
          <el-select
            v-model="lastTime.weekendStart"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="number in numbers" :key="number" :value="number">
              {{ number }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="周末下班时间/点">
          <el-select
            v-model="lastTime.weekendEnd"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="number in numbers" :key="number" :value="number">
              {{ number }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>员工工作时长</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog2"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="employeeworkTime" label-width="160px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="单周最长工作时间/h">
            <el-input
              v-model="employeeworkTime.weekMaxTime"
              ref="weekMaxTimeInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单日最长工作时间/h">
            <el-input
              v-model="employeeworkTime.dayMaxTime"
              ref="dayMaxTimeInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单次工作时间最小值/h">
            <el-input
              v-model="employeeworkTime.locationMinTime"
              ref="locationMinTimeInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="单次工作时间最大值/h">
          <el-input
            v-model="employeeworkTime.locationMaxTime"
            ref="locationMaxTimeInput"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible2">
      <el-form :model="employeeworkTime" label-width="160px" :inline="true">
        <el-form-item label="单周最长工作时间/h">
          <el-input
            v-model="employeeworkTime.weekMaxTime"
            ref="weekMaxTimeInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="单日最长工作时间/h">
          <el-input
            v-model="employeeworkTime.dayMaxTime"
            ref="dayMaxTimeInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="单次工作时间最小值/h">
          <el-input
            v-model="employeeworkTime.locationMinTime"
            ref="locationMinTimeInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="单次工作时间最大值/h">
          <el-input
            v-model="employeeworkTime.locationMaxTime"
            ref="locationMaxTimeInput"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel2">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>休息时间段</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog3"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="restTime" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="午餐时长/h">
            <el-input
              v-model="restTime.lunchTime"
              ref="lunchTimeInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="午餐开始时间/点">
            <el-input
              v-model="restTime.lunchTimeStart"
              ref="lunchTimeStartInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="午餐结束时间/点">
            <el-input
              v-model="restTime.lunchTimeEnd"
              ref="lunchTimeEndInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="晚餐时长">
            <el-input
              v-model="restTime.dinnerTime"
              ref="dinnerTimeInput"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="晚餐开始时间/点">
            <el-input
              v-model="restTime.dinnerTimeStart"
              ref="dinnerTimeStart"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="晚餐结束时间/点">
            <el-input
              v-model="restTime.dinnerTimeEnd"
              ref="dinnerTimeEnd"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="休息时长">
          <el-input
            v-model="restTime.resttime"
            ref="resttimeInput"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <el-dialog :inline="true" :visible.sync="editDialogVisible3">
      <el-form :model="restTime" label-width="120px" :inline="true">
        <el-form-item label="午餐时长/h">
          <el-input
            v-model="restTime.lunchTime"
            ref="lunchTimeInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="午餐开始时间/点">
          <el-select
            v-model="restTime.lunchTimeStart"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="rest in restnumbers" :key="rest" :value="rest">
              {{ rest }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="午餐结束时间/点">
          <el-select
            v-model="restTime.lunchTimeEnd"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="rest in restnumbers" :key="rest" :value="rest">
              {{ rest }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="晚餐时长/h">
          <el-input
            v-model="restTime.dinnerTime"
            ref="dinnerTimeInput"
          ></el-input>
        </el-form-item>

        <el-form-item label="晚餐开始时间/点">
          <el-select
            v-model="restTime.dinnerTimeStart"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="rest in restnumbers" :key="rest" :value="rest">
              {{ rest }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="晚餐结束时间/点">
          <el-select
            v-model="restTime.dinnerTimeEnd"
            placeholder="请选择"
            style="width: 120px"
          >
            <el-option v-for="rest in restnumbers" :key="rest" :value="rest">
              {{ rest }}
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="休息时长/h">
          <el-input v-model="restTime.resttime" ref="resttimeInput"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm3">确 定</el-button>
        <el-button @click="cancel3">取 消</el-button>
      </div>
    </el-dialog>
    <div class="box1">
      <h2>班次职位安排</h2>
      <el-button
        type="primary"
        style="font-size: 12px"
        class="but1"
        @click="showEditDialog4"
        v-if="showedit"
        >编辑</el-button
      >
    </div>
    <el-form :model="groupPosition" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="各职位人数">
            <el-input
              v-model="groupPosition.positionMap"
              ref="positionMapInput"
              style="width: 250px"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="editDialogVisible4">
      <el-form :model="groupPosition" label-width="120px" :inline="true">
        <el-form-item label="职位">
          <el-select
            v-model="groupPosition.position1"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option label="导购" value="导购"></el-option>
            <el-option label="收银" value="收银"></el-option>
            <el-option label="库房" value="库房"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人数">
          <el-input
            v-model="groupPosition.positionMapnum1"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="groupPosition" label-width="120px" :inline="true">
        <el-form-item label="职位">
          <el-select
            v-model="groupPosition.position2"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option label="导购" value="导购"></el-option>
            <el-option label="收银" value="收银"></el-option>
            <el-option label="库房" value="库房"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人数">
          <el-input
            v-model="groupPosition.positionMapnum2"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="groupPosition" label-width="120px" :inline="true">
        <el-form-item label="职位">
          <el-select
            v-model="groupPosition.position3"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option label="导购" value="导购"></el-option>
            <el-option label="收银" value="收银"></el-option>
            <el-option label="库房" value="库房"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人数">
          <el-input
            v-model="groupPosition.positionMapnum3"
            placeholder="请填写"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm4">确 定</el-button>
        <el-button @click="cancel4">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqShowSystem,
  reqLastTime,
  reqWorkTime,
  reqRestTime,
  reqGroupPosition,
} from "../../api/shopRule";
import { employeeinfo } from "../../api/employee";

import { Toast, resetObj } from "../../composables/utils";
export default {
  data() {
    return {
      form: {},
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
        //显示职位和数字
        positionMap: "",
        //职位和相应的人数
        positionMapnum1: "",
        position1: "",
        positionMapnum2: "",
        position2: "",
        positionMapnum2: "",
        position3: "",
      },

      editDialogVisible1: false,
      editDialogVisible2: false,
      editDialogVisible3: false,

      editDialogVisible4: false,
      newposition: [],
      showedit: false,
      numbers: Array.from({ length: 18 }, (_, index) => index + 6), // 6-23 的数组
      restnumbers: Array.from({ length: 12 }, (_, index) => index + 11), // 生成 1-100 的数组
    };
  },

  created() {
    this.personalinfo();
    this.systemRule();
  },

  methods: {
    async personalinfo() {
      const res = await employeeinfo();
      this.form = res.data;
      console.log(this.form.position);
      if (this.form.position != "店长" && this.form.position != "经理") {
        this.showedit = false;
        console.log("我不是店长");
        return this.showedit;
      } else {
        this.showedit = true;
        return this.showedit;
      }
    },
    async systemRule() {
      const res = await reqShowSystem();

      console.log("商铺系统规则页面");
      console.log(res);
      console.log(res.data[0].systemRoleValue);
      const worktime1 = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.workDay = worktime1.workDay;
      console.log(worktime1.workDay);
      const workStart = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.workStart = workStart.workStart;
      const workover = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.workEnd = workover.workEnd;
      const workend = JSON.parse(res.data[0].systemRoleValue);
      this.lastTime.weekend = workend.weekend;
      console.log(workend.weekend);
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
      console.log("--------------------------");
      console.log(positionMap.PositionMap);

      let str = JSON.stringify(positionMap.PositionMap);
      str = str.replace(/[{}"]/g, "").replace(/:/g, ": ");
      this.groupPosition.positionMap = str;
      // this.groupPosition.positionMapnum=positionMap.PositionMap
      this.groupPosition.positionCount = Object.keys(
        positionMap.PositionMap
      ).length;
      // console.log(positionCount);
      // //获取职位后面的人数
      for (const positionmap in positionMap.PositionMap) {
        console.log("--------------------------------------");
        console.log(positionMap.PositionMap[positionmap]);

        this.groupPosition.positionMapnum =
          positionMap.PositionMap[positionmap] +
          "," +
          this.groupPosition.positionMapnum;
      }
      // //去掉最后一个逗号
      this.groupPosition.positionMapnum =
        this.groupPosition.positionMapnum.slice(0, -1);

      const position = JSON.parse(res.data[3].systemRoleValue);
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
    async submitForm() {
      const res1 = await reqLastTime(this.lastTime);
      console.log("这是门店营业时间段");
      console.log(res1);
      Toast("修改成功");
       this.editDialogVisible1 = false;
    },
    async submitForm2() {
      const res2 = await reqWorkTime(this.employeeworkTime);
      console.log("这是员工工作时间");
      console.log(res2);
      Toast("修改成功");
       this.editDialogVisible2 = false;

    },
    async submitForm3() {
      const res3 = await reqRestTime(this.restTime);
      console.log("这是休息时间");
      console.log(res3);
      Toast("修改成功");
       this.editDialogVisible3 = false;
    },

    async submitForm4() {
      console.log(this.groupPosition);
      if(this.groupPosition.positionMapnum1==''||this.groupPosition.positionMapnum2==''||this.groupPosition.positionMapnum3==''||this.groupPosition.position1==''||this.groupPosition.position2==''||this.groupPosition.position3=='')
      {
         this.$message.error('不能留空哦');
      }
      const res4 = await reqGroupPosition(this.groupPosition);
      console.log("这是职位");
      console.log(res4);
      Toast("修改成功");
       this.editDialogVisible4 = false;
    },
    //取消
    cancel() {
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
  margin-left: 180px;
  width: 50px;
  height: 30px;
  padding: 10px;
  margin-top: -33px;
}
.el-form-item__label {
  top: 20px;
}
.dialog {
  width: 1000px;
  height: 800px;
  margin-left: 300px;
}
</style>