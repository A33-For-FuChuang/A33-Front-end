<template>
  <div class="preference-container" >
    <h2 class="preference-title" >员工偏好展示页面</h2>
      

    <div class="preference-section">
      <h3 class="preference-subtitle">工作日偏好</h3>
      <el-row :gutter="10" class="preference-list">
        <el-col
          v-for="(preference, index) in workdayPreferences"
          :key="index"
          :span="8"
        >
          <el-card class="preference-card" shadow="hover">
            <div class="preference-info">周{{ preference }}</div>
            <div class="preference-actions">
              <el-tooltip content="编辑">
                <i
                  class="el-icon-edit"
                  @click="editPreference('workday', index)"
                ></i>
              </el-tooltip>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" v-if="workdayPreferences.length < 2">
          <el-select
            class="preference-select"
            v-model="newWorkdayPreference"
            placeholder="选择工作日"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
            <el-option label="6" value="6"></el-option>
            <el-option label="7" value="7"></el-option>
          </el-select>

          <el-button
            class="add-button"
            type="primary"
            icon="el-icon-plus"
            @click="addPreference('workday')"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="preference-section">
      <h3 class="preference-subtitle">工作时间偏好</h3>
      <el-row :gutter="10" class="preference-list">
        <el-col
          v-for="(preference, index) in worktimePreferences"
          :key="index"
          :span="8"
        >
          <el-card class="preference-card" shadow="hover">
            <div class="preference-info">{{ preference }}</div>
            <div class="preference-actions">
              <el-tooltip content="编辑">
                <i
                  class="el-icon-edit"
                  @click="editPreference('worktime', index)"
                ></i>
              </el-tooltip>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" v-if="worktimePreferences.length < 2">
          <el-select
            class="preference-select"
            v-model="newWorktimePreference"
            placeholder="选择工作时间"
          >
            <el-option label="09:00~11:00" value="09:00~11:00"></el-option>
            <el-option label="11:00~13:00" value="11:00~13:00"></el-option>
            <el-option label="13:00~15:00" value="13:00~15:00"></el-option>
            <el-option label="15:00~17:00" value="15:00~17:00"></el-option>
            <el-option label="17:00~19:00" value="17:00~19:00"></el-option>
            <el-option label="19:00~21:00" value="19:00~21:00"></el-option>
          </el-select>

          <el-button
            class="add-button"
            type="primary"
            icon="el-icon-plus"
            @click="addPreference('worktime')"
            >添加</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="preference-hour">
      <h3 class="preference-subtitle">班次时长偏好/时</h3>
      <el-row :gutter="8" class="preference-hourlist">
        <el-col
          v-for="(preference, index) in workhourPreferences"
          :key="index"
          :span="8"
        >
          <el-card class="preference-card" shadow="hover">
            <div class="preference-info">{{ preference }}</div>
            <div class="preference-actions">
              <el-tooltip content="编辑">
                <i
                  class="el-icon-edit"
                  @click="editPreference('workhour', index)"
                ></i>
              </el-tooltip>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" v-if="workhourPreferences.length < 1">
          <el-input
            v-model="newWorkhourPreference"
            placeholder="班次时长"
          ></el-input>
          <el-button
            class="add-button"
            type="primary"
            icon="el-icon-plus"
            @click="addPreference('workhour')"
            >添加</el-button
          >
        </el-col>
      </el-row>
      
    </div>
   
       
  </div>
</template>
<script>
import { employeeinfo } from "../../api/employee";
import { Toast, resetObj } from "../../composables/utils";
import {
  reqWorkDay,
  reqWorkTime,
  reqWorkHour,
  reqShowEmployeeRole,
} from "../../api/employeeRole";
export default {
  data() {
    return {
      workdayPreferences: [],
      worktimePreferences: [],
      workhourPreferences: [],
      newWorkdayPreference: "",
      newWorktimePreference: "",
      newWorkhourPreference: "",
      newWorktimeDay: "",
    
    };
  },
  created() {
      
    this.showpre();
  },

  methods: {
   
    async showpre() {
      const res = await reqShowEmployeeRole();
      console.log(res.data);
      //班次时间
      const respone1 = res.data.employeeLastTimeDTO;
      this.workhourPreferences.push(respone1.lastTime);
      this.newWorkhourPreference = respone1.lastTime;
      //工作日
      const respone2 = res.data.employeeWorkDayDTO.employeeWorkDayList;
      this.workdayPreferences.push(respone2[0]);
      this.workdayPreferences.push(respone2[1]);
      console.log(this.workdayPreferences);
      //工作时间
      const respone3 = res.data.employeeWorkTimeDTO.employeeWorkTimeList;
      this.worktimePreferences.push(respone3[0]);
      this.worktimePreferences.push(respone3[1]);
    },
    async addPreference(type) {
      if (type === "workday") {
        if (this.newWorkdayPreference) {
          this.workdayPreferences.push(this.newWorkdayPreference);
          console.log(this.newWorkdayPreference);
          this.newWorkdayPreference = "";
        }

        const resday = await reqWorkDay(this.workdayPreferences);
        console.log("这是工作日信息");
        console.log(resday);

        if (resday.state == 200) {
          Toast("更改成功！");
        }
      }
      //工作时间
      else if (type === "worktime") {
        if (this.newWorktimePreference) {
          const newPreference = this.newWorktimePreference;
          this.worktimePreferences.push(newPreference);
          this.newWorktimePreference = "";
        }
        const restime = await reqWorkTime(this.worktimePreferences);
        if (restime.state == 200) {
          Toast("更改成功！");
        }

        //工作时长
      } else if (type === "workhour") {
        if (this.newWorkhourPreference) {
          this.workhourPreferences.push(this.newWorkhourPreference);
          this.newWorkhourPreference = "";
        }
        const lasttime = await reqWorkHour(this.workhourPreferences);
        if (lasttime.state == 200) {
          Toast("更改成功！");
        }
      }
    },
    editPreference(type, index) {
      if (type === "workday") {
        this.newWorkdayPreference = this.workdayPreferences[index];
        this.workdayPreferences.splice(index, 1);
      } else if (type === "worktime") {
        this.newWorktimePreference = this.worktimePreferences[index];
        this.worktimePreferences.splice(index, 1);
      } else if (type === "workhour") {
        this.newWorkhourPreference = this.workhourPreferences[index];
        this.workhourPreferences.splice(index, 1);
      }
    },
  },
};
</script>
<style scoped>
.preference-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.preference-title {
  font-size: 28px;
  margin-bottom: 20px;
}
.preference-section {
  margin-bottom: 30px;
}
.preference-subtitle {
  font-size: 20px;
  margin-bottom: 10px;
}
.preference-list {
  margin-left: -5px;
  margin-right: -5px;
}
.preference-card {
  margin-bottom: 10px;
}
.preference-info {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.preference-actions {
  text-align: center;
}
.but1 {
  margin-left: 20px;
  width: 60px;
  height: 35px;
  padding: 10px;
}
.elmbc {
  width: 800px;
}
.el-col-12 {
  width: 250px;
  height: 100px;
}
h3{
    color: #409eff;

}
.empty{
  width: 100%;
}
</style>

