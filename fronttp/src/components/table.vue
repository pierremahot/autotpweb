
<template>
    <b-table striped hover :items="formatedData.items" :fields="formatedData.fields">
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
                        <template v-for="device in row.item.devicelist">{{ device.entry }},</template>
                    </b-col>
                </b-row>
                <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
            </b-card>
        </template>
    </b-table>
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
            formatedData: {
                fields: [
                    {
                        key: 'ID',
                        sortable: true
                    },
                    {
                        key: 'Date',
                        sortable: true
                    },
                    {
                        key: 'File',
                        label: 'File name',
                        sortable: true,
                    },
                    {
                        key: 'tp',
                        sortable: false,
                        
                    },
                    {
                        key: 'detail',
                        label: 'Show detail',
                    }
                ],
                items:[]
            }
        }),watch: {
            history () {
                this.formatData();
            }
        },methods:{
            formatData () {
                this.history.forEach(request => {
                    request.files.forEach(file => {
                        file.result.forEach(tp => {
                            this.formatedData.items.push({ 
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
                                File: file.name
                            });
                        })
                    });
                });
            }
        }
    }
</script>