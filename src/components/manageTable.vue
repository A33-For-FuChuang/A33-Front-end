<template>
  <div>
    <div class="formTime">{{ formTime.monday }}--{{ formTime.sunday }}</div>
    <div>
      <div v-if="title == '查看备份'" style="display: flex">
        <el-select v-model="copyId" placeholder="请选择备份序列号">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="getData('copy')">搜索</el-button>
      </div>
      <div v-else style="display: flex">
        <el-input
          placeholder="请输入邮箱查询员工排班"
          style="width: 250px; margin-right: 20px"
          v-model="email"
          clearable
          ><i slot="prefix" class="el-input__icon el-icon-search"></i
        ></el-input>
        <el-button type="primary" @click="getData('search')">搜索</el-button>
      </div>
    </div>
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
          <dl class="table-tr" v-for="(item, x) in weekWork" :key="x">
            <div>
              <dd>{{ dates[x] }}</dd>
              <dd>{{ week[x] }}</dd>
            </div>

            <dd v-for="(dd, y) in item" :key="dd.locationID">
              <div v-if="title == '安排排班'">
                <div v-if="dd.length > 0">
                  <el-tag type="success">已排班</el-tag>
                </div>
                <el-button v-else type="warning" @click="manage(x, y + 1)"
                  >安排</el-button
                >
              </div>
              <div v-else-if="title == '删除排班'">
                <el-button
                  v-if="dd.length > 0"
                  type="danger"
                  @click="manage(x, y + 1)"
                  >移除</el-button
                >
                <div v-else>
                  <el-tag type="success">未排班</el-tag>
                </div>
              </div>
              <div v-else-if="title == '查看备份'">
                <el-button
                  v-if="dd.length > 1"
                  type="primary"
                  @click="getAll(dd, y, x)"
                  >查看所有</el-button
                >
                <div v-else>
                  <span>{{ dd[0]?.name }}</span>
                  <div>{{ dd[0]?.position }}</div>
                </div>
              </div>
              <div v-else-if="title == '搜索排班'">
                <span>{{ dd[0]?.name }}</span>
                <div>{{ dd[0]?.position }}</div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <el-dialog append-to-body :destroy-on-close="true" :close-on-click-modal="false"  :visible.sync="dialogVisible" width="25%">
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
  Toast,
  getMondayAndSunday,
  getMondayOfWeek,
} from "../composables/utils";
import { getDateKey } from "@/composables/auth";
import {
  reqManageWork,
  reqDelWork,
  reqSearchWork,
  reqShowCopy,
  reqShowCopyList,
} from "@/api/location";
export default {
  props: {
    dates: {
      type: Array,
    },
    title: {},
    formTime: {},
  },
  data() {
    return {
      weekWork: [],
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
      tableData: [],
      value: "",
      dateStr: "",
      email: "",
      copyId: "",
      options: [],
      value: "",
      clickDate: "",
      dialogVisible:false,
      dates:[]
    };
  },
  computed: {
    isTableLoad() {
      return this.$store.state.common.isTableLoad;
    },
    workWeek() {
      return getDateKey();
    },
  },
  methods: {
    getAll(data, index,j) {
      // const date = getDateKey()
      // const formattedDate = transformTime(date);
      // this.dates = getWeek(formattedDate);
      // this.clickDate =
      //   this.dates[index] + "-" + this.week[index] + "-" + this.time[j];
      this.tableData = data;
      this.dialogVisible = true;
    },
    manage(x, y) {
      let dateStr = "";
      dateStr += getDateKey().substring(0, 4);
      dateStr += "-";
      dateStr += this.dates[x];
      dateStr += "_";
      dateStr += y < 10 ? "0" + y : y;
      this.dateStr = dateStr;
      if (this.title == "安排排班") {
        this.manageWork();
      } else if (this.title == "删除排班") {
        this.deleteWork();
      }
    },

    async getData(val) {
      const date = getMondayOfWeek(getDateKey());
      let res = await reqSearchWork(date, this.email);
      if (val == "copy") {
        res = await this.getCopyWork(date);
      } else if (val == "search") {
        res = await this.getSearchWork(date);
      }
      if (res.state == 200) {
        this.weekWork = res.data;
      }
    },
    getSearchWork(date) {
      return reqSearchWork(date, this.email);
    },
    async getCopyWork(date) {
      return reqShowCopy(date, this.copyId);
    },
    async manageWork() {
      const res = await reqManageWork(this.email, this.dateStr);
      if (res.state == 200) {
        this.getData();
        Toast("安排成功");
      }
    },
    async deleteWork() {
      const res = await reqDelWork(this.email, this.dateStr);
      if (res.state == 200) {
        this.getData();
        Toast("删除成功");
      }
    },
    async getCopyList() {
      const date = getDateKey();
      const res = await reqShowCopyList(date);
      if (res.state == 200) {
        this.options = res.data;
      }
    },
  },
  created() {
    this.getCopyList();
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
.formTime {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
