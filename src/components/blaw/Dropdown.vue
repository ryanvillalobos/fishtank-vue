<template>
  <div class="select-wrapper" @mouseleave="close">
    <div class="select" @click="toggle">
      <div class="selected-option">{{ selected.label }}</div>
      <div v-if="!noItems" class="pull-down-triangle-container">
        <div class="pull-down-triangle"></div>
      </div>
    </div>
    <div v-if="displayDropdown" class="select-open">
      <div v-for="item in items"
           v-bind:key="item.value"
           @click="handleChange(item)"
           class="select-option">
        <div class="option-text">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

/**
 * Custom dropdown menu
 *
 * Style variables:
 * --border-color
 * --selector-height
 * --selector-width
 * --border-radius
 * --hover-background-color
 * --dropdown-background-color
 * --dropdown-icon-color
 * --text-color
 * --font-size
 */
export default {
  name: 'Dropdown',
  props: {
    /**
     * Array of dropdown items
     */
    items: {
      type: Array,
      default () {
        return []
      }
    },
    /**
     * Current selected item
     */
    selected: {
      type: Object,
      default () {
        if (this.items.length > 0) {
          return this.items[0]
        } else { // if no items or selected value are passed
          return {label: 'No items'}
        }
      }
    }
  },
  data () {
    return {
      displayDropdown: false
    }
  },
  methods: {
    handleChange (newItem) {
      this.close()
      /**
       * Change event.
       *
       * @event change
       * @type {object}
       */
      this.$emit('change', { new: newItem, old: this.selected })
    },
    /**
     * Toggle (open/close) dropdown list
     *
     * @public
     */
    toggle () {
      this.displayDropdown = !this.displayDropdown
    },
    /**
     * Close dropdown list
     *
     * @public
     */
    close () {
      this.displayDropdown = false
    }
  },
  computed: {
    noItems () {
      return this.items.length === 0
    }
  }
}
</script>

<style scoped lang="scss">

  .select-wrapper {
    height: 100%;
    position: relative;
  }

  .select {
    position: relative;
    height: 100%;
    background-color: white;
    border: 1px solid var(--border-color, #C5CACD);
    border-radius: var(--border-radius, 2px);
    color: #505558;
    line-height: var(--selector-height, 40px);
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
  }

  .select:hover {
    box-shadow: 0 1px 5px rgba(193, 197, 203, 0.5);
  }

  .pull-down-triangle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--dropdown-icon-color, #5E646C);
    transform: translate(-50%, -50%);
  }

  .select-open {
    z-index: 100;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.3);
    border-radius: 2px;
    background-color: var(--dropdown-background-color, #FFFFFF);
    position: absolute;
    font-size: var(--font-size, 16px);
    width: 100%;
    transition: transform 0.4s;
    transform-style: preserve-3d;
    border: 1px solid var(--border-color, #C5CACD);
  }

  .select-option {
    position: relative;
    height: var(--selector-height, 40px);
    line-height: var(--selector-height, 40px);
    color: var(--text-color, #2A2D30);
    padding-left: 12px;
    cursor: pointer;
  }

  .select-option:hover, .select-option:focus {
    background-color: var(--hover-background-color, #E7F5FB);
    color: var(--text-color, #2A2D30);
    outline: none;
  }

  .option-text {
    white-space: nowrap;
    padding-right: 36px;
  }

  .selected-option {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-right: 36px;
    padding-left: 4px;
  }

  .pull-down-triangle-container {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: var(--selector-height, 40px);
    justify-content: space-between;
  }

</style>
