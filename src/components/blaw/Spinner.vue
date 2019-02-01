
<template>
  <div class="Spinner">
    <div v-for="index in 12" :key="index" :style="styleObj(index)"/>
  </div>
</template>

<script>
/**
 * An animated spinner to indicate indeterminate progress
 */
export default {
  name: 'Spinner',
  props: {
    /**
     * The color of the spinner sections
     */
    color: String
  },
  methods: {
    /**
     * Called to set the style for each section of the spinner
     * Sets the rotation, opacity and color
     */
    styleObj (index) {
      return {
        transform: `rotate(${index * 30}deg)`,
        opacity: `${index * 0.08}`,
        backgroundColor: this.color
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Spinner {
  height: 64px;
  width: 64px;
  position: relative;
  /*
  animation-name: spinner;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: steps(12);
  */
  animation: spinner 2s infinite steps(12);
  div {
    height: 16px;
    width: 4px;
    position: absolute;
    left: 30px;
    top: 0;
    border-radius: 6px;
    transform-origin: 2px 32px;
  }
  @keyframes spinner {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
}
</style>
