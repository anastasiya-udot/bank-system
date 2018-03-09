<template>
    <div>
        <b-form-group
                :id="field.formGroup"
                :label="field.name"
                :label-for="field.name"
                :required="field.required">
            <date-picker
                :placeholder="field.value.toString()"
                :value="field.value"
                :input-class="'form-control'">
            </date-picker>
        </b-form-group>
    </div>
</template>

<script>
    import DatePicker from 'vuejs-datepicker';
    
    export default {
        props: ['item'],
        data() {
            return {
                field: this.item,
            }
        },
        components: {
           'date-picker': DatePicker
        }
    }
</script>

<style scoped lang="scss">
    .date-input {
        border-color: #495057;
        width: 100%;
    }
</style>