<template>
  <div class="navigation-menu-example">
    <!-- Simple Example -->
    <NavigationMenu
      :children='children'
      icon='congress_32'
      path='/path'
      selected
      target='_blank'
      title='Simple'
    />

    <!-- Example with slots -->
    <NavigationMenu :children='[{ slot: "child_slot", children: [{ slot: "grandchild_slot" }] }]'>
      <!-- Example title slot -->
      <template slot='title'>
        <span>Title Slot</span>
        <!-- <svgicon name='chevron-sml-down_24' /> -->
        <ChevronSmlDown24 />
      </template>

      <!-- Example child slot -->
      <template slot='child_slot'>
        <div style='color: red; text-align: center; padding: 8px;'>Custom slot child</div>
      </template>

      <!-- Example grandchild slot -->
      <template slot='grandchild_slot'>
        <div style='color: green; text-align: center; padding: 8px;'>Custom slot grandchild</div>
      </template>
    </NavigationMenu>
  </div>
</template>
<script>
import NavigationMenu from '@/components/blaw/NavigationMenu.vue'
import {
  ChevronSmlDown24
} from '@fishtank/icons-vue'
export default {
  components:{
    NavigationMenu,
    ChevronSmlDown24
  },
  data: () => {
    return {
      children: [{
        icon: 'youtube_32',
        path: '/path',
        title: 'Child 1',
        children: [{
          icon: 'youtube_32',
          title: 'Grandchild 2',
          path: '/path',
        },{
          icon: 'youtube_32',
          locked: true,
          title: 'Grandchild 3'
        }]
      },{
        title: 'Child 2',
        locked: true,
        children: [{
          icon: 'youtube_32',
          title: 'Grandchild 2-1',
          path: '/path',
          hidden: true
        },{
          icon: 'youtube_32', 
          title: 'Grandchild 2-2',
          locked: true,
        },{
          icon: 'youtube_32', 
          title: 'Grandchild 2-3',
          disabled: true,  
        },{
          icon: 'youtube_32',      
          title: 'Grandchild with a very long name',
          path: '/path',     
        }]
      },{
        title: 'Child 3'
      }]
    };
  }
}
</script>
<style scoped>
.navigation-menu-example {
  display: flex;
  align-items: center;
}
</style>