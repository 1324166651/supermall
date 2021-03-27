<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Slide',
}
</script>

<style scoped>
.slide {
  height: 40%;
  width: 100%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>
