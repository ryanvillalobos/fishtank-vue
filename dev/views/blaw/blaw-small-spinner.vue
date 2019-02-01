<template>
  <div>
    <div style="height: 100px; width: 200px; position: relative;">
      <div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; opacity: 0.5; background-color: lightgray;" />
      <div style="position: absolute; left: 50%; top: 50%;">
        <small-spinner :color="FishtankColors.colorBlawBlue" style="margin-top: -50%; margin-left: -50%;"/>
      </div>
    </div>
  </div>
</template>
<script>
import SmallSpinner from '@/components/blaw/SmallSpinner.vue'
import * as FishtankColors from '@fishtank/colors/dist/index.common.js'
export default {
  components:{
    SmallSpinner,
  },
  data(){
    return {
      FishtankColors:FishtankColors
    }
  }
}
</script>
