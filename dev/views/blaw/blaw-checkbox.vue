<template>
  <div>
    <Checkbox name="example-1" :checked="example1" title="Checkbox Example" @change="example1=!example1" />
    <Checkbox name="example-2" :checked="example2" @change="example2=!example2">Checkbox slot example</Checkbox>
    <Checkbox name="example-3" :checked="example3" slider @change="example3=!example3">Slider example</Checkbox>
    <Checkbox name="example-4" :checked="example4" slider orientation='rtl' @change="example4=!example4">Slider reversed example</Checkbox>
    <Checkbox name="example-5" :checked="example5" title="Checkbox Disabled Example" disabled orientation='ltr' @change="example5=!example5" />
    <Checkbox name="example-6" :checked="example6" disabled slider @change="example6=!example6">Slider disabled example</Checkbox>
    <div v-if="example1">Example 1 Checked</div>
    <div v-if="example2">Example 2 Checked</div>
    <div v-if="example3">Example 3 Checked</div>
    <div v-if="example4">Example 4 Checked</div>
    <div v-if="example5">Example 5 Checked</div>
    <div v-if="example6">Example 6 Checked</div>
  </div>
</template>
<script>
import Checkbox from '@/components/blaw/Checkbox.vue'
export default {
  components:{
    Checkbox
  },
  data () {
    return {
      example1: true,
      example2: false,
      example3: false,
      example4: true,
      example5: false,
      example6: false
    }
  }
}
</script>
