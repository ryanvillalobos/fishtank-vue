<template>
  <div :disabled='disabled' :hidden='hidden' :locked='locked' :selected="selected" class='NavigationMenu' v-bind:class="{ 'has-children': children && children.length }">
    <!-- Title -->
    <a :href='path' :target='target || "self"' class="label">
      <!-- <svgicon v-if='icon' :name='icon' :width='iconSize' :height='iconSize' /> -->
      <div>{{title}}</div>
      <!-- <svgicon v-if='locked' name='lock-closed_24' :width='iconSize' :height='iconSize' class='lock' /> -->
      <LockClosed24 v-if='locked' />
      <!-- @slot Slot for primary title -->
      <slot name="title"></slot>
    </a>

    <!-- Children -->
    <div v-if='children' class='children'>
      <div v-for='(child, childLabel) in children' :key='childLabel'>
        <div :disabled='child.disabled' :hidden='child.hidden' :locked='child.locked' :selected="child.selected" class='child' v-bind:class="{ 'has-grandchildren': child.children && child.children.length }">
          <div v-if='child.title || child.icon' class='child-label'>
            <a :href='child.path' :target='child.target || "self"'>{{child.title}}</a>
            <!-- <svgicon v-if='child.locked' name='lock-closed_24' :width='iconSize' :height='iconSize' class='lock' /> -->
            <LockClosed24 v-if='child.locked' />
            <!-- <svgicon v-if='child.icon' :name='child.icon' :width='iconSize' :height='iconSize' /> -->
          </div>
          <slot :name='child.slot'></slot>

          <!-- Grandchildren -->
          <div class='grandchildren'>
            <div v-for='(grandchild, grandchildLabel) in child.children' :key='grandchildLabel'>
              <div :disabled='grandchild.disabled' :hidden='grandchild.hidden' :locked='grandchild.locked' :selected="grandchild.selected" class='grandchild'>
                <div v-if='grandchild.title || grandchild.icon' class='grandchild-label'>
                  <a :href='grandchild.path' :target='grandchild.target || "self"'>{{grandchild.title}}</a>
                  <span />
                  <!-- <svgicon v-if='grandchild.locked' name='lock-closed_24' :width='iconSize' :height='iconSize' class='lock' /> -->
                  <LockClosed24 v-if='grandchild.locked' />
                  <!-- <svgicon v-if='grandchild.icon' :name='grandchild.icon' :width='iconSize' :height='iconSize' /> -->
                </div>
                <slot :name='grandchild.slot'></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import * as svgicon from 'vue-svgicon'
// import 'compiled-icons/fishtank'
// import 'vue-svgicon/dist/polyfill'
import {
  LockClosed24,
} from '@fishtank/icons-vue'

/**
 * Multi-level navigation menu component
 *
 * Slots: In addition to the root title slot, define slot names on children/grandchildren and any defined slot contents will be rendered in that child/grandchild
 *
 * Style Variables:
 * --accent-color
 * --background-color
 * --border-color
 * --font-family
 * --font-size
 * --interior-color
 * --invert-background-color
 * --invert-primary-color
 * --lock-color
 * --primary-color
 * --selected-background-color
 * --selected-primary-color
 */
export default {
  components: { 
    LockClosed24
   },
  name: 'NavigationMenu',
  props: {
    /**
     * Array of children with nested grandchildren
     * @param {Object[]} [children=[]] - Child object
     * @param {Boolean} [children[].disabled] - Disabled flag
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

    /**
     * Disabled this component
     */
    disabled: { type: Boolean },

    /**
     * Hide this component
     */
    hidden: { type: Boolean },

    /**
     * Icon name to display
     */
    icon: { type: String },

    /**
     * Size of icons within component
     */
    iconSize: { type: String, default: '24' },

    /**
     * Display this component locked
     */
    locked: { type: Boolean },

    /**
     * Anchor path
     */
    path: { type: String },

    /**
     * Show selected state
     */
    selected: { type: Boolean },

    /**
     * Anchor target
     */
    target: { type: String, default: '_self' },

    /**
     * Display title
     */
    title: { type: String }
  }
}
</script>

