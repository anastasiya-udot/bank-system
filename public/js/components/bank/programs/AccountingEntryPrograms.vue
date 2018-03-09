<template>
    <div>
    <h5 style="padding-left: 10px">{{title}}</h5>
    <b-card>
        <b-table 
            :striped="tableOptions.striped"
            :bordered="tableOptions.bordered"
            :outlined="tableOptions.outlined"
            :small="tableOptions.small"
            :hover="tableOptions.hover"
            :dark="tableOptions.dark"
            :fixed="tableOptions.fixed"
            :foot-clone="tableOptions.footClone"
            :fields="programFields"
            :items="programs">
            <template slot="actions" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-card>
                    <b-list-group>
                        <b-list-group-item v-for="(value, key) in row.item" :key="key" v-if="showDetails(key)">
                            <b>{{getDetailsName(key)}}</b>: {{getDetailsValue(key, value)}}
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </template>
        </b-table>
    </b-card>
    </div>
</template>

<script>
    export default {
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

                programs: [],
                programSchema: {}
            }
        },
        computed: {
            programFields() {
                let keys = Object.keys(this.programSchema);
                let items = keys.map((key) => {
                    let item = this.programSchema[key];

                    return {
                        key: key,
                        formatter: item.formatter
                    };
                });

                items.push({
                    key: 'actions',
                    label: 'Actions'
                });

                return items;
            }
        },
        methods: {
            showDetails(key) {
                return this.programSchema[key];
            },

            getDetailsName(key) {
                let item = this.programSchema[key];

                if (!item) { 
                    return '';
                }

                return _.startCase(key);
            },

            getDetailsValue(key, value) {
                let item = this.programSchema[key];

                if (!item) { 
                    return '';
                }

                if (item.formatter) {
                    value = item.formatter(value);
                }

                return value
            }
        },
    }
</script>