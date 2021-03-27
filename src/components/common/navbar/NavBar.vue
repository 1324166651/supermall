<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {}
  },
}
</script>

<style  scoped>
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
.nav-bar {
  line-height: 44px;
  height: 44px;
  box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.1);
  display: flex;
  text-align: center;
}
</style>