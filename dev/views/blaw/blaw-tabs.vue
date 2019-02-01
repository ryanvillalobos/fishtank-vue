<template>
  <Tabs :active="active" :items="items" @change="active=$event">
    <div slot="tab1">Tab content 1</div>
    <div slot="tab2">Tab content 2</div>
    <div slot="tab2-title">Slotted Tab title 1</div>
    <div slot="tab3">Tab content 3</div>
    <div slot="tab4">Tab content 4</div>
  </Tabs>
</template>

<script>
import Tabs from '@/components/blaw/Tabs.vue'
export default {
  components:{
    Tabs
  },
  data () {
    return {
      active: "tab2",
      items: [
        { name: "tab1", label: "Tab 1", icon: "box_32" },
        { name: "tab2", label: "Tab 2" },
        { name: "tab3", label: "Tab 3", disabled: true },
        { name: "tab4", label: "Tab 4", hidden: true },
      ]
    }
  }
}
</script>
