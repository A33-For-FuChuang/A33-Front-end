<template>
  <div class="main">
    <div>{{ nowDay }}</div>
    <div class="time" v-for="(item, index) in table" :key="index">
      <span>{{ time[index] }}</span>
      <span
        class="work"
        v-for="(work, k) in item"
        :key="item[k].locationID + index + k"
        >{{ work.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { getNowFormatDate } from '../composables/utils';
export default {
  props: {
    table: {},
  },
  data() {
    return {
      time: [
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
      ],
      nowDay: getNowFormatDate(),
    };
  },
  methods: {},
  created() {
  },
};
</script>

<style scoped>
.main {
  font-size: 16px;
}
.time {
  margin: 10px 0;
}
.work {
  margin: 0px 5px;
}
</style>
