<template>
  <div class="ModalExample">
    <button  @click="modalOpened=true">Open</button>
    <Modal icon="search_32" title="Example Modal Title" :opened="modalOpened" :message="message" @cancel="modalOpened=false" @confirm="modalOpened=false" />
  </div>
</template>

<script>
import Modal from '@/components/blaw/Modal.vue'
export default {
  components:{
    Modal
  },
  data () {
    return {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      modalOpened: false
    }
  }
}
</script>
