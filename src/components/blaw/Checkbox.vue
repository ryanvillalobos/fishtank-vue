<template>
  <div class='Checkbox' :checked="checked" :disabled="disabled" :orientation="orientation" :slider="slider">
    <input type="checkbox" :id="`checkbox-${name}`" :name="name" :checked="checked" @change="handleChange" />
    <label :for="`checkbox-${name}`">
      <CheckboxSelected24 v-if="checked"/>
      <CheckboxUnselected24 v-if="!checked"/>
      <!-- @slot Slot for checkbox label -->
      <slot>{{title}}</slot>
    </label>
  </div>
</template>

<script>
// import * as svgicon from 'vue-svgicon'
// import 'compiled-icons/fishtank'
import {
  CheckboxSelected24,
  CheckboxUnselected24
} from '@fishtank/icons-vue'

export default {
  components: { 
    CheckboxSelected24,
    CheckboxUnselected24
   },
  name: 'Checkbox',
  props: {
    /**
     * Checked state
     */
    checked: { type: Boolean, default: false },

    /**
     * Disabled state
     */
    disabled: Boolean,

    /**
     * Input element name attribute, will be used to generate id for input/label
     */
    name: { type: String },

    /**
     * Orientation of label/input, ie rtf/ltr
     */
    orientation: {
      type: String,
      default: 'ltr'
    },

    /**
     * Show as slider
     */
    slider: Boolean,

    /**
     * Default title to display, will not be used if slot is defined
     */
    title: { type: String }
  },
  methods: {
    handleChange (e) {
      /** Triggered when checkbox is changed
       * @event change
       * @type {Event}
       */
      this.$emit('change', !this.checked)
    }
  }
}
</script>

<style scoped lang='scss'>
  .Checkbox {
    input[type=checkbox] { display: none;  }

    & > label {
      color: var(--primary-color, #777c7f);
      cursor: pointer;
      display: inline-flex;
      font-family: 'Open Sans', sans-serif;
      line-height: 26px;

      .svg-icon {
        fill: var(--primary-color, #777c7f);
        margin-right: 5px;
        &[hidden] { display: none; }
      }
    }
    &[checked] label .svg-icon { fill: var(--selected-color, #267ABD); }
    &[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }

    &[orientation='rtl'] {
      & > label {
        flex-direction: row-reverse;

        .svg-icon {
          margin-left: 5px;
          margin-right: 0;
        }
      }
    }

    // Slider theme
    &[slider] {
      & > label {
        padding-left: 42px;
        position: relative;

        .svg-icon { display: none; }

        &:before {
          background-color: gray;
          border-radius: 15px;
          box-shadow: 0px 0px 1px #000;
          content: '';
          display: block;
          height: 16px;
          left: 0;
          position: absolute;
          top: 4px;
          width: 32px;
        }

        &:after {
          background-color: transparent;
          border: 6px solid whitesmoke;
          border-radius: 50%;
          box-shadow: 0px 0px 3px #777c7f;
          content: '';
          display: block;
          height: 6px;
          left: 0;
          position: absolute;
          top: 3px;
          transition: 250ms ease-in-out;
          width: 6px;
        }
      }

      &[checked] {
        & > label {
          &:before { background-color: var(--selected-color, #0d9ddb); }
          &:after { left: 16px; }
        }
      }

      &[orientation='rtl'] {
        & > label {
          padding-left: 0;
          padding-right: 42px;

          &:before { left: auto; right: 0; }
          &:after { left: auto; right: 16px; }
        }

        &[checked] {
          & > label {
            &:before { background-color: var(--selected-color, #0d9ddb); }
            &:after { right: 0; }
          }
        }
      }
    }
  }
</style>
