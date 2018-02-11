<template>
    <div>
        <b-btn
            :size="'lg'"
            :variant="'secondary'"
            @click="onCreateUserClicked"
            v-b-modal.create-user-modal>
            Create new user
        </b-btn>
        <b-modal
            ref="createUserModal"
            id="create-user-modal"
            title="Create new user"
            :hide-footer="true"
            :lazy="true">
            <b-form>
                <user-input
                    v-for="field in stringFields"
                    :key="field.name"
                    @validStateChanged="updateCommonValidState"
                    :item="field">
                </user-input>
                <user-dictionary
                    v-for="field in dictionaryFields"
                    :key="field.name"
                    v-bind:item="field">
                </user-dictionary>
                <b-button
                    :disabled="!valid || disabled"
                    @click="onCreateUserClicked"
                    type="submit"
                    variant="secondary">
                    Submit
                </b-button>
                <label class="invalid-feedback">{{requiestErrorMessage}}</label>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import _ from 'lodash';
    import constants from '../../../../common/constants';
    import UserInput from './UserInput.vue';
    import UserDictionary from './UserDictionary.vue';

    export default {
        props: ['userSchema', 'postNewUser'],
        components: {
            'user-input': UserInput,
            'user-dictionary': UserDictionary
        },
        data() {
            return {
                inputTypes: constants.USER_SCHEMA_TYPES,
                stringFields: [],
                dictionaryFields: [],
                valid: false,
                disabled: false,
                requiestErrorMessage: ''
            };
        },
        created() {
            let fields = this.getFormFields();

            this.stringFields = this.getStringFields(fields);
            this.dictionaryFields = this.getDictionaryFields(fields);
        },
        methods: {
            onCreateUserClicked() {
            },

            getStringFields(fields) {
                let _this = this;

                return fields.filter(field => {
                    return field.type === _this.inputTypes.STRING;
                });
            },

            getDictionaryFields(fields) {
                let _this = this;
                
                return fields.filter(field => {
                    return field.type === _this.inputTypes.DICTIONARY;
                });
            },

            getFormFields() {
                let keys = _.keys(this.userSchema);

                return keys.map((key) => {
                    let startCase = _.startCase(key);
                    let item = this.userSchema[key];

                    return _.extend(item, {
                        name: startCase,
                        formGroup: `${key}-group`,
                        value: item.default || '',
                        valid: true
                    });
                });
            },
            
            updateCommonValidState() {
                this.valid = _.every(this.stringFields, field => {
                    return field.valid;
                });
            },

            clear() {
                
            },

            onCreateUserClicked() {
                let userData = {};

                this.stringFields.forEach(field => {
                    userData[field.name] = field.value;
                });

                this.disabled = true;

                this.postNewUser.then(response => {
                    this.$refs.createUserModal.hide()
                }, err => {
                    this.requiestErrorMessage = err.message;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .invalid-feedback {
        display: block;
    }
</style>