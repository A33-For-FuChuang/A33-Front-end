<template>
  <div class="employee-list">
    <el-table :data="form" style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话" class="box2">
        <template slot-scope="scope">
          <el-input v-model="scope.row.phone"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="position" label="职位">
        <template slot-scope="scope">
          <el-select v-model="scope.row.position" placeholder="请选择职位">
            <el-option label="店长" value="sales"></el-option>
            <el-option label="组长" value="support"></el-option>
            <el-option label="店员" value="designer"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="groupName" label="组名"></el-table-column>
      <el-table-column prop="shopName" label="店名"></el-table-column>
       <el-table-column  label="偏好"><el-button type="primary">点击展示</el-button></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allemployee } from "../../api/employeeinfo";

export default {
  data() {
    return {
      form: []
        

    }
  },
   created() {
    this.apersonalinfo();
  },
  methods: {
    async apersonalinfo() {
      const res = await allemployee();
      this.form = res.data;
      console.log("全体员工信息页面");
      console.log(res.data);
    },
}
}
</script>
<style >
.el-table .cell{
    
    width: 138px;
    padding-left: -10px;
   
}

</style>
