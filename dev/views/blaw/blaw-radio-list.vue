<template>
  <div>
    <RadioList name="example" :items="items" :value="value" @change="handleChange">
      <template slot="example-title-slot-3">Item 3 from slot</template>
    </RadioList>
    <div>value={{value}}</div>
  </div>
</template>
<script>
import RadioList from '@/components/blaw/RadioList.vue'
export default {
  components:{
    RadioList
  },
  data () {
    return {
      items: [
        { label: "Item 1", value: "1" },
        { label: "Item 2", value: "2" },
        { label: "Item 3", slot: "example-title-slot-3", value: "3" }
      ],
      value: "1"
    }
  },
  methods: {
    handleChange (e) {
      this.value = e.currentTarget.value
    }
  }
}
</script>
