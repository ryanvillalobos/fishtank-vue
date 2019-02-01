<template>
  <div class='Modal' :opened="opened">
    <div class='modal-contents'>
      <div class='modal-header'>
        <!-- @slot Slot for header content -->
        <slot name='header'>
          <!-- <svgicon class='modal-icon' v-if="icon" :name="icon" width="24" height="24" /> -->
          <span class='modal-title'>{{title}}</span>
          <!-- <svgicon class='modal-close' name='close_32' width="20" height="20" @click="handleCancel" /> -->
        </slot>
      </div>
      <div class='modal-body'>
        <!-- @slot Slot for body content -->
        <slot name='body'>
          {{message}}
        </slot>
      </div>
      <div class='modal-footer'>
        <!-- @slot Slot for footer content -->
        <slot name='footer'>
          <Button role="cancel" @click="handleCancel">{{cancelLabel}}</Button>
          <Button role="success" @click="handleConfirm">{{confirmLabel}}</Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/** Event fired on cancel
 * @event cancel
 * @type {Event}
 */

/** Event fired on confirm
 * @event confirm
 * @type {Event}
 */

import Button from './Button.vue'
// import * as svgicon from 'vue-svgicon'
// import 'compiled-icons/fishtank'
// import 'compiled-icons/index'

export default {
  components: { 
    // svgicon, 
    Button },
  name: 'Modal',
  props: {
    /**
     * Label for cancel button
     */
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },

    /**
     * Label for confirm button
     */
    confirmLabel: {
      type: String,
      default: 'Ok'
    },

    /**
     * Icon to display in top left of modal header
     */
    icon: { type: String },

    /**
     * Default message to display in body, will not be used if body slot is defined
     */
    message: { type: String },

    /**
     * Display the modal when true
     */
    opened: { type: Boolean, default: false },

    /**
     * Default message to display in header, will not be used if header slot is defined
     */
    title: { type: String }
  },
  methods: {
    handleCancel (e) { this.$emit('cancel', e) },
    handleConfirm (e) { this.$emit('confirm', e) }
  }
}
</script>

<style scoped lang='scss'>
  .Modal {
    background-color: rgba(0,0,0,0.5);
    color: var(--font-color, #505558);
    display: none;
    font-family: 'Open Sans', sans-serif;

    .modal-contents {
      background-color:  var(--modal-background-color, #fff);
      border-radius: 3px;
      box-shadow: 0 3px 6px 0 rgba(41, 46, 49, 0.5);
      height: var(--modal-height, auto);
      margin: 0 auto;
      max-height: 80vh;
      max-width: 650px;
      width: var(--modal-width, auto);

      .modal-header {
        align-items: center;
        background-color: var(--modal-background-color2, #edf2f5);
        border-bottom: 1px solid var(--border-color, #C5CACD);
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        display: flex;
        padding: 10px 15px;

        .modal-icon {
          fill: #777C7F;
          margin-right: 6px;
        }

        .modal-title {
          border-right: 1px solid var(--border-color, #C5CACD);
          flex-grow: 1;
          font-size: 16px;
          font-weight: 600;
          line-height: 28px;
          padding-right: 10px;
        }

        .modal-close {
          cursor: pointer;
          fill: #777C7F;
          margin-top: 4px;
          padding-left: 10px;
          stroke: #777C7F;
        }
      }

      .modal-body {
        height: var(--modal-body-height, initial);
        padding: 10px 15px;
        overflow: auto;
        width: var(--modal-body-width, initial);
      }

      .modal-footer {
        background-color: var(--modal-background-color2, #edf2f5);
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
        border-top: 1px solid var(--border-color, #C5CACD);
        display: flex;
        justify-content: flex-end;
        padding: 10px 15px;

        :not(:last-child) { margin-right: 10px; }
      }
    }

    &[opened] {
      align-items: center;
      display: flex;
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
    }
  }
</style>
