<template>
  <div class="main" v-loading="isTableLoad">
    <div class="table-wrap">
      <div class="head-style">
        <dl class="table-tr">
          <dd>
            <span>时间</span>
          </dd>
          <dd v-for="item in time" :key="item">
            <span>{{ item }}</span>
          </dd>
        </dl>
      </div>
      <div class="head-style">
        <dl class="table-tr" v-for="(item, index) in week2" :key="index">
          <div>
            <dd>{{ dates[index] }}</dd>
            <dd>{{ week[index] }}</dd>
          </div>

          <dd v-for="(dd,i) in item" :key="dd.locationID">
            <el-button
              v-if="dd.length > 1"
              type="primary"
              @click="getAll(dd, index,i)"
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
    <el-dialog :destroy-on-close="true" :close-on-click-modal="false" :title="clickDate" :visible.sync="dialogVisible" width="25%">
      <span>
        <el-table :data="tableData" height="450" border>
          <el-table-column
            prop="position"
            label="职位"
            width="160"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
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
import {
  getWeek,
  transformTime,
  removeDuplicate,
  getMondayOfWeek,
} from "../../composables/utils";
import { getDateKey } from "../../composables/auth";
import {
  reqGetWeekWork,
  reqGetWeekLocations,
  reqGetGroupWork,
  reqGetPositionWork,
  reqGetStock,
} from "../../api/location";
import { reqSchedule } from "../../api/scheduling";
import { reqStartTemplate, reqShowTeplate } from "../../api/template";

export default {
  data() {
    return {
      dates: [],
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      time: [
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
      ],
      today: "",
      loading: false,
      groupId: "",
      position: "",
      dialogVisible: false,
      tableData: [],
      clickDate: "",
      week2:[]
    };
  },
  computed: {
    weekWork() {
      return this.$store.state.common.weekWork || [];
    },
    isTableLoad() {
      return this.$store.state.common.isTableLoad;
    },
  },
  methods: {
        async showdetail() {
      console.log("*****************************");
      console.log("这是细节", this.$route.query.name);
      const resdetail = await reqShowTeplate(this.$route.query.name);
      console.log("这是细节展示", resdetail.data);
      const l = Object.keys(resdetail.data).length;
      console.log(l);
      for (let i = 0; i < l; i++) {
        this.week2.push(resdetail.data[i]);
      }
     
      console.log("这是week", this.week2);

      return this.week2;
    },
    getData(res, date) {
      const { data } = res;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          removeDuplicate(data[i][j]);
        }
      }
      this.$store.commit("setWeekWork", data);
      const formattedDate = transformTime(date);
      this.dates = getWeek(formattedDate);
    },
    getAll(data, index,j) {
      this.clickDate =
        this.dates[index] + "-" + this.week[index] + "-" + this.time[j];
      this.tableData = data;
      this.dialogVisible = true;
    },
    async getAllData() {
      this.$store.commit("setTableLoad");
      const date = getDateKey();
      const res = await reqGetWeekWork(date);
      if (res.state == 200) {
        this.getData(res, date);
        this.$store.commit("setTableLoad");
      }
    },
    async getPersonData() {
      this.$store.commit("setTableLoad");
      const date = getMondayOfWeek(getDateKey());
      const res = await reqGetWeekLocations(date);
      if (res.state == 200) {
        this.getData(res, date);
        this.$store.commit("setTableLoad");
      }
    },
    async getGroupWork() {
      this.$store.commit("setTableLoad");
      const date = getDateKey();
      const res = await reqGetGroupWork(date, this.groupId);
      if (res.state == 200) {
        this.getData(res, date);
        this.$store.commit("setTableLoad");
      }
    },
    async getPositionWork() {
      this.$store.commit("setTableLoad");
      const date = getDateKey();
      const res = await reqGetPositionWork(date, this.position);
      if (res.state == 200) {
        this.getData(res, date);
        this.$store.commit("setTableLoad");
      }
    },
    async getStockPerson() {
      this.$store.commit("setTableLoad");
      const date = getDateKey();
      const res = await reqGetStock(date);
      if (res.state == 200) {
        this.$store.commit("setTableLoad");
      }
    },
    async getSchedule() {
      this.$store.commit("setTableLoad");
      const date = getDateKey();
      const res = await reqSchedule(date);
      if (res.state == 200) {
        // this.getData(res, date);
        console.log(res);
        this.$store.commit("setTableLoad");
      }
    },
    onEvent() {
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
    },

  },
  created() {
      this.showdetail();
    this.onEvent();
    this.getPersonData();
  
  },

};
</script>

<style scoped lang="less">
.main {
  margin-top: 20px;
  overflow: auto;
}
.table-wrap {
  border-right: 2px solid #ccc;
  display: table;
  width: 200%;
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
