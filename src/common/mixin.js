import { debounce } from 'common/utils'
//抽离监测图片滚动高度刷新
export const itemLisenerMixin={
  data() {
    return {
      itemImageListener:null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    console.log('我是混入的内容')
  },
}
//抽离backtop
export const backTopMixin={
    data(){
      return {
        isShowBackTop: false,
      }
    },
    methods: {
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      isShowBackTopY(position) {
        this.isShowBackTop = -position.y > 1000
      },
    },
}