<template>
  <div>
    <dropdown-menu>
      <span slot="header"> Header </span>
      <ul slot="content">
        <li><a href="#">First Link</a></li>
        <li><a href="#">Second Link</a></li>
        <li><a href="#">Link Three</a></li>
        <li><a href="#">Link Four</a></li>
      </ul>
      <span slot="header"> Header </span>
      <span slot="content"> Content </span>
      <span slot="header"> Header </span>
      <span slot="content"> Content </span>
      <span slot="header"> Header </span>
      <span slot="content"> Content </span>
    </dropdown-menu>
  </div>
</template>

<script>
import DropdownMenu from '@/components/blaw/DropdownMenu.vue'
export default {
  components:{
    DropdownMenu
  }
}
</script>