<template>
  <div class="NumberRangeInput" :disabled="disabled">
    <slot>{{title}}</slot>
    <div class="input-wrapper">
      <input type="number" :value="value[0]" ref="start" @change="_handleChangeStart" />
      <span>-</span>
      <input type="number" :value="value[1]" ref="end" @change="_handleChangeEnd" />
    </div>
  </div>
</template>

<script>
/** Triggered when value is changed
 * @event change
 * @type {Event}
 */

export default {
  name: 'NumberRangeInput',
  props: {
    /**
     * Disabled state
     */
    disabled: Boolean,

    /**
     * Minimum value
     */
    min: { type: Number, default: 0 },

    /**
     * Maximum value
     */
    max: { type: Number, default: 1000 },

    /**
     * Default title to display when no content is supplied
     */
    title: { type: String },

    /**
    * Current values
    */
    value: { type: Array }
  },
  methods: {
    _handleChangeEnd () {
      let end = Math.max(Math.min(+this.$refs.end.value, this.max), this.min)
      let start = Math.min(+this.$refs.start.value, end)
      this.$emit('change', [start, end])
    },
    _handleChangeStart () {
      let start = Math.min(Math.max(+this.$refs.start.value, this.min), this.max)
      let end = Math.max(+this.$refs.end.value, start)
      this.$emit('change', [start, end])
    }
  }
}
</script>

<style scoped lang='scss'>
.NumberRangeInput {
  align-items: center;
  display: flex;

  &[disabled] .input-wrapper {
    opacity: 0.5;
    pointer-events: none;
  }

  .input-wrapper {
    border: 1px solid var(--border-color, #C5CACD);
    border-radius: 3px;
    display: flex;
    margin-left: 10px;

    > span {
      align-items: center;
      display: inline-flex;
    }

    input[type=number] {
      border: none;
      border-bottom: 3px solid var(--active-color, #0D9DDB);
      padding: 10px 0 10px 10px;
      margin: 0 8px;
      text-align: center;
      min-width: 42px;

      &:focus { outline: none; }
    }
  }
}
</style>
