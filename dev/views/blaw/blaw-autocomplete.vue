<template>
  <div>
    <Autocomplete
      id="autocomplete_example"
      label="Autocomplete Label"
      orientation="ltr"
      url="/some_autocomplete_endpoint" @selected="selected=$event"
    />
    <div v-if="selected">{{selected.label}}</div>
  </div>
</template>
<script>
const moxios = require('moxios')
import Autocomplete from '@/components/blaw/Autocomplete.vue'
export default {
  components:{
    Autocomplete
  },
  data () {
    return {
      selected: false
    }
  },
  created () {
    moxios.install()
    moxios.stubRequest(/\/some_autocomplete_endpoint\?query=.+$/, {
      status: 200,
      response: {
        "data": {
          "items": [
            { label: "Some item 1", value: 1 },
            { label: "Some item 2", value: 2 },
            { label: "Some item 3", value: 3 },
            { label: "Some item 4", value: 4 },
            { label: "Some item 5", value: 5 }
          ]
        }
      }
    })

    // Mock empty request
    moxios.stubRequest(/\/some_autocomplete_endpoint\?query=$/, {
      status: 200,
      response: {
        "data": {
          "items": []
        }
      }
    })
  }
}
</script>