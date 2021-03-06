<template>
  <div 
    :disabled="disabled" 
    class="Tabs">
    <div 
      :style="headerStyleObject" 
      :class="[divider ? 'seperator': 'no-seperator']"
      class="header"
      role="menubar">
      <div 
        v-for="(item, index) in items" 
        :class="['title', focus ? 'no-focus' : 'focus']" 
        :style="titleStyleObject" 
        :key="`${index}-title`" 
        :active="item.name === active" 
        :disabled="item.disabled" 
        :hidden="item.hidden" 
        tabindex="0"
        role="menuitem"
        @click="$emit('change', item); removeFocus()"
        @keyup.13="$emit('change', item); addFocus()"
        @keyup.9="addFocus(); ">
        <slot 
          :name="`${item.name}-title`">
          <span>{{ item.label }}</span>
        </slot>
      </div>
    </div>

    <div class="body">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        :hidden="item.renderHidden && item.name!==active" 
        class="content">
        <slot 
          v-if="item.renderHidden || item.name===active" 
          :name="item.name"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { a11y } from "../util/mixins"

export default Vue.extend({
  name: 'FishTankTabs',
  components: {  },
  props: {
    /**
     * Active tab name
     */
    active: String,

    /**
     * Disabled state of entire component
     */
    disabled: Boolean,

    /**
     * Disables seperator style line on tab component
     */
    divider: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Array of children with nested grandchildren
     * @param {Object[]} [items=[]] - Child tab definitions
     * @param {Boolean} [items[].disabled] - Tab disabled state
     * @param {Boolean} [items[].hidden] - Tab hidden state
     * @param {String} [items[].label] - Tab label to display
     * @param {String} [items[].name] - Tab name to use for defining slots, use '-title' suffix for title slot
     * @param {Boolean} [items[].renderHidden] - Render the content when hidden instead of omitting, for forms etc
     */
    items: Array,

    /**
     * Render tab content hidden instead of conditionally
     */
    renderHidden: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Custom styling of the header
     */
    headerStyleObject: {
      type: Object,
      default: function () {
        return {}
      }
    },
   
    /**
     * Custom styling of the tab title
     */
    titleStyleObject: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data(){
    return{
      /*
      * Disables focus State
      */
      focus: true
    }
  },
  methods:{
    removeFocus(){
      if(!this.focus){
        if(this.focus){
          this.focus = false
        }else{
          this.focus = true
        }
      }
    },
    addFocus(){
      this.focus = false
    }
  }
  

})
</script>

<style scoped lang='scss'>
 @import '../styles/mixins';
.Tabs .header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 6px;
  margin-bottom: var(--tab-header-margin-bottom, unset);
}

.seperator{
  border-bottom: 1px solid var(--border-color, lightgray);
}

.no-seperator{
  border-bottom: 1px solid transparent;
}

.focus:focus{
  box-shadow: 0 0 0 2px #0D9DDB;
  font-weight: 600;
}
.no-focus:focus{
  outline: transparent;
}

.title {
  align-self: center;
  border-bottom: 3px solid var(--border-color, lightgray);
  cursor: pointer;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  padding: 5px 4px;
  width: var(--tab-title-width, unset);
  color: var(--color-gray-dark);
  transition: all .3s ease-in-out;

  > span {
    margin-left: var(--tab-title-span-margin-left, 5px);
    margin-right: var(--tab-title-span-margin-right, unset);
  }

  &:not(:last-child) {
    margin-right: var(--tab-title-margin-right, 15px);
  }

  &:hover {
    font-weight: 600;
    color: var(--active-tab-title-color);
    background-color: var(--active-tab-title-background-color);
    pointer-events: var(--active-tab-title-pointer-events);
    cursor: var(--active-tab-title-cursor);
  }
  &:active {
    border-color: var(--active-color, #0D9DDB);
    color: var(--active-tab-title-color);
    background-color: var(--active-tab-title-background-color);
    pointer-events: var(--active-tab-title-pointer-events);
    cursor: var(--active-tab-title-cursor);
  }
  &[active] {
    border-color: var(--active-color, #0D9DDB);
    border-width: 4px;
    color: var(--active-tab-title-color);
    background-color: var(--active-tab-title-background-color);
    pointer-events: var(--active-tab-title-pointer-events);
    cursor: var(--active-tab-title-cursor);
  }
  &:disabled {
    color: var(--disabled-tab-title-color);
    background-color: var(--disabled-tab-title-background-color);
    border-color: var(--disabled-tab-title-border-color);
  }
  &[hidden] { 
    display: none; 
  }
  &:first-of-type {
    border-radius: var(--tab-title-first-of-type-border-radius, unset);
  }
  &:last-of-type {
    border-radius: var(--tab-title-last-of-type-border-radius, unset);
  }
  &:only-of-type {
    border-radius: var(--tab-title-only-of-type-border-radius, unset);
  }
}

.Tabs{
  .body{
    border: transparent;
  }
  .body .content {
      &:hidden { display: none; }
  }

  &:disabled,[disabled] {
    opacity: 0.25;
    pointer-events: none;
  }
}
</style>

<style lang="scss">
  @import '../styles/mixins';
    body.user-is-tabbing {
      .a11y:focus{
        box-shadow: 0 0 0 2px var(--color-selected, $color-selected);
      }
    }
</style>