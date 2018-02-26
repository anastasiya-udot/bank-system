<template>
    <div>
        <b-form-checkbox :id="field.groupName"
                     v-model="field.value"
                     value="true"
                     unchecked-value="false">
        {{field.name}}
        </b-form-checkbox>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                field: this.item
            }
        }
    }
</script>

<style scoped lang="scss">
    .custom-checkbox {
        margin-bottom: 10px;
    }
</style>