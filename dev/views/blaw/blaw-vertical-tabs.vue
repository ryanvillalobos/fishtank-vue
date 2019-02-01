<template>
  <div>
    <vertical-tabs>
      <span slot="header"> Header One </span>
      <ul slot="content" style="margin: 0; padding: 0; list-style: none; background-color: white; min-width: 140px;">
        <li><a href="#">First Link</a></li>
        <li><a href="#">Second Link</a></li>
        <li><a href="#">Link Three</a></li>
        <li><a href="#">Link Four</a></li>
        <li><a href="#">First Link</a></li>
        <li><a href="#">Second Link</a></li>
        <li><a href="#">Link Three</a></li>
        <li><a href="#">Link Four</a></li>
      </ul>
      <span slot="header"> Header Two </span>
      <ul slot="content" style="margin: 0; padding: 0; list-style: none; background-color: white; min-width: 140px;">
        <li><a href="#">Link Four</a></li>
        <li><a href="#">Link Three</a></li>
        <li><a href="#">Second Link</a></li>
        <li><a href="#">First Link</a></li>
      </ul>
      <span slot="header"> Header Three </span>
      <span slot="content"> Content 1 </span>
      <span slot="header"> Header Four </span>
      <span slot="content"> Content 2 </span>
    </vertical-tabs>
  </div>
</template>
<script>
import VerticalTabs from '@/components/blaw/VerticalTabs.vue'
export default {
  components:{
    VerticalTabs
  }
}
</script>