<style scoped lang='scss'>
.NavigationMenu {
  background-color: var(--background-color, transparent);
  border-radius: 5px;
  color: var(--primary-color, #777c7f);
  display: inline-block;
  font-family: var(--font-family, 'helvetica');
  padding: 4px;
  position: relative;
  text-decoration: none;

  a {
    color: var(--primary-color, #777c7f);
    cursor: initial;
    display: inline-block;
    text-decoration: none;

    &[href] { cursor: pointer; }
  }

  & > a { cursor: pointer; }

  svg { fill: var(--primary-color, #777c7f); }

  .label {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: var(--font-size, 14px);
    position: relative;
    text-align: center;

    .lock {
      position: absolute;
      top: 0%;
      right: 0%;
      z-index: 100;
    }
  }

  .lock { fill: var(--lock-color, #333); }

  .children {
    background-color: var(--interior-color, #fff);
    border-top: 1px solid var(--border-color, lightgray);
    border-left: 1px solid var(--border-color, lightgray);
    display: none;
    left: 0;
    position: absolute;
    top: 100%;
    z-index: 100;

    .child {
      border-bottom: 1px solid var(--border-color, lightgray);
      border-right: 1px solid var(--border-color, lightgray);
      position: relative;

      .child-label {
        align-items: center;
        display: flex;
        padding: 3px 8px 3px 0;
        text-align: left;
        white-space: nowrap;

        > a {
          display: block;
          padding-left: 12px;
          padding-right: 16px;
          line-height: 32px;
          min-width: 196px;
        }
      }

      .grandchildren {
        background-color: var(--interior-color, #fff);
        border: 1px solid var(--border-color, lightgray);
        display: none;
        position: absolute;
        top: -1px;
        left: 100%;

        .grandchild {
          color: var(--primary-color, #777c7f);
          position: relative;

          .grandchild-label {
            align-items: center;
            display: flex;
            padding: 3px;
            white-space: nowrap;
            min-width: 196px;

            > a {
              border-bottom: 2px solid transparent;
              line-height: 32px;
              margin-left: 12px;
              text-align: left;
              vertical-align: top;

              &:hover {
                border-bottom: 2px solid var(--accent-color, #e6ac00);
                font-weight: 600;
              }
            }

            > span { flex-grow: 1; }
          }
        }
      }

      &:hover {
        .child-label > a {
          border-left: 5px solid var(--accent-color, #e6ac00);
          font-weight: 600;
          padding-left: 7px;
        }

        &.has-grandchildren {
          .grandchildren { display: block; }

          &:after {
            background-color: var(--interior-color, #fff);
            content: "";
            height: 100%;
            padding: 0 0 1px 0;
            position: absolute;
            right: -1px;
            top: 0;
            width: 2px;
          }
        }
      }
    }
  }

  &:hover {
    background-color: var(--invert-background-color, transparent);

    .label {
      color: var(--invert-primary-color, #e6ac00);

      svg { fill: var(--invert-primary-color, #e6ac00); }
    }

    &.has-children {
      .children {
        color: var(--background-color, #fff);
        display: block;
      }

      // Children carot
      &:after {
        content: "";
        background-color: var(--interior-color, #fff);
        border-left: 1px solid var(--border-color, lightgray);
        border-top: 1px solid var(--border-color, lightgray);
        display: block;
        height: 10px;
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
        width: 10px;
        z-index: 100;
      }
    }
  }

  &[selected] {
    background-color: var(--selected-background-color, #e6ac00);

    .label {
      color: var(--selected-primary-color, #fff);

      svg { fill:var(--selected-primary-color, #fff); }
    }
  }
  &[hidden], *[hidden] { display: none; }
  &[locked], *[locked] {
    opacity: 0.5;
  }
  &[disabled], *[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
