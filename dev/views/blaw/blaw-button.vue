<template>
  <div>
    <Button @click="_handleClick">Click me</Button>
    <Button role="cancel">Cancel</Button>
    <Button role="danger">Danger</Button>
    <Button role="success">Success</Button>
    <Button role="warning">Warning</Button>
    <Button disabled role="success">Disabled Success</Button>
  </div>
</template>
<script>
import Button from '@/components/blaw/Button.vue'
export default {
  components:{
    Button
  },
  methods: {
    _handleClick () { console.log('Clicked') }
  }
}
</script>
