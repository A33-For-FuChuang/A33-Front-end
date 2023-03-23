<template>
  <div class="main">
    <div class="control left" @click="controlClickHandle(true)">
      <i class="el-icon-back"></i>
    </div>
    <div class="control right" @click="controlClickHandle(false)">
      <i class="el-icon-right"></i>
    </div>
    <div class="scroll">
      <div class="scroll-content" ref="scrollContentRef">
        <div
          ref="items"
          class="item"
          v-for="(item, index) in times"
          :key="index"
        >
          <div class="li" @click="onClickHandle(index,item)">
            <div>周一 ~ 周日</div>
            <div>{{ item.week }} - {{ item.weekEnd }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reqGetWeekWork} from "@/api/location"
import {setDateKey} from "@/composables/auth"
export default {
  props: ["times"],
  data() {
    return {
      posIndex: 12,
      Times: [],
      work:[]
    };
  },
  methods: {
    controlClickHandle(direction) {
      if (direction) {
        this.posIndex--;
      } else if (!direction) {
        this.posIndex++;
      }
      this.transform();
      if (this.posIndex < 0) {
        this.posIndex++;
        return;
      }
      if (this.posIndex > this.times.length - 3) {
        this.posIndex--;
        return;
      }
    },
    transform() {
      const scrollContentRef = this.$refs.scrollContentRef;
      const scrollWidth = scrollContentRef.scrollWidth; // 一共可以滚动的宽度
      const clientWidth = scrollContentRef.clientWidth; // 本身占据的宽度
      const totalDistance = scrollWidth - clientWidth;
      scrollContentRef.style.transform = `translate(-${280 * this.posIndex}px)`;
    },
    onClickHandle(index,item) {
      this.$refs.items.forEach((element) => {
        element.style.borderBottomWidth = "0px";
        element.style.borderBottomColor = "rgb(255,255,255)";
      });
      const li = this.$refs.items[index].style;
      li.borderBottomWidth = "2px";
      li.borderBottomColor = "rgb(64,158,255)";
      this.getData(item.week)
    },
    async getData(date=new Date()) {
      setDateKey(date)
      const res=await reqGetWeekWork(date)
      if(res.state==200) {
        this.$bus.$emit("weekWork",res.data)
      }
    },
  },
  mounted() {
    this.getData();
    this.transform();
    setTimeout(() => {
      const li = this.$refs.items[this.posIndex+1].style;
      li.borderBottomWidth = "2px";
      li.borderBottomColor = "rgb(64,158,255)";
    }, 500);
  },
  computed: {},
};
</script>

<style scoped lang="less">
.main {
  width: 800px;
  position: relative;
  padding: 8px 0;

  .scroll {
    overflow: hidden;

    .scroll-content {
      display: flex;
      transition: transform 250ms ease;
    }
  }

  .control {
    position: absolute;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    text-align: center;
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    background: #fff;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.14);
    cursor: pointer;

    &.left {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &.right {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
    }
  }
  .item {
    box-sizing: border-box;
    flex-basis: 150px;
    flex-shrink: 0;
    padding: 14px 16px;
    margin: 0 20px;
    border-radius: 3px;
    font-size: 17px;
    text-align: center;
    border: 0px solid #d8d8d8;
    white-space: nowrap;
    cursor: pointer;

    &:last-child {
      margin-right: 20px;
    }

    &.active {
      color: #fff;
    }
  }
}
</style>
