<template>
  <data-fetcher 
    :url="dataUrl" 
    enable-cache>
    <div 
      slot-scope="{ loading, fetchedData: { data: { items } } }" 
      :focused="focused" 
      :name="name" 
      :orientation="orientation" 
      class="Autocomplete" 
      @keydown="e => _handleKeydown(e, items)" >
      <div 
        :id="id ? `${id}-combobox` : `${identifier}-combobox`"
        class="input-wrapper"
        role="combobox">
        <text-input 
          :id="id ? `${id}-input` : `${identifier}-input`"
          ref="query"
          v-model="query"
          :label="label"
          :orientation="orientation"
          :placeholder="placeholder" 
          :aria-expanded="(focused && items ? true: false)" 
          :aria-controls="`${id}-listbox`" 
          :aria-activedescendant="`option-${focusedItem}`"
          :aria-labelledby="label"
          type="text"  
          icon="search_24" 
          aria-haspopup="listbox"
          aria-autocomplete="list" 
          @blur.stop="focused=false, destroyPop()" 
          @focus.stop="focused=true, showPop()" />
        <div
          v-if="focused"
          ref="items"
          slot="below"
          :id=" id ? `${id}-listbox` : `${identifier}-listbox`"
          :style="{width:dropdownStyle}"
          role="listbox"
          class="items">
          <hightlight
            v-for="(item, index) in items"
            :id="`option-${index}`"
            :key="index"
            :aria-labelledby="label"
            :focused="focusedItem===index"
            :class="['item', {'focused': focusedItem===index}]"
            :content="item.label"
            :term="query"
            role="option"
            @mousedown.native="() => _selectResult(item)"
            @mouseover.native="focusedItem=index" />
        </div>
      </div>
    </div>
  </data-fetcher>
</template>

<script>
import DataFetcher from './BLAWDataFetcher.vue'
import HighlightedText from './FishTankHighlightedText.vue'
import TextInput from './FishTankTextInput.vue'
import Popper from 'popper.js'
/** Triggered when selecting a result
 * @event change
 * @type {Event}
 */

export default {
  name: 'FishTankLookup',
  components: { DataFetcher, hightlight: HighlightedText, TextInput },
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
     * Url to request items, will append ?query=...
     */
    url: String,

    /**
     * Width of dropdown
     */
    width: Number,

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
      dataUrl: '',
      focused: false,
      focusedItem: -1,
      query: this.value ? this.value.label : '',
      popObj:undefined,
      inputEl:undefined,
    }
  },
  computed:{
    dropdownStyle(){ 
      return (this.$props.width +`px`) || '200px'
    },
    items () {
      return this.fetchedData.data.items
    },
    identifier () {
      return (Math.random() * 10000).toFixed(0).toString()
    } 
  },
  watch: {
    query () {
      this.dataUrl = `${this.url}?query=${this.query}`

      // Only fire the change if the value doesn't match to
      // avoid dup event when selecting from dropdown
      if (this.query && (!this.value || this.value.label !== this.query)) {
        this.$emit('change', { label: this.query, value: null })
      }
    }
  },
  destroyed(){
    if(this.popObj!==undefined) this.destroyPop()
  },
  methods: {
    /**
     * Clears current value
     */
    clear () { this.query = '' },

    _handleKeydown (e, items = []) {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          this.focusedItem--
          if (this.focusedItem < 0) this.focusedItem = items.length - 1
          break
        case 'ArrowDown':
          e.preventDefault()
          this.focusedItem++
          if (this.focusedItem >= items.length) this.focusedItem = 0
          break
        case 'Enter':
          e.preventDefault()
          this._selectResult(items[this.focusedItem] || { label: this.query, value: null })
          break
        default:
          this.focused = true
      }
    },
    _selectResult (item) {
      this.focused = false
      this.$emit('change', item)
      this.query = item.label
      this.$nextTick(function(){
        this.destroyPop()
      })
    },
    showPop(){
      // if (this.inputEl === undefined) this.inputEl = document.querySelector()
      // this.inputEl = this.$refs.query
      this.inputEl = document.querySelector('.input-element')
      this.$nextTick(function(){
        this.popObj = new Popper(this.inputEl,this.$refs.items ,{
          placement:'bottom-start',
          modifiers:{
            computeStyle:{
              gpuAcceleration:true,
              // y:'left'
            },
            offset: {
              // enabled: true,
              // offset: '0px, -100%'
            }
          }
        })
      })
    },
    destroyPop(){
      this.$nextTick(function(){
        if(this.popObj!==undefined) this.popObj.destroy()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/mixins';
.Autocomplete {
  font-family: 'Open Sans', sans-serif;
  .input-wrapper {
    .items {
      z-index: 10;
      background-color: #fff;
      border: 1px solid $color-gray-lighter;
      border-radius: 2px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
      left:0;
      margin-top:$baseline;
      &:empty { display: none; }
      .item {
        display: block;
        padding: $baseline *2;
      }
      .HighlightedText {
        cursor: pointer;
        font-size: var(--font-size, 14px);
        line-height: 20px;
      }
      .focused {
        background-color: #b9d1f3;
        color: #225379;
      }
    }
  }
}
</style>