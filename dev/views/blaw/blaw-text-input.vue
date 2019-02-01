<template>
  <div>
    <TextInput />
    <TextInput icon="search_24" label="Example" placeholder="Enter text" :value="value1" />
    <TextInput label="Example" orientation="rtl" placeholder="Right to left" :value="value2" />
    <TextInput label="Example" orientation="ltr" placeholder="Left to right" :value="value3" />
  </div>
</template>

<script>
import TextInput from '@/components/blaw/TextInput.vue'
export default {
  components:{
    TextInput
  },
  data () {
    return {
      value1: "",
      value2: "",
      value3: "Predefined"
    }
  }
}
</script>