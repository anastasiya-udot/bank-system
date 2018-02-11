<template>
    <div>
        <div class="control-panel">
            <create-user
                :userSchema="userSchema"
                :postNewUser="postNewUser"
            ></create-user>
        </div>
        <b-table 
            :striped="tableOptions.striped"
            :bordered="tableOptions.bordered"
            :outlined="tableOptions.outlined"
            :small="tableOptions.small"
            :hover="tableOptions.hover"
            :dark="tableOptions.dark"
            :fixed="tableOptions.fixed"
            :foot-clone="tableOptions.footClone"
            :fields="userTableFields"
            :items="users">
        </b-table>
    </div>
</template>

<script>
    import Users from '../mixins/Users';
    import CreateUserModal from './userModal/CreateUserModal.vue';
    import constants from '../../../common/constants';

    export default {
        mixins: [Users],
        components: {
            'create-user': CreateUserModal
        },
        data() {
            return {
                tableOptions: {
                    striped: true,
                    bordered: false,
                    outlined: false,
                    small: true,
                    hover: true,
                    dark: true,
                    fixed: false,
                    footClone: false
                },
                userSchema: constants.USER_SCHEMA
            };
        },
        computed: {
            userTableFields() {
                let keys = Object.keys(this.userSchema);

                return keys.map((key) => {
                    return {
                        key: key,
                        sortable: !!this.userSchema[key].sortable
                    };
                });
            }
        },
        methods: {
            onCreateUserClicked() {
                
            }
        },
    }
</script>

<style scoped lang="scss">
    .control-panel {
        padding: 5px;
        margin: 5px;
        width: 100%;
    }
</style>