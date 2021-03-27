<template>
  <div id="detail">
    <detail-nav-bar class="detailnav" @tittleClick="tittleClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="currentscroll" :probe-type="3">
      <ul>
        <li v-for="item in $store.state.cartList">
          {{ item }}
        </li>
      </ul>
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comments"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addShopCar="addShopCar"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail.js'

import { debounce } from 'common/utils'
import { itemLisenerMixin, backTopMixin } from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
  },
  mixins: [itemLisenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [], //轮播图数据
      goods: {}, //商品数据
      shop: {}, //店铺信息
      detailInfo: {}, //商品详细信息
      paramInfo: {}, //参数信息
      commentInfo: {}, //评论信息
      recommends: [], //推荐数据
      //使用混入，不使用混入的方法注释掉了
      // itemImageListener: null,
      themeTopYs: [], //保存头部导航栏对应到的offsetTop值
      getThemeTopY: null, //顶部导航和滑动响应
      // 第二种方法
      currentIndex: -1, //防止滚动重复刷数据
      // 第一种方法
      // currentIndex: 0,
      // 回到顶部按钮判断
      // isShowBackTop: false,
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺数据
      this.shop = new Shop(data.shopInfo)
      //4.获取商品详细信息
      this.detailInfo = data.detailInfo
      //5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取评论信息
      // 判断是否有评论，因为存在没有评论的情况
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      //3.大点 获取推荐数据 在其他接口里面
      getRecommend().then((res) => {
        this.recommends = res.data.list
      })
      //给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      }, 100)
    })
  },
  // mounted() {
  //    判断, 所有的图片都加载完了, 那么进行一次回调就可以了.第二种方法
  //   const refresh = debounce(this.$refs.scroll.refresh, 500)
  //   this.$bus.on('imgageLoad', () => {
  //     refresh()
  //   })
  // },
  //this.$nextTick(() => {
  //$nextTick是等该组件创造完后再执行一个回调函数，
  //但是这个只是检测到你dom渲染出来就执行，而图片数据不一定渲染完了，所以高度还是有问题，所以用updated更新
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // this.itemImageListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    //图片加载刷新滑动高度
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    //点击顶部导航指定按钮到达指定部位
    tittleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    currentscroll(position) {
      //这是顶部导航和滑动响应的方法
      const positionY = -position.y
      length = this.themeTopYs.length
      for (let i = 0; i <= this.themeTopYs.length; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // this.currentIndex = i
          // console.log(this.currentIndex)
          // this.$refs.navbar.currentIndex = this.currentIndex
          this.$refs.navbar.currentIndex = i
        }
      }
      // 1.判断BackTop是否显示
      // this.isShowBackTop = -position.y > 1000
      this.isShowBackTopY(position)
    },
    // isShowBackTop() {
    //   this.isShowBackTop = -position.y > 1000
    // },
    // 回到顶部
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0)
    // },
    addShopCar() {
      // 1、先获取数据
      const product = {}
      product.title = this.goods.title
      product.price = this.goods.NowPrice
      product.desc = this.goods.desc
      product.image = this.topImages[0]
      product.iid = this.iid
      // 2、发送这个数据给vuex管理,共享
      // 1不能直接通过mumutations修改， mutations只能完成单一的事才好跟踪
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product)
      // .then((res) => {
      //   console.log(res)
      //   //vuex中的actions可以接收一个promise执行异步操作
      // })
      // 使用映射关系，直接将action中的方法映射到组件内，直接调用
      // this.addCart(product).then((res) => {
      /*// 如果使用插件，这个就不需要了
        this.msg = res
        this.show = true
        // 1.5s之后消失
        setTimeout(() => {
          this.show = false
          this.msg = ' '
        },1500)
        */
      // this.$toast.show(res)
      // })
    },
  },
}
</script>

<style  scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detailnav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
}
</style>