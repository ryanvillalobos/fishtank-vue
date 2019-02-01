<template>
  <div class="TextArea" :orientation="orientaion" @blur="$refs.input.blur()">
    <label v-if="label">{{label}}</label>
    <div class="input-wrapper">
      <textarea
        ref="input"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
/** Triggered input element is blurred
 * @event blur
 * @type {Event}
 */

/** Triggered input element is focused
 * @event focus
 * @type {Event}
 */

/** Triggered input element is changed (compatible with v-model)
 * @event input
 * @type {Event}
 */

export default {
  name: 'TextArea',
  components: { },
  props: {
    /**
     * Input element id
     */
    id: String,

    /**
     * Label to display with input
     */
    label: String,

    /**
     * Input element name
     */
    name: String,

    /**
     * Orientation to display with label/input (ie ttb, rtl, ltr)
     */
    orientaion: {
      type: String,
      default: 'ttb'
    },

    /**
     * Placeholder to display
     */
    placeholder: String,

    /**
     * Current value
     */
    value: String
  }
}
</script>

<style scoped lang="scss">
.TextArea {
  font-family: 'Open Sans', sans-serif;

  &[orientation='ltr'] {
    display: flex;

    label { margin-right: 10px; }
  }

  &[orientation='rtl'] {
    display: flex;
    flex-direction: row-reverse;

    label { margin-left: 10px; }
  }

  label {
    color: var(--primary-color, #777c7f);
    cursor: pointer;
    display: inline-flex;
    font-family: 'Open Sans', sans-serif;
    line-height: 26px;
    width: var(--label-width, auto);
  }

  .input-wrapper {
    display: flex;
    flex-grow: 1;

    textarea {
      border-radius: 3px;
      border: 1px solid var(--border-color, #C5CACD);
      flex-grow: 1;
      font-size: 16px;
      height: 120px;
      padding: 10px;
      resize: var(--text-area-resize, none);

      &:focus {
        border: 1px solid #0D9DDB;
        box-shadow: inset 0 0 0 1px #0D9DDB;
        outline: none;
      }

      &::placeholder {
        color: #C5CACD;
        font-style: italic;
      }
    }
  }
}
</style>
