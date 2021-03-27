<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      message: '哈哈哈',
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
    }

    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
    //设置初始刷新的高度，后面会根据图片加载一直刷新
    this.scroll.scrollerHeight = 1000000
  },
  methods: {
    // 封装，回到顶部的方法
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 封装，能一直加载刷新
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    // 封装，刷新滚动高度
    refresh() {
      console.log('--')
      this.scroll && this.scroll.refresh()
    },
    getSaveY() {
      return this.scroll ? this.scroll.y : 0
    },
  },
}
</script>

<style scoped>
</style>
