<template>
  <div>
    <h2>员工信息</h2>
    <el-table :data="table" v-if="table.length > 0">

            <el-table-column prop="name" label="姓名"></el-table-column>

      <el-table-column prop="position" label="职位"></el-table-column>

      <el-table-column
        prop="phone"
        label="电话"
        v-if="showPhone"
      ></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="shopName" label="店名"></el-table-column>

      <el-table-column prop="groupName" label="组名"></el-table-column>
      <el-table-column label="操作" v-if="showOperation">
        <template slot-scope="scope" >
          <el-button type="primary" @click="editRule(scope.row)"  style="width:35px" class="but"
            >编辑</el-button
          >
             <el-button type="primary" @click="searchMore(scope.row)"  style="width:35px" class="but"
            >更多</el-button
          >
            <el-button type="danger" @click="deleteMore(scope.row)"  style="width:35px" class="but"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div v-else>暂无数据</div>

    <el-dialog
      :close-on-click-modal="false"
      title="员工信息"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
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
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      title="更多信息"
      :visible.sync="dialogFormVisible2"
      :before-close="handleClose2"
      class="dia"
    >
      <el-form :model="form2">
        <el-form-item label="工作日偏好" :label-width="formLabelWidth">
          <el-input
            v-model="form2.workday"
            autocomplete="off"
            class="inpt1"
          ></el-input>
        </el-form-item>

        <el-form-item label="工作时间偏好" :label-width="formLabelWidth">
          <el-input
            v-model="form2.workhour"
            autocomplete="off"
            class="inpt1"
          ></el-input>
        </el-form-item>
        <el-form-item label="班次时长偏好/h" :label-width="formLabelWidth">
          <el-input
            v-model="form2.worklast"
            autocomplete="off"
            class="inpt1"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose2">取 消</el-button>
        <el-button type="primary" @click="confirmEdit2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  employeeinfo,
  allemployee,
  reqRmove,
  reqChangeOtherInfo
} from "../../api/employee";
import { Toast } from "../../composables/utils";

export default {
  data() {
    return {
      table: [],
      form: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      employeeposition: "",
      workdayPreferences: [],
      worktimePreferences: [],
      workhourPreferences: [],
      form2: {
        workday: "",
        worklast: "",
        workhour: "",
      },
      showPhone: false,
      showOperation: false,
      numbers: [],
    };
  },
  created() {
    this.personalinfo();
    this.fetchData();
  },
  methods: {
    async personalinfo() {
      const res3 = await employeeinfo();
      this.employeeposition = res3.data.position;
      console.log("这是全体成员的员工职位", this.employeeposition);
      if (this.employeeposition === "店长" || this.employeeposition == "经理") {
        this.showOperation = true;
        this.showPhone = true;
      } else {
        this.showOperation = false;
      }
    },
    async fetchData() {
      const res = await allemployee();
      const people = res.data;
      this.table = res.data;

      console.log("这是people", people);
      this.$store.state.user.userInfo.groupName;
      if (this.$store.state.user.userInfo.position === "店长") {
        this.table = res.data;
        return;
      } else {
        console.log("这是组别", this.$store.state.user.userInfo.groupName);
        //过滤，展示相同的组别
        this.table = res.data.filter((people) => {
          return people.groupName === this.$store.state.user.userInfo.groupName;
        });
      }
    },
    editRule(data) {
      this.dialogFormVisible = true;
      this.form = data;
    },
    searchMore(data) {
      this.dialogFormVisible2 = true;
      this.form = data;
      console.log("这是form", this.form);
      console.log(data.employeeWorkDayDTO);

      if (
        data.employeeLastTimeDTO === null ||
        data.employeeWorkTimeDTO === null ||
        data.employeeLastTimeDTO === null
      ) {
        console.log("*****************************");
        this.workdayPreferences = [];
        this.worktimePreferences = [];
        this.workhourPreferences = [];
        return;
      } else {
        //工作日
        const respone2 = data.employeeWorkDayDTO?.employeeWorkDayList;
        this.workdayPreferences.push(respone2[0]);
        this.workdayPreferences.push(respone2[1]);
        this.form2.workday = this.workdayPreferences.join(",");

        console.log(this.form2.workday);
        //工作时间段
        const respone3 = data.employeeWorkTimeDTO?.employeeWorkTimeList;
        this.worktimePreferences.push(respone3[0]);
        this.worktimePreferences.push(respone3[1]);
        this.form2.workhour = this.worktimePreferences.join(",");
        //班次时长
        const respone1 = data.employeeLastTimeDTO;
        this.workhourPreferences.push(respone1.lastTime);
        this.form2.worklast = respone1.lastTime;
      }
    },
    //删除员工的信息
    deleteRule(row) {
      this.$confirm("是否删除该员工信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const index = this.table.indexOf(row);
          console.log("这是删除的", row.id);
          const res = await reqRmove(row.id);
          if (res.status === 200) {
            this.table.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async confirmEdit() {
      console.log(this.form);
      const res = await reqChangeOtherInfo(this.form);
      console.log("这是修改信息", res);
      if (res.state == 200) {
        Toast("修改成功");
        this.handleClose();
      }
    },
    confirmEdit2() {
      this.dialogFormVisible2 = false;
      (this.workdayPreferences = []),
        (this.worktimePreferences = []),
        (this.form2 = {});
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.form = {};
    },
    handleClose2() {
      this.dialogFormVisible2 = false;
      this.form2 = {};
    },
  },
};
</script>
<style scoped>
.inpt1 {
  width: 300px;
}
.but {
  padding: 5px;
}

</style>
