<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { FishTankDatePicker } from '@/index'

    @Component({
        components: {
            FishTankDatePicker
        }
    })

    export default class DatePicker extends Vue {

    }

</script>

<template>
    <div class="pad">
        
        <fish-tank-date-picker>
            
        </fish-tank-date-picker>
    </div>
</template>

<style lang="scss">
    .pad {
        padding:25px
    }
</style>
