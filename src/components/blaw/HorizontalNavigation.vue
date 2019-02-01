<template>
  <div class="HorizontalNavigation">
    <div class="interior">
      <div class="title">
        <!-- @slot Slot for logo -->
        <slot name="logo" />
      </div>
      <div>
        <div v-for='(child, label) in children' :key='label'>
          <NavigationMenu
            :children="child.children"
            :disabled="child.disabled"
            :hidden="child.hidden"
            :icon="child.icon"
            :iconSize="iconSize"
            :locked="child.locked"
            :path="child.path"
            :selected="selected(child.path)"
            :target="child.target"
            :title="child.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationMenu from './NavigationMenu.vue'

export default {
  components: { NavigationMenu },
  name: 'HorizontalNavigation',
  props: {
    /**
     * Array of children with nested grandchildren
     * @param {Object[]} [children=[]] - Child object
     * @param {Boolean} [children[].disabled] - Display item disabled
     * @param {Boolean} [children[].hidden] - Hide flag
     * @param {String} [children[].icon] - Icon
     * @param {Boolean} [children[].locked] - Display item locked
     * @param {String} [children[].path] - Anchor path
     * @param {String} [children[].selected] - Show selected state
     * @param {String} [children[].slot] - Name this child's slot
     * @param {String} [children[].target='_self'] - Anchor target
     * @param {String} [children[].title] - Display title
     */
    children: { type: Array },
    iconSize: { type: String, default: '24' }
  },
  methods: {
    selected (path) { return path === `${window.location.pathname}${window.location.hash}` }
  }
}
</script>

<style scoped lang='scss'>
.HorizontalNavigation {
  .interior {
    align-items: center;
    display: flex;

    .title {
      flex-grow: 1;
      text-align: left;
    }

    & > :last-child {
      align-items: center;
      display: flex;
    }
  }
}
</style>
