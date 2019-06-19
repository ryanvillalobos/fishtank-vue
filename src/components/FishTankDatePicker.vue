<template>
    <div>
        <h1>This is a Date Picker</h1>
        <br>
        <v-date-picker
            mode='single'
            v-model='selectedDate'
            :popover="{ placement: 'bottom', visibility: 'click' }"
        >
            <template slot-scope='props' class="input">
                <!-- {{ props}} -->
                <ft
                    type="text"
                    label="Pick The Date Please"
                    placeholder="MM/DD/YYYY"
                    :value="props.inputValue"
                    @input="'props.updateValue($event.target.value)'">
                <!-- <calendar 
                    slot="leftIcon"
                /> -->
                </ft>
            </template>
        </v-date-picker>
    </div>
</template>

<script lang="ts">
    import { FishTankTextInputV2 } from '@/index';
    import { Calendar24 } from '@fishtank/icons-vue';
    import { Component, Prop, Vue } from "vue-property-decorator";
    import VCalendar  from 'v-calendar'
    Vue.use(VCalendar)

    @Component({
        components: {
            ft:FishTankTextInputV2,
            calendar: Calendar24,
            VCalendar
        }
    }) 

    export default class FishTankDatePicker extends Vue {
        //data
        selectedDate = new Date()
        text = ""
        //computed values 
        get dateToString () {
            return String(this.selectedDate.getMonth()+1) + "/" + String(this.selectedDate.getDate()) +"/"+ String(this.selectedDate.getFullYear())
        }
    }

</script>

<style lang="scss">
    .input {
        width:200px;
    }
</style>
