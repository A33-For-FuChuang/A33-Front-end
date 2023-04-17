<template>
  <div>
    <el-table :data="templates" style="width: 100%">
      <el-table-column prop="name" label="模板名"></el-table-column>
      <el-table-column label="点赞">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.evaluate ? '取消点赞' : '点赞'"
            placement="top"
          >
            <i
              class="el-icon-star-off"
              @click="toggleLike(scope.row)"
              v-if="!scope.row.evaluate"
            ></i>
            <i
              class="el-icon-star-on"
              @click="toggleLike(scope.row)"
              v-if="scope.row.evaluate"
            ></i>
          </el-tooltip>
          {{ scope.row.evaluateNumer }}
        </template>
      </el-table-column>
      <el-table-column label="查看详情">
        <template slot-scope="scope">
          <el-button type="text" @click="viewMore(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="showUse">
        <template slot-scope="scope">
          <el-button type="text" @click="useTemplate(scope.row)"
            >启用模板</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :close-on-click-modal="false"
      title="启用模板"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      class="dia"
    >
      <el-form :model="form" :inline="true">
        <el-form-item label="排班日期">
          <el-input v-model="form.dayTime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqUpdateFlow } from '../../api/flow';
import {
  reqStartTemplate,
  reqShowEvaluate,
  requseTemplate,
} from "../../api/template";
import { Toast, resetObj } from "../../composables/utils";

export default {
  data() {
    return {
      templates: [],
      form: {
        dayTime: "",
        name: "",
      },
      dialogFormVisible: false,
      showUse: false,
    };
  },
  created() {
    this.start();
  },
  methods: {
    async start() {
      const res = await reqStartTemplate("2023-04-13");

      console.log("这是模板列表", res.data);
      const l = Object.keys(res.data).length;
      console.log(l);
      for (let i = 0; i < l; i++) {
        this.templates.push(res.data[i]);
      }
      const position = this.$store.state.user.userInfo.position;
      console.log("这是模板的职位", position);
      if (position === "店长") {
        this.showUse = true;
      } else {
        this.showUse = false;
      }
      console.log("这是第一个", res.data[0]);
      console.log(this.templates);
    },

    viewMore(template) {
      // 点击查看更多后跳转到另一个页面，可使用路由实现
      // console.log("查看更多：", template.name);
      this.$router.push({
        path: "/template/show",
        query: {
          //query是个配置项
          name: template.name,
        },
      });
    },
    async toggleLike(template) {
      console.log("这是template", template);
      template.evaluate = !template.evaluate;
      const res2 = await reqShowEvaluate(template.name);
      console.log("这是点赞数", res2);
      if (template.evaluate) {
        template.evaluateNumer = res2.data;
      } else {
        template.evaluateNumer = res2.data;
      }
    },
    async useTemplate(template) {
      console.log("这是启用template", template);
      this.form.name = template.name;
      this.dialogFormVisible=true

  
    },
    async confirmEdit() {
      console.log("这也是", this.form);
      if (this.form.dayTime === "") {
        this.$message.error("输入不能为空!");
        return;
      }
      const info = this.$notify.info({
        title: "模板启用中",
        message: "该过程过久，请耐心等待",
        showClose: false,
        duration: 0,
      });

      const res3 = await requseTemplate(this.form);
      if (res3.state == 200) {
        info.close();
        Toast("启用模板成功");
      }

      this.dialogFormVisible = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
/* 心型点赞图标样式 */
.like-icon:before {
  content: "❤️";
  font-size: 24px;
  transform: scale(1, 0.8) rotate(0);
  display: block;
}
.el-button {
  padding: 10px;
}
.el-dialog {
  width: 300px;
  height: 280px;
}
</style>
