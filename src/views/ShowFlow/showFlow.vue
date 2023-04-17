<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="showAddDialog">添加</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 查看详情按钮 -->
          <el-button type="text" @click="showEditDialog(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加记录弹框 -->
    <el-dialog
      :title="addDialogTitle"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <el-form :model="addFormData" ref="addForm">
            <el-form-item label="id" prop="id">
         <el-input v-model="addFormData.id"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
         <el-input v-model="addFormData.time"></el-input>
        </el-form-item>
          <el-form-item label="人流量" prop="num">
         <el-input v-model="addFormData.num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
          
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRecord">保存</el-button>
      </div>
    </el-dialog>
    <!-- 修改记录弹框 -->
   <el-dialog
  :title="editDialogTitle"
  :visible.sync="editDialogVisible"
  width="60%"
>
  <el-table
    :data="editTableData"
    style="width: 100%"
    @row-click="currentIndex = arguments[1]"
  >
    <el-table-column prop="localTime" label="时间" editable></el-table-column>
    <el-table-column prop="permitFlow" label="人流量" editable></el-table-column>
  </el-table>
  <div slot="footer">
      
    <el-button @click="editDialogVisible = false">取消</el-button>
    <el-button type="primary" @click="editRecord">保存</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import {
  reqInsert,
  reqShowAll,
  reqShowList,
  reqUpdateFlow,
} from "../../api/flow";
import { Toast, resetObj } from "../../composables/utils";

export default {
  data() {
    return {
      tableData: [],
      addDialogTitle: "添加记录",
      addDialogVisible: false,
      addFormData: {
        id: "",
        time: "",
        num: "",
      },
      editDialogTitle: "详情展示",
      editDialogVisible: false,
      editTableData: [],
       currentIndex: -1
    };
  },
  created() {
    this.show();
  },
  methods: {
    async show() {
      const res = await reqShowAll();
      console.log("这是数组", res);

      this.tableData = res.data.map((date) => ({ time: date }));
    },
    // 显示添加记录弹框
    showAddDialog() {
      this.addDialogVisible = true;
    },
    // 添加记录
    async addRecord() {
      this.tableData.push(this.addFormData);
      const res2 = await reqInsert(this.addFormData);
      console.log("这是添加", res2);
      Toast("添加成功！")
      this.addDialogVisible = false;
      this.addFormData = {
        time: "",
      };
    },
    // 显示修改记录弹框
 
   async showEditDialog(row) {
   console.log("这是查看详情的",row.time);
    const res4 = await reqShowList(row.time);
    console.log("请求查看详情成功",res4);
      this.currentIndex = 0;

    this.editTableData = res4.data;

      this.editDialogVisible = true;
   
    },
    // 修改记录
  async  editRecord() {
      console.log("这是修改",this.editTableData[0]);
     const res3=await reqUpdateFlow(this.editTableData[0])
     if(res3.state==200)
     {
         Toast("保存成功")
     }

      this.editDialogVisible = false;
      
    },
  },
};
</script>
