<script lang="ts">
import FishTankText from './FishTankText.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CloseSml24 } from '@fishtank/icons-vue'
import  FishTankBox   from './FishTankBox.vue'


@Component({
    components:{
        badgeText:FishTankText,
        close:CloseSml24,
        box:FishTankBox
    }
})

export default class FishTankBadge extends Vue {
    /**
     * Boolean determining if the badge is removable.
     */
    @Prop({default:false})
    removable:boolean;

    /**
     * String representing both the shade of text, and the remove icon if applicable.
     * Available shades `light, dark, disabled`
     */
    @Prop({default:'light'})
    textShade:String
    availableShades:["light","dark","disabled"]
    
    /**
     * String representing the background color of the tag. 
     * 
     * Available themes `bgov, btax, notification-1, notification-2, notification-2, disabled, neutral` 
     */
    @Prop({default:'notification-1'})
    theme:String;
    availableThemes:["theme","bgov", "btax", "notification-1", "notification-2", "notification-3","disabled","neutral"]

    get themeClass() {
        switch(this.theme) {
            case "bgov":
                return "badge-theme--grad-bgov-bluepurple"
            case "btax":
                return "badge-theme--grad-btax-blue"              
            case "disabled":
                return "badge-theme--color-disabled"
            case "notification-2":
                return "badge-theme--color-notification-2"
            case "notification-3":
                return "badge-theme--color-notification-3"
            case "neutral":
                return "badge-theme--color-neutral"
            default:
                return "badge-theme--color-notification-1"
        }
    }

    get iconClass() {
        switch(this.textShade) {
            case "dark":
                return "remove-dark"
            case "disabled":
                return "remove-disabled"
            default:
                return "remove-light"
        }
    }

    get textClass() {
        switch(this.textShade) {
            case "dark":
                return "black"
            case "disabled":
                return "grayLight"
            default:
                return "white"
        }
    }

    get badgePaddingClass() {
        return this.removable ? "badge-padding--removable" : "badge-padding--text"
    }
    get interactive() {
        return this.removable ? "a--interactive" : "a--static"
    }

    get listeners(): Record<string, Function | Function[]> {
      return {
        ...this.$listeners,
        click: ($event: MouseEvent) => {
          if (this.removable) { 
              /**
              * Emits a click event when a tag is clicked and removable is true.
              * 
              * @event MouseEvent
              */
              return this.$emit("click", $event);
          }
        }
      }
    }
}
</script>

<template>
    <a 
        href ="javascript:;" 
        :class="interactive" 
        v-on="listeners"
        :removableBadge = "removable">
        <div 
            class="badge" 
            :class= "[themeClass, badgePaddingClass]">
            <box
                display="flex"
                type="section"
                justify-content="between"
                align-items="center">
                <badge-text
                    :color="textClass"
                    :shade="textShade"
                    :theme="theme"
                    size="baseSm"
                    semi-bold>
                    <!-- @slot Use this slot to pass in tag text -->
                    <slot />
                </badge-text>
                <close v-if="removable" :class="iconClass" />
            </box>
        </div>
    </a>
</template>

<style lang="scss" scoped>
    @import '../styles/mixins';
    @import '../../node_modules/@fishtank/colors/dist/css-variable-stylesheet-text';
    @import '../../node_modules/@fishtank/type/dist/css-variable-stylesheet';
    @import "../../node_modules/@fishtank/type/dist/index.custom-properties";
    @import "../../node_modules/@fishtank/space/dist/index.custom-properties";

    // badge styes
    .badge {
        margin:0px;
        position:relative;
        display: inline-block;
        border-radius: 6px;
        vertical-align: middle;
    }

    .badge {
        &.badge-padding--removable {
            padding: 0px 1px 0px calc(var(--baseline)*2);
        }
    }

    .badge {
        &.badge-padding--text {
            padding: 4px calc(var(--baseline)*2) 4px calc(var(--baseline)*2);
        }
    }

    .badge{
        &.badge-theme--grad-bgov-bluepurple {
            background: linear-gradient(to right,  $color-bgov-navy , $color-bgov-purple)
        }
    }

    .badge{
        &.badge-theme--grad-btax-blue {
            background: linear-gradient(to right,  $color-bna-blue ,  $color-btax-blue)
        }
    }

    .badge{
        &.badge-theme--color-notification-1 {
            background: var(--badge-background-color, $color-notification-1);
        }
    }

    .badge{
        &.badge-theme--color-notification-2 {
            background: var(--badge-background-color, $color-notification-2);
        }
    }

    .badge{
        &.badge-theme--color-notification-3 {
            background: var(--badge-background-color, $color-notification-3);
        }
    }

    .badge{
        &.badge-theme--color-notification-3 {
            background: var(--badge-background-color, $color-notification-3);
        }
    }

    .badge{
        &.badge-theme--color-disabled {
            background: var(--badge-background-color, $color-disabled);
        }
    }

    .badge{
        &.badge-theme--color-neutral {
            background: var(--badge-background-color, $color-white);
            border: 1px solid var(--badge-background-color, $color-disabled);
        }
    }

    // remove icon (x) styles
    .remove-light{
        margin-left:5px;
        fill:var(--remove-icon-color , $color-white)
    }

    .remove-dark{
        margin-left:5px;
        fill:var(--remove-icon-color , $color-black)
    }

    .remove-disabled{
        margin-left:5px;
        fill:var(--remove-icon-color , $color-gray-light)
    }

    //removing anchor base properties
    a {
        color: inherit;
        text-decoration: none;
    }

    a {
        &.a--interactive:hover {
            color:inherit; 
            text-decoration:none; 
            opacity: 0.8;
            cursor:pointer;
        }
    }

    a {
        &.a--static:hover {
            color:inherit; 
            text-decoration:none; 
            cursor:default;
        }
    }

</style>