<template>
  <div class="Tabs" :disabled="disabled">
    <div class="header">
      <div class="title" v-for="(item, index) in items" :key="`${index}-title`" :active="item.name===active" :disabled="item.disabled" :hidden="item.hidden" @click="$emit('change', item.name)">
        <slot :name="`${item.name}-title`">
          <!-- <svgicon class='tab-icon' v-if="item.icon" :name="item.icon" width="24" height="24" /> -->
          <span>{{item.label}}</span>
        </slot>
      </div>
    </div>

    <div class="body">
      <div v-for="(item, index) in items" :key="index">
        <slot v-if="item.name===active" :name="item.name"></slot>
      </div>
    </div>
  </div>
</template>

<script >
// import * as svgicon from 'vue-svgicon'
// import 'compiled-icons/fishtank'

export default {
  components: { 
    // svgicon 
  },
  name: 'Tabs',
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
     * Array of children with nested grandchildren
     * @param {Object[]} [items=[]] - Child tab definitions
     * @param {Boolean} [items[].disabled] - Tab disabled state
     * @param {Boolean} [items[].hidden] - Tab hidden state
     * @param {String} [items[].icon] - Tab icon to display
     * @param {String} [items[].label] - Tab label to display
     * @param {String} [items[].name] - Tab name to use for defining slots, use '-title' suffix for title slot
     */
    items: Array
  }
}
</script>

<style scoped lang='scss'>
.Tabs {
  .header {
    border-bottom: 1px solid var(--border-color, lightgray);
    display: flex;
    padding: 0 6px;

    .title {
      align-items: center;
      border-bottom: 4px solid var(--border-color, lightgray);
      cursor: pointer;
      display: flex;
      font-size: 16px;
      padding: 6px 3px;

      > span { margin-left: 5px; }

      &:not(:last-child) { margin-right: 15px; }
      &[active] {
        border-color: var(--active-color, #0D9DDB);
        font-weight: 600;
      }
      &[hidden] { display: none; }
    }
  }

  &[disabled],[disabled] {
    opacity: 0.25;
    pointer-events: none;
  }
}
</style>
