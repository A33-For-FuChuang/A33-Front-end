<template>
  <div class="main" v-loading="loading">
    <div class="table-wrap">
      <div class="head-style">
        <dl class="table-tr">
          <dd>
            <span>时间</span>
          </dd>
          <dd v-for="(item, index) in dates" :key="item">
            <span>{{ item }}</span>
            <div>{{ week[index] }}</div>
          </dd>
        </dl>
      </div>
      <div class="head-style">
        <dl class="table-tr" v-for="(item, index) in weekWork" :key="index">
          <dd>{{week[index]}}</dd>
          <dd v-for="(dd, i) in item" :key="dd.locationID">
            <el-button
              v-if="dd.length > 1"
              type="primary"
              @click="getAll(dd, i)"
              >查看所有</el-button
            >
            <div v-else>
              <span>{{ dd[0]?.name }}</span>
              <div>{{ dd[0]?.position }}</div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <el-dialog :title="clickDate" :visible.sync="dialogVisible" width="30%">
      <span>
        <el-table :data="tableData" height="450" border style="width: 100%">
          <el-table-column
            prop="employeeID"
            label="职员id"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center" width="160">
          </el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getWeek, transformTime } from "../composables/utils";
import { getDateKey } from "@/composables/auth";
import {
  reqGetWeekWork,
  reqGetWeekLocations,
  reqGetGroupWork,
  reqGetPositionWork,
} from "@/api/location";
export default {
  data() {
    return {
      weekWork: [],
      dates: [],
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      today: "",
      loading: false,
      groupId: "",
      position: "",
      dialogVisible: false,
      tableData: [],
      clickDate: "",
    };
  },
  methods: {
    getData(res, date) {
      const {data}=res
      for(let i=0;i<data.length;i++) {
        for(let j=0;j<data[i].length;j++) {
          this.removeDuplicate(data[i][j])
        }
      }
      this.weekWork = data;
      const formattedDate = transformTime(date);
      this.dates = getWeek(formattedDate);
    },
    getAll(data, index) {
      this.clickDate = this.dates[index] + "-" + this.week[index];
      this.tableData = data
      this.dialogVisible = true;
    },
    // 去重
    removeDuplicate(arr) {
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (arr[i].employeeID === arr[j].employeeID) {
            arr.splice(j, 1);
            len--; // 减少循环次数提高性能
            j--; // 保证j的值自加后不变
          }
        }
      }
      return arr;
    },
    async getAllData() {
      this.loading = true;
      const date = getDateKey();
      const res = await reqGetWeekWork(date);
      if (res.state == 200) {
        this.getData(res, date);
      }
      this.loading = false;
    },
    async getPersonData() {
      this.loading = true;
      const date = getDateKey();
      const res = await reqGetWeekLocations(date);
      if (res.state == 200) {
        this.getData(res, date);
      }
      this.loading = false;
    },
    async getGroupWork() {
      this.loading = true;
      const date = getDateKey();
      const res = await reqGetGroupWork(date, this.groupId);
      if (res.state == 200) {
        this.getData(res, date);
      }
      this.loading = false;
    },
    async getPositionWork() {
      this.loading = true;
      const date = getDateKey();
      const res = await reqGetPositionWork(date, this.position);
      if (res.state == 200) {
        this.getData(res, date);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.$bus.$on("groupWork", (id) => {
      if (id == "") {
        this.getAllData();
      } else {
        this.groupId = id;
        this.getGroupWork();
      }
    });
    this.$bus.$on("positionWork", (position) => {
      if (position == "") {
        this.getAllData();
      } else {
        this.position = position;
        this.getPositionWork();
      }
    });
    this.$bus.$on("weekWork", () => {
      if (this.$store.state.common.isPublic) {
        this.getAllData();
      } else {
        this.getPersonData();
      }
    });
    this.getAllData();
  },
};
</script>

<style scoped lang="less">
.main {
  margin-top: 20px;
}
.table-wrap {
  display: table;
  width: 100%;
  border-collapse: collapse;
  .head-style {
    display: table-header-group;
    .table-tr {
      display: table-row;
      dd {
        display: table-cell;
        text-align: center;
        height: 50px;
        width: 120px;
        vertical-align: middle;
        // border-bottom: 1px solid #ddd;
        // border-right: 1px solid #ddd;
        border: 1px solid #ddd;
        border-collapse: collapse;
      }
    }
  }
}
table {
  table-layout: fixed;
}
td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
