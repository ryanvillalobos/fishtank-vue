<template>
  <button class="Button" :disabled="disabled" :role="role" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
/** Event fired on click
 * @event click
 * @type {Event}
 */
export default {
  name: 'Button',
  props: {
    /**
     * Disabled state
     */
    disabled: Boolean,

    /**
     * Button role
     */
    role: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped lang="scss">
.Button {
  background: transparent;
  border: none;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  padding: 8px 16px;
  text-align: center;

  &[role=cancel] { color: var(--font-color, #505558); }
  &[role=danger] {
    background-color: red;
    border: 1px solid darken(red, 10%);
    font-weight: 600;
  }
  &[role=primary] {
    background-color: blue;
    border: 1px solid darken(blue, 10%);
    font-weight: 600;
  }
  &[role=success] {
    background-color: #4DAA50;
    border: 1px solid #30855C;
    font-weight: 600;
  }
  &[role=warning] {
    color: var(--font-color, #505558);
    background-color: yellow;
    border: 1px solid darken(yellow, 10%);
    font-weight: 600;
  }
  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
