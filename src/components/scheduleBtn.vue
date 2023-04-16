<template>
  <div>
    <div>
      <el-button
        type="primary"
        size="medium"
        @click="getSchedule"
        v-permission="['/scheduling/IntelligentScheduling']"
        >智能排班</el-button
      >
      <el-button type="primary" size="medium" @click="getNowDayWork()"
        >查看当日排班</el-button
      >
      <el-button
        type="primary"
        size="medium"
        @click="saveTemplate"
        v-permission="['/template/saveTemplate']"
        >保存模板</el-button
      >
      <el-button
        type="primary"
        size="medium"
        @click="getStock"
        v-permission="['/location/stock']"
        >查看进货人员</el-button
      >
      <el-button
        type="primary"
        size="medium"
        @click="getCopyList"
        v-permission="['/location/showCopy']"
        >查看备份列表</el-button
      >
      <el-button
        type="primary"
        size="medium"
        @click="getFreeWorker"
        v-permission="['/location/showFree']"
        >查看空闲员工</el-button
      >
      <el-button
        type="primary"
        size="medium"
        @click="handleSchedule('search')"
        v-permission="['/location/selectLocations']"
        >搜索排班</el-button
      >
      <el-button
        type="warning"
        size="medium"
        @click="handleSchedule('edit')"
        v-permission="['/location/manage']"
        >安排排班</el-button
      >
      <el-button
        type="danger"
        size="medium"
        @click="handleSchedule('del')"
        v-permission="['/location/remove']"
        >删除排班</el-button
      >
      
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :destroy-on-close="true"
      width="80%"
      :close-on-click-modal="false"
    >
      <manageTable
        ref="manageTable"
        :dates="dates"
        :title="title"
        :formTime="formTime"
      ></manageTable>
    </el-dialog>

    <el-dialog
      title="进货人员"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
    >
      <div class="stock">
        <div class="monday">
          <div>{{ mondayTime }}-周一</div>
          <div v-for="(item, index) in mondayStock" :key="index" class="mt-10">
            <el-tag class="tag" type="success" size="medium">{{ item }}</el-tag>
          </div>
        </div>
        <div class="friday">
          <div>{{ fridayTime }}-周五</div>
          <div v-for="(item, index) in fridayStock" :key="index" class="mt-10">
            <el-tag class="tag" type="success" size="medium ">{{
              item
            }}</el-tag>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="空闲员工" :visible.sync="dialogFreeWorker">
      <el-table :data="freeWorkers" border>
        <el-table-column
          property="phone"
          label="职位"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column property="phone" label="电话"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="当天员工排班" :visible.sync="dialogNowWorker">
      <NowWorkTable :table="nowDayWork"></NowWorkTable>
    </el-dialog>
  </div>
</template>

<script>
import { getWeek, transformTime } from "@/composables/utils";
import { reqGetStock, reqShowFreeWorker, reqDayWork } from "@/api/location";
import { reqSaveTemplate } from "../api/template";
import { reqSchedule } from "@/api/scheduling";
import { getDateKey } from "@/composables/auth";
import { Toast } from "@/composables/utils";
import manageTable from "@/components/manageTable";
import { getMondayAndSunday } from "../composables/utils";
import NowWorkTable from "./nowWorkTable";
export default {
  components: {
    manageTable,
    NowWorkTable,
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogFreeWorker: false,
      form: {
        employeeID: "",
        locationID: "",
      },
      formLabelWidth: "120px",
      title: "安排排班",
      dates: [],
      fridayStock: [],
      mondayStock: [],
      fridayTime: "",
      mondayTime: "",
      formTime: {},
      freeWorkers: [],
      nowDayWork: [],
      dialogNowWorker: false,
    };
  },
  methods: {
    initDates() {
      const date = getDateKey();
      const formattedDate = transformTime(date);
      this.dates = getWeek(formattedDate);
    },
    async getSchedule() {
      const date = getDateKey();
      const info = this.$notify.info({
        title: "智能排班中",
        message: "该过程过久，请耐心等待",
        showClose: false,
        duration: 0,
      });
      const res = await reqSchedule(date);
      if (res.state == 200) {
        info.close();
        Toast("排班成功");
      }
    },
    MondayAndSunday() {
      let date = getDateKey();
      this.formTime = getMondayAndSunday(date);
    },
    handleSchedule(val) {
      if (val == "edit") {
        this.title = "安排排班";
      } else if (val == "del") {
        this.title = "删除排班";
      } else if (val == "search") {
        this.title = "搜索排班";
      }
      this.dialogFormVisible = true;
    },
    async getStock() {
      const date = getDateKey();
      const res = await reqGetStock(date);
      if (res.state == 200) {
        this.dialogTableVisible = true;
        this.fridayStock = res.data.friday.names;
        this.fridayTime = res.data.friday.time;
        this.mondayStock = res.data.monday.names;
        this.mondayTime = res.data.monday.time;
      }
    },
    async getFreeWorker() {
      this.dialogFreeWorker = true;
      const date = getDateKey();
      const res = await reqShowFreeWorker(date);
      if (res.state == 200) {
        this.freeWorkers = res.data;
      }
    },
    async getNowDayWork() {
      const date = getDateKey();
      const res = await reqDayWork(date);
      if (res.state == 200) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].length != 0) {
            this.nowDayWork = res.data[i];
          }
        }
      }
      this.dialogNowWorker = true;
    },
    async getCopyList() {
      this.dialogFormVisible = true;
      this.title = "查看模板";
    },
    async saveTemplate() {
      const date = getDateKey();
      const res = await reqSaveTemplate(date);
      if (res == 200) {
        console.log(res);
      }
    },
  },
  created() {
    this.initDates();
    this.MondayAndSunday();
  },
};
</script>

<style scoped>
.stock {
  display: flex;
  font-size: 20px;
}
.friday {
  flex: 1;
  text-align: center;
}
.monday {
  flex: 1;
  text-align: center;
}
.tag {
  font-size: 16px;
}
</style>
