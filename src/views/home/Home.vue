<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tabcontrol"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isfixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :pull-up-load="true"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemLisenerMixin } from 'common/mixin'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 轮播图数据
      banners: [],
      // 推荐数据
      recommends: [],
      // 商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 类型
      currentType: 'pop',
      // 回到顶部按钮判断
      isShowBackTop: false,
      // tabcontrol到顶部的距离计算
      tabOffSetTop: 0,
      // 判断tabcontrol是否固定
      isfixed: false,
      //记录离开时滚动的位置
      saveY: 0,
      //
      // itemImageListener: null,
    }
  },
  computed: {
    // 显示商品
    showGoods() {
      return this.goods[this.currentType].list
    },
  },
  mixins: [itemLisenerMixin],
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //3.监听item中图片加载完成
    // 说明：$bus是事件总线用$emit发射到事件总线中,$on从事件总线接收并且进行下一个函数方法,
    // 这里出了使用事件总线还可以使用VueX
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // this.itemImageListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
    // 重新刷新加载的高度，为解决卡图片未加载而产生的高度
  },
  //回到当前页面执行
  activated() {
    // 回到上一次记录的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    //刷新一下，不然可能会打滚动
    this.$refs.scroll.refresh()
  },
  //离开当前页面执行
  deactivated() {
    // 1.记录离开时的滚动记录给自定义的变量
    this.saveY = this.$refs.scroll.getSaveY()
    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // 三种类型的index表示
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 是两个tabcontrol同步类型
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },

    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000
      // 2.决定tabControl是否吸顶
      this.isfixed = -position.y > this.tabOffSetTop
    },
    // 判断是哪一个类型的上拉事件，在调用相应的获取数据方法
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    // 接受TabControl组件发射的数据
    swiperImageLoad() {
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        // 获取轮播图数据的方法
        this.banners = res.data.banner.list
        // 获取十点抢卷那一行的数据的方法
        this.recommends = res.data.recommend.list
      })
    },
    // 商品数据刷新的方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        // push res中取得的数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //使bscroll能进行能一直加载，不会只进行一次
        this.$refs.scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*因为中间滚动用了插件不影响其他部分所以不用顶部导航不用固定定位了  */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
/*position: fixed;*/
/*left: 0;*/
/*right: 0;*/
/*top: 0;*/
/*z-index: 9;*/

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 使第二个tavcontrol能显示出来 */
.tabcontrol {
  position: relative;
  z-index: 9;
}
/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
