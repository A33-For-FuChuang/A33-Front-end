<template>
  <div>
    <div class="formTime">{{formTime.monday}}--{{formTime.sunday}}</div>
    <div>
      <div style="display:flex">
        <el-input placeholder="请输入邮箱查询员工排班" style="width:250px;margin-right:20px" v-model="email" clearable
        ><i slot="prefix" class="el-input__icon el-icon-search"></i
      ></el-input>
      <el-button type="primary" @click="getData">搜索</el-button>
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
                <div v-if="dd.length>0">
                  <el-tag type="success">已排班</el-tag>
                </div>
                <el-button v-else type="warning" @click="manage(x, y)">安排</el-button>
              </div>
              <div v-else-if="title == '删除排班'">
                <el-button v-if="dd.length>0" type="danger" @click="manage(x, y)">移除</el-button>
                <div v-else>
                  <el-tag type="success">未排班</el-tag>
                </div>
              </div>
              <div v-else-if="title=='搜索排班'">
                <div>{{dd[0]?.name}}</div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWeek,
  transformTime,
  removeDuplicate,
  Toast,
  getMondayAndSunday,
  getMondayOfWeek
} from "../composables/utils";
import { getDateKey } from "@/composables/auth";
import {
  reqManageWork,
  reqDelWork,
  reqIdWork,
  reqSearchWork,
} from "@/api/location";
export default {
  props: {
    dates: {
      type: Array,
    },
    title: {},
    formTime:{},
  },
  data() {
    return {
      weekWork: [],
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      time: [
        "09:00-11:00",
        "11:00-13:00",
        "13:00-15:00",
        "15:00-17:00",
        "17:00-19:00",
        "19:00-21:00",
      ],
      tableData: [],
      value: "",
      dateStr: "",
      email: "",
    };
  },
  computed: {
    isTableLoad() {
      return this.$store.state.common.isTableLoad;
    },
    workWeek() {
      return getDateKey()
    }
  },
  methods: {
    manage(x, y) {
      let dateStr = "";
      dateStr += getDateKey().substring(0, 4);
      dateStr += "-";
      dateStr += this.dates[x];
      dateStr += "_";
      dateStr += 4 * y + 3 < 10 ? "0" + (4 * y + 3) : 4 * y + 3;
      this.dateStr = dateStr;
      if (this.title == "安排排班") {
        this.manageWork();
      } else if (this.title == "删除排班") {
        this.deleteWork();
      }
    },
    
    async getData() {
      const date = getMondayOfWeek(getDateKey());
      const res = await reqSearchWork(date, this.email);
      if (res.state == 200) {
        this.weekWork = res.data;
      }
    },
    async manageWork() {
      const res=await reqManageWork(this.email,this.dateStr)
      if(res.state==200) {
        this.getData()
        Toast("安排成功")
      }
    },
    async deleteWork() {
      const res=await reqDelWork(this.email,this.dateStr)
      if(res.state==200) {
        this.getData()
        Toast("删除成功")
      }
    },
  },
  created() {
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
.formTime {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
