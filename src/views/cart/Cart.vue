<template>
  <div id="cart">
    <nav-bar class="navbar"
      ><div slot="center">购物街({{ cartLength }})</div></nav-bar
    >
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters(['cartLength']),
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
