<template>
    <div>
        <modal name="user-modal"
                transition="nice-modal-fade"
                :delay="100"
                :pivot-y="0.3"
                :pivot-x="0.5"
                :resizable="true"
                :scrollable="true"
                :clickToClose="true"
                :height="'auto'"
                :width="500"
                @before-open="beforeOpen">
            <h2>{{title}}</h2>
            <user-modal-content
                :user="editUser"
                @createdUser="onCreateUser"
                @updatedUser="onUpdateUser"
            >
            </user-modal-content>
        </modal>
    </div>
</template>

<script>
    import UserModalContent from './content/UserModalContent.vue';

    export default {
        data() {
            return {
                editUser: null,
                title: ''
            }
        },
        components: {
            UserModalContent
        },
        methods: {
            beforeOpen(event) {
                this.title = event.params.title;
                this.editUser = event.params.user;
            },

            onCreateUser(user) {
                this.$emit('createdUser', user)
            },

            onUpdateUser(user) {
                this.$emit('updatedUser', user);
            }
        },
    }
</script>

<style scoped>
    h2 {
        padding: 30px 30px 0;
    }
</style>