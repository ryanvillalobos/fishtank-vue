<template>
  <div>
    <Accordion name="accordion" v-bind:open="state" v-on:click="state=!state">
      <div slot="title">
        <div>
          Title Content
        </div>
      </div>
      <div>Accordion Content</div>
      <div>More accordion content</div>
    </Accordion>
  </div>
</template>
<script>
import Accordion from '@/components/blaw/Accordion.vue'
export default {
  components:{
    Accordion
  },
  data () {
    return {
      state: true
    }
  }
}
</script>
<style>
  [name="accordion"] {
    width: 350px;
  }
</style>