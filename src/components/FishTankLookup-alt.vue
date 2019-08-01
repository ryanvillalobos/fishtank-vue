<script>
import HighlightedText from "./FishTankHighlightedText.vue";
import TextInput from "./FishTankTextInputV2.vue";

/** Triggered when selecting a result
 * @event change
 * @type {Event}
 */

export default {
  components: { HighlightedText, TextInput },
  name: "Autocomplete",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    /**
     * Input element id
     */
    id: String,

    /**
     * Boolean to use custom slot for dropdown
     */
    customSlot: {
      slotName: String,
      selectable: Boolean,
      searchableFields: undefined
    },

    /**
     * Name
     */
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
      default: "ttb"
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
  data() {
    return {

      focused: false,
      focusedItem: 0,
      query: this.value ? this.value.label : ""
    };
  },
  computed: {
    filteredItems() {
      if (this.customSlot) {
        //Will query every field of the json unless prefixed -- add functionality later !
        var newItems = [];
        console.log("Items: ", this.items);
        for (var item of this.items) {
          console.log("Item: ", item);
          for (var value in item) {
            console.log("Value: ", value);
            if (item[value].match(new RegExp(`(${this.query})`, "ig")))
              newItems.push(item);
            continue;
          }
        }
        console.log(newItems);
        return newItems;
      } else {
        return this.items.filter(item => {
          return item.label.match(new RegExp(`(${this.query})`, "ig"));
        });
      }
    },
    filteredEmit() {
       return this.filteredItems.map((item) => { this.$emit('update:content', item) })
      //$emit('update:content', item)
    },
    identifier() {
      return (Math.random() * 10000).toFixed(0).toString();
    }
  },
  watch: {
    query() {
      // Only fire the change if the value doesn't match to
      // avoid dup event when selecting from dropdown
      if (!this.value /*|| this.value.label !== this.query*/) {
        this.$emit("change", { label: this.query, value: null });
      }
    }
  },
  methods: {
    /**
     * Clears current value
     */
    clear() {
      this.query = "";
    },
    _onFocus(event) {
      this.focused = true;
      event.target.select();
    },
    _handleKeydown(e) {
      switch (e.key) {
        case "ArrowUp":
          this.focusedItem--;
          if (this.focusedItem < 0)
            this.focusedItem = this.filteredItems.length - 1;
          break;
        case "ArrowDown":
          this.focusedItem++;
          if (this.focusedItem >= this.filteredItems.length)
            this.focusedItem = 0;
          break;
        case "Enter":
          e.preventDefault();
          this._selectResult(
            this.filteredItems[this.focusedItem] || {
              label: this.query,
              value: null
            }
          );
          break;
        default:
          this.focused = true;
      }
    },
    _selectResult(item) {
      this.focused = false;
      this.query = item.label;
      this.$emit("change", item);
    }
  }
};
</script>

<template>
  <div
    :id="id ? `${id}-combobox` : `${identifier}-combobox`"
    class="Autocomplete input-wrapper"
    role="combobox"
    @keydown="_handleKeydown"
  >
    <text-input
      :id="id ? `${id}-input` : `${identifier}-input`"
      autocomplete = "off"
      ref="query"
      v-model="query"
      icon="search_24"
      :label="label"
      :orientation="orientation"
      :placeholder="placeholder"
      :aria-expanded="(focused && items ? true: false)"
      :aria-controls="`${id}-listbox`"
      :aria-activedescendant="`option-${focusedItem}`"
      :aria-labelledby="label"
      @blur="focused=false"
      @focus="_onFocus"
      @clear="query=''"
    >
      <template #below>
        <!-- <div
          v-if="focused && filteredItems && query.length" 
          :id=" id ? `${id}-listbox` : `${identifier}-listbox`"
          role="listbox"
          class="items">
          <highlighted-text
            v-for="(item, index) in filteredItems"
            :key="index"
            :content="item.label"
            :focused="focusedItem===index"
            :term="query"
            :aria-labelledby="label"
            role="option"
            @mousedown.native="() => _selectResult(item)"
            @mouseover.native="focusedItem=index" />
        </div>-->
        <template v-if="customSlot">
          <div
            v-if="focused && filteredItems && query"
            :id=" id ? `${id}-listbox` : `${identifier}-listbox`"
            role="listbox"
            class="items"
          >
            <div v-for="(item, index) in filteredEmit" :key="index"
            >
              <slot
                class = "highlighted-text"
                :name='customSlot.slotName'
                content ="item"
                :focused="focusedItem===index"
                :term="query"
                :aria-labelledby="label"
                role="option"
                @mousedown.native="() => _selectResult(item)"
                @mouseover.native="focusedItem=index"
              >
                <!-- {{ item }} -->
              </slot>
            </div>
          </div>
        </template>
      </template>
    </text-input>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  font-family: "Open Sans", sans-serif;
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

    &:empty {
      display: none;
    }

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