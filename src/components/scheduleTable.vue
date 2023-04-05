<template>
  <div class="main" v-loading="loading">
    <div class="table-wrap">
      <div class="head-style">
        <dl class="table-tr">
          <dd v-for="(item, index) in dates" :key="item">
            <span>{{ item }}</span>
            <div>{{ week[index] }}</div>
          </dd>
        </dl>
      </div>
      <div class="head-style">
        <dl class="table-tr" v-for="(item, index) in weekWork" :key="index">
          <dd v-for="dd in item" :key="dd.locationID">
            <span>{{ dd[0]?.name }}</span>
            <div>{{ dd[0]?.position }}</div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWeek,
  transformTime,
  formatDate,
} from "../composables/utils";
import { getDateKey } from "@/composables/auth";
import { reqGetWeekWork,reqGetWeekLocations } from "@/api/location";
export default {
  data() {
    return {
      weekWork: [],
      dates: [],
      week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      today: "",
      loading: false,
    };
  },
  methods: {
    async getAllData() {
      this.loading = true;
      const date = getDateKey();
      const res = await reqGetWeekWork(date);
      if (res.state == 200) {
        this.weekWork = res.data;
        const formattedDate = transformTime(date);
        this.dates = getWeek(formattedDate);
        this.loading = false;
      }
    },
    async getPersonData() {
      this.loading = true;
      const date = getDateKey();
      const res = await reqGetWeekLocations(date);
      if (res.state == 200) {
        this.weekWork = res.data;
        const formattedDate = transformTime(date);
        this.dates = getWeek(formattedDate);
        this.loading = false;
      }
    },
  },
  mounted() {
    transformTime();
    this.$bus.$on("weekWork", () => {
      if(this.$store.state.common.isPublic) {
        this.getAllData()
      } else {
        this.getPersonData()
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
