<template>
  <div>
    <HighlightedText content="Highlight foo in this message. Also ignores case on FOO" term="foo" />
  </div>
</template>
<script>
import HighlightedText from '@/components/blaw/HighlightedText.vue'
export default {
  components:{
    HighlightedText
  }
}
</script>
