<template>
  <div class="AutocompleteMultiselect">
    <Autocomplete ref="autocomplete" :id="id" :label="label" :orientation="orientation" :placeholder="placeholder" :url="url" @selected="_handleSelect"/>
    <slot name="selected">
      <div class="selected" v-for="(item, index) in selected" :key="index">
        <span @click="() => removeByIndex(index)">&times;</span>
        <span>{{item.label}}</span>
      </div>
    </slot>
  </div>
</template>
<script>
import Autocomplete from './Autocomplete.vue'

export default {
  name: 'AutocompleteMultiselect',
  components: { Autocomplete },
  props: {
    /**
     * Allow duplicate results
     */
    allowDuplicates: Boolean,

    /**
     * ID for input element
     */
    id: String,

    /**
     * Label to display with input
     */
    label: String,

    /**
     * Label/input orientation (rtf, ltr, ttb)
     */
    orientation: {
      type: String,
      default: 'ttb'
    },

    /**
     * Placeholder to display in input element
     */
    placeholder: String,

    /**
     * Current selected values
     * @param {Object[]} [selected=[]] - Selected object
     * @param {Boolean} [selected[].label] - Selected item label
     * @param {Boolean} [selected[].value] - Selected item value
     */
    selected: {
      type: Array,
      default: () => []
    },

    /**
     * Url to query for results
     */
    url: String
  },
  methods: {
    /**
     * Removes selected item by index
     */
    removeByIndex (index) {
      let selected = this.selected.slice(0)
      selected.splice(index, 1)
      this.$emit('change', selected)
    },

    _handleSelect (item) {
      const selected = (this.allowDuplicates ? this.selected : this.selected.filter(s => s.value !== item.value)).concat([item])
      this.$refs.autocomplete.clear()
      this.$emit('change', selected)
    }
  }
}
</script>
<style lang="scss" scoped>
.AutocompleteMultiselect {
  .selected {
    align-items: center;

    span:first-child { cursor: pointer; }
  }
}
</style>
