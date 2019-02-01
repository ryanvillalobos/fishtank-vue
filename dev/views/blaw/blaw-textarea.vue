<template>
  <div>
    <TextArea label="Example" placeholder="Enter text" :value="value" />
  </div>
</template>

<script>
import TextArea from '@/components/blaw/TextArea.vue'
export default {
  data () {
    return {
      value: ""
    }
  }
}
</script>