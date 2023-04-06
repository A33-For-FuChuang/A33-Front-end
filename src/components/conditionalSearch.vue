<template>
  <div>
    <el-select
      size="small"
      @change="handleChange"
      clearable
      v-model="groupId"
      placeholder="按小组查看"
      :disabled="radio == 1"
    >
      <el-option
        v-for="item in groupAll"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-select
      style="margin-left: 20px"
      size="small"
      @change="handleChangePosition"
      clearable
      v-model="position"
      placeholder="按职位查看"
      :disabled="radio == 1"
    >
      <el-option
        v-for="item in positionAll"
        :key="item.position"
        :label="item.position"
        :value="item.position"
      >
      </el-option>
    </el-select>
    <el-radio-group @change="handleChangeAll(radio)" v-model="radio">
      <el-radio style="margin-left: 20px" label="0">查看全部</el-radio>
      <el-radio :disabled="isDisabled" label="1">查看个人</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import { reqGetAllGroup, reqGetPositions } from "@/api/location";
export default {
  data() {
    return {
      groupId: "",
      groupAll: [
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
      position: "",
      positionAll: [],
      radio: "0",
    };
  },
  methods: {
    async getAllGroup() {
      const res = await reqGetAllGroup();
      if (res.state == 200) {
        this.groupAll = res.data;
      }
    },
    async getAllPosion() {
      const res = await reqGetPositions();
      if (res.state == 200) {
        this.positionAll = res.data;
      }
    },
    handleChangeAll(value) {
      if (value == 0) {
        this.$store.commit("setIsPublicTrue");
        this.$bus.$emit("weekWork");
      } else {
        this.$store.commit("setIsPublicFalse");
        this.$bus.$emit("weekWork");
      }
    },
    handleChange(val) {
      this.position = "";
      this.$bus.$emit("groupWork", val);
    },
    handleChangePosition(val) {
      this.groupId = "";
      this.$bus.$emit("positionWork", val);
    },
  },
  computed: {
    isDisabled() {
      return (this.groupId != "" || this.position != "") == true ? true : false;
    },
  },
  mounted() {
    this.getAllGroup();
    this.getAllPosion();
  },
};
</script>

<style scoped></style>
