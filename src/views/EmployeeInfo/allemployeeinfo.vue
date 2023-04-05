<template>
  <div>
    <h2>员工信息</h2>
    <el-table :data="form" v-if="form.length > 0">
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.hobbyType1 }}:</p>
            <p>{{ scope.row.hobbyType2 }}:</p>
            <p>{{ scope.row.hobbyType3 }}:</p>

            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="phone" label="电话">
        <template slot-scope="{ row }">
          <!-- 这里逻辑有问题 -->
          <!-- {{ isPositionVisibleForUser(row) ? row.phone : "无权限查看" }} -->

          {{ true ? row.phone : "无权限查看" }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="shopName" label="店名"></el-table-column>

      <el-table-column prop="groupName" label="组名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editRule(scope.row)"
            >编辑</el-button
          >
       
        </template>
      </el-table-column>
    </el-table>
    <div v-else>暂无数据</div>
  </div>
</template>


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
    async fetchData() {
      
      const res = await allemployee();
      const res2 = await employeeinfo();
      const people = res.data;
    this.form=res.data;
      console.log("这是成员信息界面");
      console.log(res);

      // if (res2.data.position === "店长") {
      //   this.form = people;
      // } else if (res2.data.position === "组长") {
      //   this.form = people.filter((item) => item.position === "小组长");
      // } else {
      //   this.form = people.filter((item) => item.name);
      // }
    },
  },
};
</script>
