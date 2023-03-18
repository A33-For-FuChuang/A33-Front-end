<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是《智能排班系统》</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form
        ref="formLoginRef"
        :model="formLogin"
        :rules="loginRules"
        style="width: 250px"
      >
        <el-form-item prop="emailLogin"
          ><el-input
            v-model="formLogin.emailLogin"
            placeholder="请输入员工邮箱"
          >
          </el-input
        ></el-form-item>
        <el-form-item
          ><el-button
            round
            color="#626aef"
            style="width: 250px"
            type="primary"
            @click="login"
            :loading="loading"
            >登 录</el-button
          ></el-form-item
        >
        <el-form-item
          ><el-button
            round
            color="#626aef"
            style="width: 250px"
            type="primary"
            @click="dialogHandle"
            :loading="loading"
            >注 册</el-button
          ></el-form-item
        >
      </el-form>
    </el-col>
    <el-dialog title="注册" :visible.sync="dialogVisible" width="25%">
      <div>
        <el-form
          ref="formRef"
          :rules="rules"
          :model="form"
          style="width: 250px"
        >
          <el-form-item prop="email"
            ><el-input v-model="form.email" placeholder="请输入员工邮箱">
            </el-input
          ></el-form-item>
          <el-form-item prop="name"
            ><el-input v-model="form.name" placeholder="请输入员工姓名">
            </el-input
          ></el-form-item>
          <el-form-item prop="position"
            ><el-input v-model="form.position" placeholder="请输入员工职位">
            </el-input
          ></el-form-item>
          <el-form-item prop="shopID"
            ><el-input
              v-model="form.shopID"
              placeholder="请输入员工所属商店的ID号"
            >
            </el-input
          ></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="regist()">注 册</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import {  Toast, resetObj } from "../composables/utils";
import { reqRegister, reqLogin } from "../api/employee";
import { setToken } from "../composables/auth";
export default {
  data() {
    return {
      loading: false,
      dialogVisible: false,

      form: {
        email: "",
        name: "",
        position: "",
        shopID: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "员工姓名不能为空",
            trigger: "blur",
          },
        ],
        position: [
          {
            required: true,
            message: "员工职位不能为空",
            trigger: "blur",
          },
        ],
        shopID: [
          {
            required: true,
            message: "员工所属商店的ID号不能为空",
            trigger: "blur",
          },
        ],
      },
      formLogin: {
        emailLogin: "2298908190@qq.com",
      },
      loginRules: {
        emailLogin: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs["formLoginRef"].validate(async (valid) => {
        if (!valid) {
          Toast("请按照规则填写", "error");
          return;
        }
        this.loading = true;
        const res = await reqLogin(this.formLogin.emailLogin);
        if (res.state == 200) {
          this.$store.commit("setToken", res.data.token);
          this.$store.dispatch("getInfo");
          Toast("登录成功");
          this.$router.push("/");
          
        } else  {
          Toast(res.message, "error");
        }
        this.loading = false;
      });
    },
    regist() {
      this.$refs["formRef"].validate(async (valid) => {
        if (!valid) {
          Toast("请按照规则填写", "error");
          return;
        }
        this.loading = true;
        const res = await reqRegister(this.form);
        if (res.state == 200) {
          Toast("注册成功");
          resetObj(this.form);
          this.dialogVisible = false;
        } else if (res.state == 500) {
          Toast(res.message, "error");
        }
        this.loading = false;
      });
    },
    dialogHandle() {
      resetObj(this.form);
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-content: center;
  min-height: 100vh;
  background-color: rgb(99, 102, 241);
}
.left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.left > div > div:first-child {
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 48px;
  color: rgb(253, 253, 253);
}
.left > div > div:last-child {
  color: rgba(229, 231, 235, 1);
  font-size: 14px;
  line-height: 20px;
}
.right {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(253, 253, 253);
  flex-direction: column;
}
.right > div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #d1d5db;
  --tw-space-x-reverse: 0;
  margin-right: calc(8px * var(--tw-space-x-reverse));
  margin-left: calc(8px * calc(1 - var(--tw-space-x-reverse)));
}
.title {
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: rgba(31, 41, 55, 1);
}
.line {
  height: 1px;
  width: 64px;
  margin: 0 15px;
  --tw-bg-opacity: 1;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
}
.mb-10 {
  margin-bottom: 10px;
}
</style>
