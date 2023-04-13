<template>
  <div class="main">
    <div class="time">
      <div class="left">
        <div style="color: rgb(134, 134, 134)">{{ nowTime }}</div>
        <div class="isWeek">
          <el-switch
            v-model="isWeek"
            active-text="按周查看"
            inactive-text="按日查看"
          >
          </el-switch>
        </div>
      </div>
      <div class="right" >
        <scrollTime :times="times"></scrollTime>
      </div>
    </div>
    <div class="searchCondition">
      <div><conditionalSearch></conditionalSearch></div>
      <div style="margin-top:20px"><scheduleBtn></scheduleBtn></div>
    </div>
      <scheduleTable v-permission="['/location/week']"></scheduleTable>
  </div>
</template>

<script>
import { reqThreeMonthes,reqTest } from "@/api/location";
import scrollTime from "@/components/scrollTime.vue";
import scheduleTable from "@/components/scheduleTable.vue";
import conditionalSearch from "@/components/conditionalSearch";
import scheduleBtn from '@/components/scheduleBtn'
export default {
  components: {
    scrollTime,
    scheduleTable,
    conditionalSearch,
    scheduleBtn
  },
  data() {
    return {
      date: new Date(),
      value: "",
      isWeek: true,
      times: [],
    };
  },
  methods: {
    async getTimes() {
      const res = await reqThreeMonthes(this.date);
      if (res.state == 200) {
        this.times = res.data;
        for (let i = 0; i < this.times.length; i++) {
          const today = new Date(this.times[i].week);
          const weekEnd = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10);
          this.times[i].weekEnd = weekEnd;
        }
        this.$store.commit("setTimes", this.times);
      }
    },
  },
  mounted() {
    this.getTimes();
  },
  computed: {
    nowTime() {
      return this.date.getFullYear() + "年" + (this.date.getMonth() + 1) + "月";
    },
  },
};
</script>

<style scoped>
.select {
  text-align: center;
}
.time {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.searchCondition {
  margin-top: 20px;
}
.left {
  /* width: 100px; */
}
.isWeek {
  border: 1px solid black;
  padding: 5px 10px;
  color: rgb(134, 134, 134);
  margin-top: 3px;
}
.right {
  margin-left: auto;
}
</style>
