
<template>
  <spinner class="SmallSpinner" :color="color"/>
</template>

<script>
import Spinner from './Spinner.vue'
/**
* A smaller animated spinner to indicate indeterminate progress.
* It wraps the original spinner and adds additional styling to make it half-sized.
*/
export default {
  name: 'SmallSpinner',
  components: {Spinner},
  props: {
    /**
    * The color of the spinner sections
    */
    color: String
  }
}
</script>

<style scoped lang="scss">
.SmallSpinner.Spinner /deep/{
  height: 32px;
  width: 32px;
  div {
    height: 8px;
    width: 2px;
    left: 15px;
    border-radius: 6px;
    transform-origin: 1px 16px;
  }
}
</style>
