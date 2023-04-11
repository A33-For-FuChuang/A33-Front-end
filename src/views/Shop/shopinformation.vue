<template>
  <div>
    <h1>商铺信息展示页面</h1>
    <el-table :data="shops" style="width: 100%">
      <el-table-column prop="name" label="商铺名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="size" label="商铺面积"></el-table-column>
    </el-table>
    <br />
    <el-button type="primary" @click="dialogFormVisible = true"
      >添加商铺</el-button
    >
    <el-dialog title="添加商铺" :visible.sync="dialogFormVisible">
      <el-form
        :model="newShop"
        :rules="rules"
        ref="newShopForm"
        label-width="100px"
      >
        <el-form-item label="商铺名" prop="name">
          <el-input v-model="newShop.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="newShop.address"></el-input>
        </el-form-item>
        <el-form-item label="商铺面积" prop="size">
          <el-input v-model="newShop.size"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqAllShop, reqAddShop } from "../../api/root";
import { reqThreeMonthes, reqTest } from "@/api/location";
export default {

  data() {
    return {
      shops: [],
      dialogFormVisible: false,
      newShop: {
        name: "",
        address: "",
        size: "",
      },
      rules: {
        name: [{ required: true, message: "商铺名不能为空", trigger: "blur" }],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        size: [
          { required: true, message: "商铺面积不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.showstore();
  },
  methods: {
    async showstore() {
      const res = await reqAllShop();
      console.log("这是商铺信息");
      console.log(res);
      this.shops = res.data;
    },
    async addShop() {
      console.log("这是添加商铺的信息1");
      this.shops.push(this.newShop);
      const res2 = await reqAddShop(this.newShop);
      console.log("这是添加商铺成功信息");
      console.log(res2);
      this.dialogFormVisible = false;
      this.$message({
        message: "添加成功",
        type: "success",
      });
      this.newShop = {
        name: "",
        address: "",
        size: "",
      };
    },
  },
};
</script>
