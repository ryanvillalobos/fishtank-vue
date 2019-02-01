<template>
  <div>
    <NumberRangeInput title="Example" :value="value" @change="value=$event" />
    <div>Value: {{value}}</div>
  </div>
</template>
<script>
import NumberRangeInput from '@/components/blaw/NumberRangeInput'
export default {
  components:{
    NumberRangeInput
  },
  data () {
    return {
      value: [1, 2]
    }
  }
}
</script>