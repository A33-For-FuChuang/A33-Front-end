<template>
  <div>
    <h2>员工信息</h2>
    <el-table :data="table" v-if="table.length > 0">
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

    <el-dialog :close-on-click-modal="false" title="员工信息" :visible.sync="dialogFormVisible"  :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组名" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店名" :label-width="formLabelWidth">
          <el-input v-model="form.shopName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirmEdit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {  reqChangeinfo, allemployee } from "../../api/employee";
import { Toast } from '../../composables/utils';

export default {
  data() {
    return {
      table: [],
      form: {},
      currentUser: { position: "导购", group: "A" },
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await allemployee();
      const people = res.data;
      this.table = res.data;
    },
    editRule(data) {
      this.dialogFormVisible = true;
      this.form = data;
    },
    async confirmEdit() {
      console.log(this.form);
      const res=await reqChangeinfo(this.form)
      if(res.state==200) {
        Toast("修改成功")
        this.handleClose()
      }
    },
    handleClose() {
      this.dialogFormVisible = false
      this.form={}
    }
  },
};
</script>
