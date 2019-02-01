<template>
  <div class='accordion'>
    <div class="heading" v-on:click="toggle">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div>
        <ChevronDown24 />
        <!-- <svgicon name="chevron-down_24" class="dropdown-arrow" ref="icon" width="24" height="24"></svgicon> -->
      </div>
    </div>
    <div class="collapsible" ref="elements">
      <div class="padding">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import * as svgicon from 'vue-svgicon'
import { ChevronDown24 } from '@fishtank/icons-vue'
/** Fired when the accordion is clicked, notified of expected toggle
 * @event click
 * @type {Event}
 */
export default {
  name: 'Accordion',
  components: { ChevronDown24 },
  props: {
    /**
    * the open state, set to true to show all the items in the accordion
    */
    open: { type: Boolean, default: false }
  },
  mounted () {
    this.initOpen()
  },
  watch: {
    open (newVal, oldVal) {
      if (newVal) {
        this.expand()
      } else {
        this.collapse()
      }
    }
  },
  methods: {
    initOpen () {
      if (this.open) {
        const oldTransition = this.clearTransitions()
        this.expand()
        this.restoreTransitions(oldTransition.element, oldTransition.icon)
      }
    },

    toggle (event) {
      this.$emit('click', {event: event, accordion: this.$el})
    },

    expand () {
      this.$refs.elements.style.height = this.$refs.elements.scrollHeight + 'px'
      this.updateTransform('rotate(180deg)')
    },

    collapse () {
      // need to transition out of the actual height not 'auto' so need to disable transitions
      // while we set the height to the actual height
      const oldTransition = this.$refs.elements.style.transition

      this.$refs.elements.style.transition = ''
      this.updateTransform('rotate(0deg)')

      requestAnimationFrame(() => {
        this.$refs.elements.style.height = this.$refs.elements.scrollHeight + 'px'
        this.$refs.elements.style.transition = oldTransition
        requestAnimationFrame(() => (this.$refs.elements.style.height = 0 + 'px'))
      })
    },

    clearTransitions () {
      let oldTransition = {element: this.$refs.elements.style.transition, icon: this.$refs.icon.$el.style.transition}

      this.$refs.elements.style.transition = 'none'
      this.$refs.icon.$el.style.transition = 'none'

      return oldTransition
    },

    transitionEndListener () {
      this.$refs.elements.removeEventListener('transitionend', this.transitionEndListener)
      this.$refs.elements.style.height = null
    },

    restoreTransitions (oldElement, oldIcon) {
      // ensure that the transition has already happened before restoring the transition
      requestAnimationFrame(() => {
        this.$refs.elements.style.transition = oldElement
        this.$refs.icon.$el.style.transition = oldIcon
      })
    },

    updateTransform (transform) {
      this.$refs.icon.$el.style['transform'] = transform
      this.$refs.icon.$el.style['-ms-transform'] = transform
      this.$refs.icon.$el.style['-webkit-transform'] = transform
    }
  }
}
</script>

<style scoped lang='scss'>
// @import 'src/assets/fishtank';
@import "../../../node_modules/@fishtank/colors/dist/index";
@import "../../../node_modules/@fishtank/type/dist/index";
.accordion {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: $font-primary;
  padding-right: 8px;
  padding-left: 8px;
}

.dropdown-arrow {
  transition: transform 0.3s ease-in-out;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0;
  margin: 0;
  min-height: 44px;

  .title {
    color: var(--accordion-font-color, #292E31);
    &>* {
      display: flex;
      align-items: center;
    }
  }
  border-bottom: 1px solid #C5CACD;
}

.collapsible {
  transition: height 0.3s ease-out;
  height: 0;
}

.padding {
  padding-top: 16px;
  padding-bottom: 16px;
}

</style>
