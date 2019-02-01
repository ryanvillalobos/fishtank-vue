
<template>
  <div class="VerticalTabs">
    <div class="VerticalTabs__headers">
      <div
          class="VerticalTabs__header"
          v-for="(header, index) in $slots.header"
          :key="index"
          :class="{'VerticalTabs__header--active': isActive(index)}"
          @click="handleClick(index)" >
        <virtual-node :vnode="header" />
      </div>
    </div>
    <div class="VerticalTabs__contents">
      <div class="VerticalTabs__content"
          v-for="(content, index) in $slots.content"
          :key="index"
          :class="{'VerticalTabs__content--active': isActive(index)}" >
        <virtual-node :vnode="content" />
      </div>
    </div>
  </div>
</template>

<script>
import VirtualNode from './VirtualNode.vue'
/**
 * A collection of header and content pairs,
 * where the headers and contents are grouped separately,
 * and one pair is always active. The headers are arranged vertically
 * and the active content is visible next to them. Inactive contents are not displayed.
 */
export default {
  name: 'VerticalTabs',
  components: { VirtualNode },
  props: {
    /**
     * The zero-based index of the tab that is initially active
     */
    initialActive: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      activeIndex: this.initialActive
    }
  },
  methods: {
    /**
     * Returns true if the argument matches the active index
     * Used to determine the css class of headers and contents.
     * @public
     * @param {number} index
     * @returns {boolean}
     */
    isActive (index) {
      return this.activeIndex === index
    },
    /**
     * Called when a header is clicked. Sets the active index to the index of the header.
     */
    /**
     * Activation event is emitted when the active tab changes.
     * @event activation
     * @type {object}
     * @property {index} The index of the active tab
     */
    handleClick (index) {
      this.activeIndex = index
      this.$emit('activation', {index})
    }
  }
}
</script>

<style scoped lang="scss">
.VerticalTabs /deep/ {
  display: flex;
  flex-flow: row nowrap;
  .VerticalTabs__header {
    cursor: pointer;
  }
  .VerticalTabs__contents {
    flex-grow: 1;
  }
  .VerticalTabs__content {
    display: none;
  }
  .VerticalTabs__content--active {
    display: block;
  }
}
</style>
