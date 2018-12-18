<template>
 
    <div>
        <a :href="tp.url">{{ tp.name }}</a>
        <font-awesome-icon v-if="tp.error == 0" class="ok" icon="check-circle" />
        <font-awesome-icon v-else class="warn" icon="exclamation-circle" />
        <b-btn v-b-toggle="requestId + fileId + tp.id" variant="primary" class="btn-sm btn-outline-info">detail</b-btn>
        <b-collapse :id="requestId + fileId + tp.id" class="mt-2">
            <b-card class="bg-dark">
                <ul class="list-group bmd-list-group-sm list-group-flush">
                    <li class="list-group-item bg-dark">date de début : {{ tp.begindate }}</li>
                    <li class="list-group-item bg-dark">date de fin : {{ tp.enddate }}</li>
                    <li class="list-group-item bg-dark">durée : {{ tp.duration }}</li>
                    <li class="list-group-item bg-dark">description : {{ tp.description }}</li>
                    <li class="list-group-item bg-dark">opérateur : {{ tp.origine }}</li>
                    <li class="list-group-item bg-dark">type : {{ tp.type }}</li>
                    <li class="list-group-item bg-dark">impact : {{ tp.impact }}</li>
                    <li class="list-group-item bg-dark">url : {{ tp.url }}</li>
                    <li class="list-group-item bg-dark">error : {{ tp.error }}</li>
                    <li class="list-group-item bg-dark">code de retour : {{ tp.response }}</li>
                    <li class="list-group-item bg-dark">
                        <b-btn v-b-toggle="'inner' + requestId + fileId + tp.id" class="btn-sm btn-outline-info">Liste des équipements</b-btn>
                        <b-collapse :id="'inner' + requestId + fileId + tp.id" size="sm">
                            <b-card class="bg-dark">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item bg-dark" v-for="device in tp.devices_list" :key=device.entry >{{device.entry}}</li>
                                </ul>
                            </b-card>
                        </b-collapse>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
    export default {
        name: 'displayTp',
        props: ['tp','requestId','fileId']
    }
</script>