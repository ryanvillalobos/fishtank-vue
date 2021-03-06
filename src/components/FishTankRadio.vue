<template>

  <div 
    :class="['radio']">
    <label 
      :for="(id !==null? id: `radio-${identifier}-label`)"
      :class="['label']">
      <input 
        :disabled="disabled" 
        :id="(id !==null? id: `radio-${identifier}-input`)"  
        :value="value" 
        :tabindex='(shouldBeChecked ? "0" :"-1")'
        :checked ="shouldBeChecked" 
        :class="['input', 'a11yInput']" 
        type="radio"
        ref="input"
        :name="name" 
        v-on="listeners">
      <div 
        :class="['icon', 'a11yIcon', {'is-checked':shouldBeChecked}]"/>
      <template v-if="$slots.default">
        <div :class="['labelContent']">
          <slot />
        </div>
      </template>
      <div v-else
        :class="['labelContent']">
        {{ label }}
      </div>
    </label>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Inject } from 'vue-property-decorator'
import { a11y } from "../util/mixins"
interface RadioComponentGroup {
  register(cmp:any):void,
  unregister(cmp:any):void
}

@Component({
  mixins: [
    a11y
  ]
})
export default class FishTankRadio extends Vue {
  introduction: "Radio Input Element"
  description: "Radio Input Element"

  @Model('change',{type:[String,Boolean,Object,Number], default: "", required:true}) modelValue:string
  
  /**
   * Radio Value
   */
  @Prop({
    type:[String,Boolean,Object,Number], 
    default:null,
    required:true
  })
  value:string
  
  /**
   * Radio is disabled
   */
  @Prop({
    type:Boolean,
    default:null,
    required:false
  })
  disabled:boolean
   
  /**
   * Radio label
   */
  @Prop({
    type:String,
    default:null,
    required:true,
  })
  label:string

  /**
   * Radio ID
   */
  @Prop({
    type:String,
    default:null,
    required:false
  })
  id:string

  /**
   * Radio name
   */
  @Prop({
    type:String,
    default:"",
    required:false
  })
  name:string

  // @Prop({
  //   type: Object as () => RadioComponentGroup,
  // })
  // fishtankRadioGroupShared:RadioComponentGroup

  // Data
  identifier =  (Math.random() * 10000).toFixed(0).toString()

  @Inject({default: {register(){}, unregister(){}}}) fishtankRadioGroupShared:RadioComponentGroup
  
  // Lifecycle methods
  mounted(){
    this.fishtankRadioGroupShared.register(this)
  }

  destroyed(){
    this.fishtankRadioGroupShared.unregister(this)
  }

  // Computed Methods
  get shouldBeChecked():Boolean{
    return this.value === this.modelValue
  }
    get listeners(): Record<string, Function | Function[]> {
    return {
      ...this.$listeners,
      change: ($event: MouseEvent) => {
        if (this.disabled) return 
        this.$emit("change", this.value)
      }
    }
  }

  // Component methods
  setFocus(){
    (this.$refs.input as HTMLFormElement).focus()
  }
}
</script>
<style lang="scss">
  @import '../styles/mixins';
  body.user-is-tabbing .a11yInput:focus {
    & + .a11yIcon{
      box-shadow: 0 0 0 2px $color-selected;
    }
  }
</style>

<style scoped lang="scss">
  @import '../styles/mixins';
/* fix box sizing bug*/
  .radio{
    font-family: $font-primary;
    position: relative;
    padding-left: $baseline*9;
    padding-top: 6px;
    padding-bottom: 6px;

    .input{
      opacity: 0;
      margin: 0;
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: pointer;
      &:disabled {
        cursor: default;
      }
    }
    .icon{
      transition: all 0.3s ease;
      display:inline-block;
      width:12px;
      height:12px;
      background-color: transparent;
      content:"";
      border: 2px solid $color-gray;
      border-radius:50%;
      position: absolute;
      left: 4px;
      top: 8px;
    }
    .icon{
      &:after{
        content:"";
        width: 6px;
        height: 6px;
        background-color: $color-selected;
        border:1px solid $color-selected;
        border-radius: 50%;
        display: inline-block;
        top: 2px;
        left: 2px;
        position: absolute;
        transform: scale(0.0);
        transition: transform .3s cubic-bezier(.5,.1,.3,1.5);
      }
    }
    .icon.is-checked{
      &:after{
        transform: scale(1.0);
      }
    }
    .input:hover + .icon{
      &:after{
        background-color: $color-selected-darker;
        border:1px solid $color-selected-darker;
      }
    }
    .label{
      color: $color-gray-dark;
      font-size: $fontsize-base-md;
      line-height: $lineheight-base-md;
      letter-spacing: $letterspacing-base-md;
      font-weight:$fontweight-regular;
      &:hover{
        color:$color-black;
      }
    }
    .input:hover {
      & + .ft-icon{
        border:2px solid $color-black;
      }
    }
    .input:disabled + .icon{
      border:2px solid $color-disabled;
    }
    .input:disabled + .icon.is-checked{
      border:2px solid $color-disabled;
      &:after {
        background-color: $color-disabled;
        border:1px solid $color-disabled;
      }
    }
    .input:disabled ~ .labelContent{
      color:$color-disabled;
    }
  }
  

</style>



