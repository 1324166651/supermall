<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div class="left-tab">
        <i class="icon iconfont">&#xe696;</i>
        <span>客服</span>
      </div>
      <div class="left-tab">
        <i class="icon iconfont">&#xe7a4;</i>
        <span>店铺</span>
      </div>
      <div class="left-tab" @click="cfav">
        <i class="icon iconfont">&#xe60f;</i>
        <span>收藏</span>
      </div>
    </div>
    <div class="right">
      <div>
        <span class="btn1" @click="addShopCar">加入购物车</span>
      </div>
      <div>
        <span class="btn2" @click="buyNow">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addShopCar() {
      this.$emit('addShopCar')
    },
    buyNow() {
      this.$emit('buyNow')
    },
    cfav() {
      console.log('收藏')
    },
  },
}
</script>

<style scoped>
/* 引入css样式 */
/* 引入字体样式 */
@import url('~assets/css/iconfont.css');
.detail-bottom-bar {
  height: 49px;
  line-height: 49px;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 102;
  font-size: 12px;
  text-align: center;
  border-top: 1px solid #999;
}
.left {
  display: flex;
  width: 40%;
}
.left > div {
  flex: 1;
}
div > i {
  display: block;
  font-size: 20px;
  height: 18px;
  margin-top: -5px;
}
.right {
  width: 60%;
  display: flex;
}
.right > div {
  flex: 1;
  position: relative;
}
.btn1,
.btn2 {
  position: absolute;
  top: 4px;
  left: 0px;
  width: 100%;
  height: 40px;
  background-color: pink;
  line-height: 40px;
  color: #ffffff;
}
.btn1 {
  border-radius: 20px 0 0 20px; /*其值为高度的一半*/
  background: linear-gradient(90deg, #ffd01e, #ff8917);
}
.btn2 {
  border-radius: 0 20px 20px 0;
  background: linear-gradient(90deg, #ff6034, #ee0a24);
}
</style>