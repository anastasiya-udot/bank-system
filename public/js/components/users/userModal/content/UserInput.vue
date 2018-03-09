<template>
    <div>
        <b-form-group
                :id="field.formGroup"
                :label="field.name"
                :label-for="field.name"
                :required="field.required">
            <b-form-input
                    :id="field.name"
                    v-model.trim="field.value"
                    @change="updateValidation">
            </b-form-input>
            <div class="invalid-feedback">{{feedback}}</div>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        props: ['item', 'checkValidState', 'setNotUnique'],
        data() {
            return {
                field: this.item,
                feedback: '',
                valid: true
            };
        },
        watch: {
            checkValidState(newValue) {
                if (newValue) {
                    this.updateValidation();
                }
            },

            setNotUnique(attr) {
                if (attr === this.field.key) {
                    this.valid = false;
                    this.feedback = `${this.field.name} should be unique`;
                    this.$emit('validationCheck', this.field.name, this.valid);
                }
            }
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
                this.valid = valid;
                this.$emit('validationCheck', this.field.name, this.valid);
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