<template>
  <div style="margin-left: auto">
    <el-button type="primary" size="medium" @click="getSchedule"
      >智能排班</el-button
    >
    <el-button type="danger" size="medium ">删除</el-button>
    <el-button type="warning" size="medium ">编辑</el-button>
  </div>
</template>

<script>
import { reqSchedule } from "@/api/scheduling";
import { getDateKey } from "../composables/auth";
import { Toast } from "../composables/utils";
export default {
  data() {
    return {};
  },
  methods: {
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
  },
};
</script>

<style scoped></style>
