<template>
    <div>
        <b-form-group
                :id="field.formGroup"
                :label="field.name"
                :label-for="field.name"
                :required="field.required">
            <b-form-input
                    :id="field.name"
                    v-model="field.value"
                    v-model.trim="field.value"
                    @change="updateValidation">
            </b-form-input>
            <div class="invalid-feedback">{{feedback}}</div>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                field: this.item,
                feedback: ''
            };
        },
        created() {
            this.updateValidation();
            this.feedback = '';
        },
        methods: {  
            updateValidation() {
                let valid = false;

                if (this.field.required && !this.field.value) {
                    this.feedback = `${this.field.name} is required`;
                } else if (this.field.value && this.field.validation && !this.field.validation(this.field.value)) {
                    this.feedback = `${this.field.name} is invalid`;
                } else {
                    valid = true;
                    this.feedback = '';
                }

                if (valid !== this.field.valid) {
                    this.$emit('validStateChanged');
                    this.field.valid = valid;
                }
                
                //feedback = `${item.name} is invalid`;
                // if (item.unique) {
                //     item.feedback = `${item.name} is invalid`;
                //     return;
                // }
            }
        }
    }
</script>

<style scoped lang="scss">
    .invalid-feedback {
        display: block;
    }

    .form-group[required] {
        input {
            border-color: orange;
        }
    }
</style>