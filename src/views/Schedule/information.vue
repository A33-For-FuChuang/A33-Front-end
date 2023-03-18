<template>
  <div class="main">
    <div class="select">
      <el-select v-model="value" placeholder="某门店排班表">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="time">
      <div class="left">
        <div style="color: rgb(134, 134, 134)">{{ nowTime }}</div>
        <div class="isWeek">
          <el-switch
            v-model="isWeek"
            active-text="按周查看"
            inactive-text="按日查看"
          >
          </el-switch>
        </div>
      </div>
      <div class="right">
        <scrollTime :times="times"></scrollTime>
      </div>
    </div>
    <div class="time" >
      <div>
        <el-select size="small" v-model="value" placeholder="按岗位分组">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      </div>
      <div style="margin-left:auto">
        <el-button type="danger" size="medium ">删除</el-button>
        <el-button type="warning" size="medium ">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import scrollTime from "../../components/scrollTime.vue";
export default {
  components: {
    scrollTime,
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      date: new Date(),
      value: "",
      isWeek: true,
      times: ["abc", "cba", "aaa", "wda"],
    };
  },
  methods: {},
  mounted() {},
  computed: {
    nowTime() {
      return this.date.getFullYear() + "年" + (this.date.getMonth() + 1) + "月";
    },
  },
};
</script>

<style scoped>
.select {
  text-align: center;
}
.time {
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.left {
  /* width: 100px; */
}
.isWeek {
  border: 1px solid black;
  padding: 5px 10px;
  color: rgb(134, 134, 134);
  margin-top: 3px;
}
.right {
  margin-left: auto;
}
</style>
