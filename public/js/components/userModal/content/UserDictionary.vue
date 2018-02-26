<template>
    <div>
        <b-form-group
                    :id="field.formGroup"
                    :label="field.name"
                    :label-for="field.name">
            <b-form-select
                        :id="field.name"
                        :options="prepareCollection(field.dictionaryType)"
                        v-model="field.value">
            </b-form-select>
        </b-form-group>
    </div>
</template>

<script>
    import constants from '../../../../../common/constants';

    export default {
        props: ['item'],
        data() {
            return {
                field: this.item,
                collections: constants.COLLECTIONS,
            }
        },
        methods: {
            prepareCollection(name) {
                let collection = _.values(this.collections).find(collection => collection.NAME === name);

                return collection.ITEMS.map(item => {
                    return {
                        text: item,
                        value: item
                    };
                });
            }
        }
    }
</script>

<style scoped>

</style>