<template>
    <div>
        <b-form :class="'padding-content'">
            <div
                v-for="field in fields"
                :key="field.name">
                <user-input
                    v-if="field.type === inputTypes.STRING || field.type === inputTypes.NUMBER"
                    :checkValidState="shouldCheckValidState"
                    :setNotUnique="setNotUnique"
                    @validationCheck="updateValidationModel"
                    :item="field">
                </user-input>
                <user-date
                    v-if="field.type === inputTypes.DATE"
                    v-bind:item="field">
                </user-date>
                <user-dictionary
                    v-if="field.type === inputTypes.DICTIONARY"
                    v-bind:item="field">
                </user-dictionary>
                <user-checkbox
                    v-if="field.type === inputTypes.BOOLEAN"
                    v-bind:item="field">
                </user-checkbox>
            </div>
            <div class="form-inline">
                <b-button
                    :disabled="shouldCheckValidState || disabled || !valid"
                    @click="onSubmitButtonClicked">
                    {{getButtonName}}
                </b-button>
                <span class="request-fail">{{requestErrorMessage}}</span>
                <span class="request-ok">{{requestSuccessMessage}}</span>
                <div class="spinner">
                    <dot-loader :loading="shouldCheckValidState || disabled" :color="'#6c757d'" :size="'35px'"></dot-loader>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import _ from 'lodash';
    import constants from '../../../../../common/constants';
    import Users from '../../../mixins/Users';
    import UserInput from './UserInput.vue';
    import UserDictionary from './UserDictionary.vue';
    import UserCheckbox from './UserCheckbox.vue';
    import UserDate from './UserDate.vue';
    import DotLoader from 'vue-spinner/src/DotLoader.vue';
    import RandomInput from '../../../mixins/RandomInput';
    import MyCredentials from '../../../mixins/MyCredentials';

    export default {
        props: ['user'],
        components: {
            'user-input': UserInput,
            'user-dictionary': UserDictionary,
            'user-checkbox': UserCheckbox,
            'user-date': UserDate,
            DotLoader
        },
        mixins: [Users, RandomInput],
        data() {
            return {
                fields: [],
    
                inputTypes: constants.USER_SCHEMA_TYPES,
                userSchema: constants.USER_SCHEMA,
                currentUser: this.user,

                valid: true,
                disabled: false,
                requestErrorMessage: '',
                requestSuccessMessage: '',

                setNotUnique: '',
                shouldCheckValidState: false,
 
                validationModel: {},
                checks: []
            };
        },
        created() {
            this.updateFormFields();
        },
        watch: {
            validationModel: {
                handler() {
                    this.valid = _.values(this.validationModel).every(value => value);
                },
                deep: true
            },

            shouldCheckValidState() {
                this.checks = [];
            }
        },
        computed: {
            getButtonName() {
                if (!this.currentUser) {
                    return 'Create user';
                }
                return 'Update user';
            }
        },
        methods: {
            updateValidationModel(attr, valid) {
                this.validationModel[attr] = valid;

                if (this.shouldCheckValidState) {
                    this.checks.push(attr);

                    if (!_.difference(_.keys(this.validationModel), this.checks).length) {
                        this.shouldCheckValidState = false;
                        this.submitAfterFormValidation();
                    }
                }
            },

            updateFormFields() {
                let keys = _.keys(this.userSchema);
    
                this.fields = _.map(keys, key => {
                    let startCase = _.startCase(key);
                    let item = this.userSchema[key];
                    let value;

                    if (this.user) {
                        value = this.user[key];
                    } else if (this.insertMyData) {
                        value = this.insertMyData(key);
                    } else if (item.default !== undefined){
                        value = item.default;
                    } else if (this.generateRandomValue) {
                        value = this.generateRandomValue(item.type, key);
                    } else {
                        value = '';
                    }

                    return _.extend(item, {
                        key: key,
                        name: startCase,
                        formGroup: `${key}-group`,
                        value: value
                   });
                });

                this.fields.filter(field => field.validation)
                    .forEach(field => {
                        this.$set(this.validationModel, field.name, true);
                    });
            },

            onSubmitButtonClicked() {
                this.requestSuccessMessage = '';
                this.requestErrorMessage = '';
                this.setNotUnique = '',
                this.shouldCheckValidState = true;
            },

            submitAfterFormValidation() {
                let data = {};

                if (!this.valid) {
                    return;
                }

                this.disabled = true;
                
                this.fields.forEach((field) => {
                    if (field.type === this.inputTypes.DATE) {
                        data[field.key] = field.value.valueOf();
                    } else {
                        data[field.key] = field.value;
                    }
                }, this);

                if (this.currentUser) {
                    data.id = this.currentUser.id;
                    this.updateUser(this.currentUser, data).then(
                        response => {
                            this.disabled = false;
                            this.requestSuccessMessage = 'User was updated';
                            this.$emit('updatedUser', response.body);
                        },
                        err => {
                            this.disabled = false;
                            this.requestErrorMessage = `Can't update user ${ err.body.message ? ('because ' + err.body.message) : ""}`;
                        
                            if (err.body.attr) {
                                this.setNotUnique = err.body.attr;
                            }
                        }
                    );
                } else {
                    this.createUser(data).then(
                        response => {
                            this.disabled = false;
                            this.requestSuccessMessage = 'User was created';
                            this.$emit('createdUser', response.body);
                        },
                        err => {
                            this.disabled = false;
                            this.requestErrorMessage = `Can't create user ${ err.body.message ? ('because ' + err.body.message) : ""}`;

                            if (err.body.attr) {
                                this.setNotUnique = err.body.attr;
                            }
                        }
                    );

                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .request-fail {
        color: red;
        padding-left: 10px;
    }

    .request-ok {
        color: green;
        padding-left: 10px;
    }

    .padding-content {
        padding: 20px;
    }

    .spinner {
        margin-left: 20px;
    }
</style>