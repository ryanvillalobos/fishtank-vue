
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  border: 1px solid #C5CACD;
  border-radius: 2px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px 0;
}
</style>
