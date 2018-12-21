
<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
        <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
                <b-input-group>
                    <b-form-input v-model="filter" placeholder="Type to Search" />
                    <b-input-group-append>
                        <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort" class="mb-0">
            <b-input-group>
                <b-form-select v-model="sortBy" :options="sortOptions">
                <option slot="first" :value="null">-- none --</option>
                </b-form-select>
                <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
                </b-form-select>
            </b-input-group>
            </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort direction" class="mb-0">
            <b-input-group>
                <b-form-select v-model="sortDirection" slot="append">
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
                <option value="last">Last</option>
                </b-form-select>
            </b-input-group>
            </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
            <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
        </b-col>
        </b-row>
        <b-table striped hover
            stacked="md"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :current-page="currentPage"
            :per-page="perPage"
            :items="items" 
            :fields="fields"
            :filter="filter"
            :sort-direction="sortDirection"
            @filtered="onFiltered">
            <template slot="detail" slot-scope="row">
                <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                <!-- In some circumstances you may need to use @click.native.stop instead -->
                <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                <b-form-checkbox @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing">
                    Details via check
                </b-form-checkbox>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Date de début:</b></b-col>
                        <b-col>{{ row.item.begindate }}</b-col>
                        <b-col sm="3" class="text-sm-right"><b>Date de fin:</b></b-col>
                        <b-col>{{ row.item.enddate }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Durée:</b></b-col>
                        <b-col>{{ row.item.duration }}</b-col>
                        <b-col sm="3" class="text-sm-right"><b>Opérateur:</b></b-col>
                        <b-col>{{ row.item.origine }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Impact:</b></b-col>
                        <b-col>{{ row.item.impact }}</b-col>
                        <b-col sm="3" class="text-sm-right"><b>Type:</b></b-col>
                        <b-col>{{ row.item.type }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Erreur:</b></b-col>
                        <b-col>{{ row.item.error }}</b-col>
                        <b-col sm="3" class="text-sm-right"><b>Code de retour:</b></b-col>
                        <b-col>{{ row.item.response }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                        <b-col>{{ row.item.description }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>URL:</b></b-col>
                        <b-col>{{ row.item.url }}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Liste des équipements :</b></b-col>
                        <b-col>
                            <template v-for="device in row.item.devicelist">{{ device.entry }}, </template>
                        </b-col>
                    </b-row>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
            </template>
            <b-row>
                <b-col md="6" class="my-1">
                    <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
            </b-row>
        </b-table>
        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import displayTp from '../components/tp.vue'
    export default {
        name: 'displayHistory',
        props: {
            history: {
                required: true,
            }
        },
        components: {
            displayTp
        },data: () => ({
            sortBy: 'Date',
            sortDesc: true,
            currentPage: 1,
            perPage: 5,
            totalRows: 0,
            pageOptions: [ 5, 10, 15 ],
            sortDirection: 'asc',
            filter: null,
            modalInfo: { title: '', content: '' },
            fields: [
                {
                    key: 'ID',
                    sortable: true,
                    label: 'ID',
                },
                {
                    key: 'Date',
                    sortable: true,
                    label: 'Date',
                },
                {
                    key: 'File',
                    label: 'File name',
                    sortable: true,
                },
                {
                    key: 'tp',
                    label: 'TP name',
                    sortable: true,
                    
                },
                {
                    key: 'detail',
                    label: 'Show detail',
                }
            ],
            items:[]
        }),watch: {
            history () {
                this.formatData();
            }
        },computed: {
            sortOptions () {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => { return { text: f.label, value: f.key } })
            }
        },methods:{
            resetModal () {
                this.modalInfo.title = ''
                this.modalInfo.content = ''
            },
            onFiltered (filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },info (item, index, button) {
                this.modalInfo.title = `Row index: ${index}`
                this.modalInfo.content = JSON.stringify(item, null, 2)
                this.$root.$emit('bv::show::modal', 'modalInfo', button)
            },formatData () {
                this.history.forEach(request => {
                    request.files.forEach(file => {
                        file.result.forEach(tp => {
                            this.items.push({ 
                                begindate: tp.begindate,
                                enddate: tp.enddate,
                                duration: tp.duration,
                                description: tp.description,
                                origine: tp.origine,
                                type: tp.type,
                                impact: tp.impact,
                                url: tp.url,
                                error: tp.error,
                                response: tp.response,
                                devicelist : tp.devices_list,
                                ID: request._id + file.id + tp.id,
                                Date: file.date,
                                File: file.name,
                                tp: tp.name
                            });
                        })
                    });
                });
                this.totalRows=this.items.lenght
            }
        }
    }
</script>