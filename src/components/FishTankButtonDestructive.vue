<template>
  <fish-tank-base-button 
    v-bind="$attrs"
    class="button--destructive"
    v-on="$listeners">
    <slot />
  </fish-tank-base-button>
</template>

<script lang="ts">
/**
 * FishTankButtonDestructive
 * @deprecated
 * This component is being deprecated in favor of FishTankButton.
 * It will be removed from the library in October 2019.
 * FishTankButton offers a more standard and consistant API, and better code quality.
 * Please begin using FishTankButton to avoid any breaking changes.
 */
import Vue from "vue"
import FishTankBaseButton from "./FishTankBaseButton.vue"

export default Vue.extend({
  name: "FishTankButtonDestructive",
  introduction: "Destructive Button",
  components: {
    FishTankBaseButton
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.warn('FishTankButtonDestructive is being deprecated in favor of FishTankButton. It will be removed from the library in October 2019. Please migrate to FishTankButton.')
  }
})
</script>

<style lang="scss">
  @import '../styles/mixins';
  @import "../../node_modules/@fishtank/colors/dist/index";
  @import "../../node_modules/@fishtank/type/dist/index";

  .button--destructive {
    background-color: $color-error;
    border-color: $color-error-darkest;
    color: $color-white;

    @include button-box-shadow($color-error);

    &:hover {
      background-color: $color-error-lighter;
    }

    &:active {
      background-color: $color-error-darker;
      box-shadow: none;
    }

    &:disabled {
      opacity: 0.4;

      &:hover {
        background-color: $color-error;
      }
    }
  }

</style>

