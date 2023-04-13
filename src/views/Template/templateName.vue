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
    </el-table>
  </div>
</template>

<script>
import { reqStartTemplate, reqShowEvaluate } from "../../api/template";

export default {
  data() {
    return {
      templates: [],
    };
  },
  created() {
    this.start();
  },
  methods: {
    async start() {
      const res = await reqStartTemplate("2023-04-13");

      console.log("这是启动模板", res.data);
      const l = Object.keys(res.data).length;
      console.log(l);
      for (let i = 0; i < l; i++) {
        this.templates.push(res.data[i]);
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
</style>
