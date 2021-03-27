<template>
  <div id="tab-control">
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    },
  },
}
</script>

<style  scoped>
#tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
}
</style>