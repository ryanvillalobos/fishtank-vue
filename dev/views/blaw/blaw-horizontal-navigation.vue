<template>
  <div>
    <HorizontalNavigation :children="[{ path: '/#horizontalnavigation', title: 'Item 1' }, { path: '/somepath', title: 'Item 2' }]">
      <template slot="logo">
        Logo Slot
      </template>
    </HorizontalNavigation>
  </div>
</template>
<script>
import HorizontalNavigation from '@/components/blaw/HorizontalNavigation.vue'
export default {
  components:{
    HorizontalNavigation
  }
}
</script>

