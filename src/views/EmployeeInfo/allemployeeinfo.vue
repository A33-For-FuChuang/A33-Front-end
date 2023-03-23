<template>
  <div>
    <h2>员工信息</h2>
    <el-table :data="form" v-if="form.length > 0">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="phone" label="电话" :visible="isPositionVisible">
        <template slot-scope="{ row }">
          <!-- 这里逻辑有问题 -->
          <!-- {{ isPositionVisibleForUser(row) ? row.phone : "无权限查看" }} -->

          {{ true ? row.phone : "无权限查看" }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="shopName" label="店名"></el-table-column>

      <el-table-column prop="groupName" label="组名"></el-table-column>
    </el-table>
    <div v-else>暂无数据</div>
  </div>
</template>

<<<<<<< HEAD
<script>
import { employeeinfo, employeechange, allemployee } from "../../api/employee";

export default {
  data() {
    return {
      form: [],
      currentUser: { position: "导购", group: "A" },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async isPositionVisibleForUser(row) {
      const res2 = await employeeinfo();

      if (this.currentUser.position === "店长") {
        return true;
      } else if (this.currentUser.position === "组长") {
        return row.group === this.currentUser.group;
      } else {
        return false;
      }
    },
    async fetchData() {
      const res = await allemployee();
      const res2 = await employeeinfo();
      const people = res.data;
      console.log("这是个人信息界面");

      if (res2.data.position === "店长") {
        this.form = people;
      } else if (res2.data.position === "组长") {
        this.form = people.filter((item) => item.position === "小组长");
      } else {
        this.form = people.filter((item) => item.name);
      }
    },
  },
};
</script>
