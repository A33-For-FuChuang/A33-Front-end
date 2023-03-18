<template>
  <div class="main">
    <div class="control left" @click="controlClickHandle(true)">左</div>
    <div class="control right" @click="controlClickHandle(false)">右</div>
    <div class="scroll">
      <div class="scroll-content" ref="scrollContentRef">
        <div class="item" v-for="(item, index) in times" :key="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["times"],
  data() {
    return {
      posIndex: 0,
    };
  },
  methods: {
    controlClickHandle(direction) {
      console.log(this.posIndex);
      if (direction) {
        this.posIndex--;
      } else if (!direction) {
        
        this.posIndex++;
      }
      const scrollContentRef = this.$refs.scrollContentRef;
      const scrollWidth = scrollContentRef.scrollWidth; // 一共可以滚动的宽度
      const clientWidth = scrollContentRef.clientWidth; // 本身占据的宽度
      const totalDistance = scrollWidth - clientWidth;
      scrollContentRef.style.transform = `translate(-${
        totalDistance * this.posIndex
      }px)`;
      if(scrollContentRef.style.transform<0) {
        scrollContentRef.style.transform=0
      }
      if(this.posIndex<0) {
        this.posIndex++;
        return
      }
      if (this.posIndex > this.times.length - 3) {
          this.posIndex--;
          return;
      }
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
.main {
  width: 700px;
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
    flex-basis: 160px;
    flex-shrink: 0;
    padding: 14px 16px;
    margin: 0 35px;
    border-radius: 3px;
    font-size: 17px;
    text-align: center;
    border: 0.5px solid #d8d8d8;
    white-space: nowrap;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #fff;
    }
  }
}
</style>
