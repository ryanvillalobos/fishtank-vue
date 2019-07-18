<template>
  <div>
    <autocomplete
      id="autocomplete_example"
      :items="items"
      v-model="selected"
      label="Autocomplete Label"
      orientation="ltr"
      url="/some_autocomplete_endpoint" />
    <div v-if="selected">
      <span>label: {{selected.label}}, </span>
      <span>value: {{selected.value}}</span>
    </div>
  </div>
</template>
<script>
const moxios = require('moxios')
import { FishTankLookup } from '@/index'
export default {
  components:{
    autocomplete:FishTankLookup
  },
  data () {
    return {
      selected: null,
      items: [
        { label: "Some item 1", value: "some-item-1" },
        { label: "Some item 2", value: "some-item-2" },
        { label: "Some item 3", value: "some-item-3" },
        { label: "Some item 4", value: "some-item-4" },
        { label: "Some item 5", value: "some-item-5" }
      ]
    }
  },
}
</script>