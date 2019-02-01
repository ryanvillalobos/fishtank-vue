<template>
  <div class='RadioList'>
    <div :disabled="item.disabled" v-for='(item, index) in items' :key='index'>
      <input type="radio" v-model="value" :name="name" :id="`radio-${identifier}-${item.value}`" :value="item.value" :disabled="item.disabled" @click="handleClick" />
      <label :for="`radio-${identifier}-${item.value}`">
        <slot :name="item.slot">{{item.label}}</slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioList',
  props: {
    /**
     * Available items to display
     * @param {Object[]} [items=[]] - Child object
     * @param {Boolean} [items[].disabled] - Disabled state
     * @param {String} [items[].label] - Child label
     * @param {String} [items[].slot] - Child label slot name
     * @param {String} [items[].value] - Child value
     */
    items: { type: Array },

    /**
     * Input elements name
     */
    name: { type: String },

    /**
     * Current value
     */
    value: { type: String }
  },
  data () {
    return {
      /**
       * Unique identifier to handle issues with duplicate ids when multiple RadioLists are present
       */
      identifier: Math.random()
    }
  },
  methods: {
    handleClick (e) {
      /** Triggered when value is changed
        * @event change
        * @type {Event}
        */
      this.$emit('change', e)
      e.preventDefault()
    }
  }
}
</script>

<style scoped lang='scss'>
.RadioList {
  align-items: center;
  display: flex;

  & > div {
    margin-right: 25px;

    &[disabled] { opacity: 0.5; }
  }

  input[type="radio"] {
    display: none;

    & + label {
      align-items: center;
      color: var(--primary-color, #777c7f);
      cursor: pointer;
      display: inline-flex;
      font-family: "Open Sans", sans-serif;
      line-height: 16px;
      padding-left: 20px;
      position: relative;

      &:before {
        border-radius: 50%;
        border: 2px solid var(--primary-color, #777c7f);
        content: "";
        position: absolute;
        left: 0;
        height: 10px;
        width: 10px;
      }
    }

    &:checked + label:after {
      background-color: var(--selected-color, #0d9ddb);
      border-radius: 50%;
      content: "";
      height: 8px;
      width: 8px;
      position: absolute;
      left: 3px;
    }
  }
}
</style>
