<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
    </div>
    <div slot="center" class="tittle">
      <div
        v-for="(item, index) in tittles"
        class="tittleitem"
        :class="{ active: index === currentIndex }"
        @click="tittleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar,
  },
  data() {
    return {
      tittles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    tittleClick(index) {
      this.currentIndex = index
      this.$emit('tittleClick', index)
    },
    backClick() {
      this.$router.back()
    },
  },
}
</script>

<style  scoped>
.tittle {
  display: flex;
}
.tittleitem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  vertical-align: middle;
}
</style>