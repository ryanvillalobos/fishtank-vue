<template>
  <DataFetcher :url="dataUrl" enable-cache>
    <div class="Autocomplete" :focused="focused" :orientation="orientation" slot-scope="{ loading, fetchedData: { data: { items } } }" @keydown="e => items && _handleKeydown(e, items)" >
      <div class="input-wrapper">
        <TextInput icon="search_24" :label="label" :orientation="orientation" :placeholder="placeholder" ref="query" :id="id" :name="name" v-model="query" @blur="focused=false" @focus="focused=true">
          <div class="items" slot="below" v-if="focused">
            <HighlightedText
              v-for="(item, index) in items"
              :content="item.label"
              :key="index"
              :focused="focusedItem===index"
              :term="query"
              @mousedown.native="() => _selectResult(item)"
              @mouseover.native="focusedItem=index"
            />
          </div>
        </TextInput>
      </div>
    </div>
  </DataFetcher>
</template>

<script>
import DataFetcher from './DataFetcher.vue'
import HighlightedText from './HighlightedText.vue'
import TextInput from './TextInput.vue'

/** Triggered when selecting a result
 * @event selected
 * @type {Event}
 */

export default {
  components: { DataFetcher, HighlightedText, TextInput },
  name: 'Autocomplete',
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
     * Label/input orientation (rtf, ltr, ttb)
     */
    orientation: {
      type: String,
      default: 'ttb'
    },

    /**
     * Input name attribute
     */
    name: String,

    /**
     * Placeholder to display in input element
     */
    placeholder: String,

    /**
     * Url to request items, will append ?query=...
     */
    url: String
  },
  data () {
    return {
      dataUrl: '',
      focused: false,
      focusedItem: 0,
      query: ''
    }
  },
  watch: {
    query () { this.dataUrl = `${this.url}?query=${this.query}` }
  },
  methods: {
    /**
     * Clears current value
     */
    clear () { this.query = '' },

    _handleKeydown (e, items) {
      switch (e.key) {
        case 'ArrowUp':
          this.focusedItem--
          if (this.focusedItem < 0) this.focusedItem = items.length - 1
          break
        case 'ArrowDown':
          this.focusedItem++
          if (this.focusedItem >= items.length) this.focusedItem = 0
          break
        case 'Enter':
          e.preventDefault()
          this._selectResult(items[this.focusedItem])
          break
        default:
          this.focused = true
      }
    },
    _selectResult (item) {
      this.query = item.label
      this.focused = false
      this.$emit('selected', item)
    }
  }
}
</script>

<style scoped lang="scss">
.Autocomplete {
  font-family: 'Open Sans', sans-serif;

  .input-wrapper {
    position: relative;

    .items {
      background-color: #fff;
      border-radius: 1px;
      box-shadow: 0 3px 6px 0 rgba(41, 46, 49, 0.5);
      left: 2px;
      position: absolute;
      top: 100%;
      width: 520px;
      z-index: 10;

      &:empty { display: none; }

      .HighlightedText {
        display: block;
        padding: 9px;
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
}
</style>
