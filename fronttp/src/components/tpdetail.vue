
<template>
    <ul>
        <li v-for="request in this.history" :key=request._id>
            requete : {{ request._id }}
            <ul v-for="file in request.files" :key=file.id>
                    <li>Date de saisie : {{ file.date }}</li>
                    <li>ID : {{ file.id }} </li>
                    <li>Nom du fichier : {{file.name}}</li>
                    <li>Status : {{ file.status }} <font-awesome-icon v-if="file.error=='0'" class="ok" icon="check-circle" /><font-awesome-icon v-else class="warn" icon="exclamation-circle" /></li>
                    <li>TP résultant :</li>
                    <ul v-for="tp in file.result" :key=tp.id>
                        <li>
                            <a :href="tp.url">{{ tp.name }}</a>
                            <font-awesome-icon v-if="tp.error == 0" class="ok" icon="check-circle" />
                            <font-awesome-icon v-else class="warn" icon="exclamation-circle" />
                            <b-btn v-b-toggle="request._id + file.id + tp.id" variant="primary" class="btn-sm btn-outline-info">detail</b-btn>
                            <b-collapse :id="request._id + file.id + tp.id" class="mt-2">
                                <b-card>
                                    <ul>date de début : {{ tp.begindate }}</ul>
                                    <ul>date de fin : {{ tp.enddate }}</ul>
                                    <ul>durée : {{ tp.duration }}</ul>
                                    <ul>description : {{ tp.description }}</ul>
                                    <ul>opérateur : {{ tp.origine }}</ul>
                                    <ul>type : {{ tp.type }}</ul>
                                    <ul>impact : {{ tp.impact }}</ul>
                                    <ul>url : {{ tp.url }}</ul>
                                    <ul>error : {{ tp.error }}</ul>
                                    <ul>code de retour : {{ tp.response }}</ul>
                                    <ul>
                                        <b-btn v-b-toggle="'inner' + request._id + file.id + tp.id" class="btn-sm btn-outline-info">Liste des équipements</b-btn>
                                        <b-collapse :id="'inner' + request._id + file.id + tp.id" size="sm">
                                            <b-card>
                                                <ul v-for="device in tp.devices_list" :key=device.entry >{{device.entry}}</ul>
                                            </b-card>
                                        </b-collapse>
                                    </ul>
                                </b-card>
                            </b-collapse>
                        </li>
                    </ul>
            </ul>    
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'tpdetail',
        props: ['history']
    }
</script>