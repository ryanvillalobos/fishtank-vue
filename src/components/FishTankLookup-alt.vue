<script>
import HighlightedText from './FishTankHighlightedText.vue'
import TextInput from './FishTankTextInputV2.vue'

/** Triggered when selecting a result
 * @event change
 * @type {Event}
 */

export default {
  components: { HighlightedText, TextInput },
  name: 'Autocomplete',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Input element id
     */
    id: String,

    /**
     * Label to display with input box
     */
    label: String,

    /**
     * Input name attribute
     */
    name: String,

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
     * Array of autocomplete items
     */
    items: {
      type: Array,
      default: () => []
    },

    /**
     * Current selected value
     * @param {Object} value - Value hash
     * @param {Boolean} value.label - Display value
     * @param {Boolean} value.value - Selected value
     */
    value: Object
  },
  data () {
    return {
      focused: false,
      focusedItem: 0,
      query: this.value ? this.value.label : ''
    }
  },
  computed: {
    filteredItems () {
      return this.items.filter(item => {
        return item.label.match(new RegExp(`(${this.query})`, 'ig'))
      })
    }
  },
  watch: {
    query () {
      // Only fire the change if the value doesn't match to
      // avoid dup event when selecting from dropdown
      if (!this.value || this.value.label !== this.query) {
        this.$emit('change', { label: this.query, value: null })
      }
    }
  },
  methods: {
    /**
     * Clears current value
     */
    clear () {
      this.query = ''
    },
    _onFocus (event) {
      this.focused = true
      event.target.select()
    },
    _handleKeydown (e) {
      switch (e.key) {
        case 'ArrowUp':
          this.focusedItem--
          if (this.focusedItem < 0) this.focusedItem = this.filteredItems.length - 1
          break
        case 'ArrowDown':
          this.focusedItem++
          if (this.focusedItem >= this.filteredItems.length) this.focusedItem = 0
          break
        case 'Enter':
          e.preventDefault()
          this._selectResult(this.filteredItems[this.focusedItem] || { label: this.query, value: null })
          break
        default:
          this.focused = true
      }
    },
    _selectResult (item) {
      this.focused = false
      this.query = item.label
      this.$emit('change', item)
    }
  }
}
</script>

<template>
  <div class="Autocomplete input-wrapper" @keydown="_handleKeydown">
    <text-input
      ref="query"
      icon="search_24"
      :id="id"
      :label="label"
      :orientation="orientation"
      :placeholder="placeholder"
      v-model="query"
      @blur="focused=false"
      @focus="_onFocus"
      @clear="query=''">
      <template #below>
        <div class="items" v-if="focused && filteredItems && query.length">
          <highlighted-text
            v-for="(item, index) in filteredItems"
            :content="item.label"
            :key="index"
            :focused="focusedItem===index"
            :term="query"
            @mousedown.native="() => _selectResult(item)"
            @mouseover.native="focusedItem=index"/>
        </div>
      </template>
    </text-input>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  font-family: 'Open Sans', sans-serif;
  position: relative;

  .items {
    background-color: #fff;
    border-radius: 1px;
    box-shadow: 0 3px 6px 0 rgba(41, 46, 49, 0.5);
    left: 2px;
    position: absolute;
    top: 100%;
    max-height: 200px;
    max-width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    width: 520px;
    z-index: 10;

    &:empty { display: none; }

    .HighlightedText {
      display: block;
      padding: 10px;
      cursor: pointer;
      font-size: var(--font-size, 14px);
      line-height: 20px;

      &[focused] {
        background-color: #b9d1f3;
        color: #225379;
      }
    }
  }
}
</style>