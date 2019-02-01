
<template>
  <div class="DropdownMenu"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave" >
    <div v-for="(header, index) in $slots.header"
        :key="index">
      <div class="DropdownMenu__header" @click="handleClick(index)"
          :class="{'DropdownMenu__header--active': isActive(index)}">
        <virtual-node :vnode="header" />
      </div>
      <div class="DropdownMenu__content"
          :class="{'DropdownMenu__content--active': isActive(index)}">
        <virtual-node :vnode="$slots.content[index]" />
      </div>
    </div>
  </div>
</template>

<script>
import VirtualNode from './VirtualNode.vue'
/**
 * A collection of header and content pairs,
 * where the headers and contents are grouped together,
 * and one pair can be active. The headers are arranged horizontally
 * and the active content is visible below the active header. Inactive contents are not displayed.
 */
export default {
  name: 'DropdownMenu',
  components: { VirtualNode },
  data () {
    return {
      activeIndex: null
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
    handleClick (index) {
      if (this.activeIndex === index) {
        this.activeIndex = null
      } else {
        this.activeIndex = index
        /**
        * Activation event. Fired when the active index value changes
        *
        * @event activation
        */
        this.$emit('activation', {index})
      }
    },
    /**
     * Called when the mouse leaves the component. Sets a timer that closes the active dropdown.
     */
    handleMouseLeave () {
      this.timer = window.setTimeout(() => {
        this.timer = null
        this.activeIndex = null
      }, 400)
    },
    /**
     * Called when the mouse enters the component. Cancels the timer that closes the active dropdown.
     */
    handleMouseEnter () {
      if (this.timer) {
        window.clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.DropdownMenu /deep/ {
  position: relative;
  > div {
    display: inline-block;
    position: relative;
  }
  .DropdownMenu__header {
    cursor: pointer;
  }
  .DropdownMenu__content {
    position: absolute;
    top: 100%;
    display: none;
  }
  .DropdownMenu__content--active {
    display: block;
  }
}
</style>
