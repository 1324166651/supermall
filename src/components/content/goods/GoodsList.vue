<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :goods-item="item"
      :key="index"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.goods {
  display: flex;
  /* flex-wrap 固定布局中使按照width的宽度进行分配 不会让所有挤在一起 */
  flex-wrap: wrap;
  /*justify-content 中间空开距离平均分配 */
  justify-content: space-evenly;
}
</style>
