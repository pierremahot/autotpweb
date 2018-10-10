<template>
    <div>
        <top/>
        <h1> History </h1>
        <button v-on:click="get">update history</button>
        <ul>
            <li v-for="item in result" :key=item.idrequest>
                requete : {{ item.idrequest }}
                <ul v-for="file in item.files" :key=file.id>
                        <li>Date de saisie : {{ file.date }}</li>
                        <li>ID : {{ file.id }} </li>
                        <li>Nom du fichier : {{file.name}}</li>
                        <li>Status : {{ file.status }} <font-awesome-icon v-if="file.error=='0'" class="ok" icon="check-circle" /><font-awesome-icon v-else class="warn" icon="exclamation-circle" /></li>
                        <ul v-for="tp in file.result" :key=tp.id>
                            <li>
                                <a :href="tp.url">{{ tp.name }}</a>
                                <font-awesome-icon v-if="tp.error == 0" class="ok" icon="check-circle" />
                                <font-awesome-icon v-else class="warn" icon="exclamation-circle" />
                                <font-awesome-icon v-if="tp.folded != false" v-on:click="tp.folded=false" icon="caret-right" />
                                <font-awesome-icon v-if="tp.folded == false" v-on:click="tp.folded=true" icon="caret-down" />
                            </li>
                            <ul v-if="tp.folded == false">
                                <li>date de début : {{ tp.begindate }}</li>
                                <li>date de fin : {{ tp.enddate }}</li>
                                <li>durée : {{ tp.duration }}</li>
                                <li>description : {{ tp.description }}</li>
                                <li>opérateur : {{ tp.origine }}</li>
                                <li>type : {{ tp.type }}</li>
                                <li>impact : {{ tp.impact }}</li>
                                <li>url : {{ tp.url }}</li>
                                <li>error : {{ tp.error }}</li>
                                <li>code de retour : {{ tp.response }}</li>
                                <li>liste des équipements et/ou sites :
                                    <font-awesome-icon v-if="tp.devices_list_folded != false" v-on:click="tp.devices_list_folded=false" icon="caret-right" />
                                    <font-awesome-icon v-if="tp.devices_list_folded == false" v-on:click="tp.devices_list_folded=true" icon="caret-down" />
                                </li>
                                <ul v-if="tp.devices_list_folded == false">
                                    <li v-for="device in tp.devices_list" :key=device.entry>
                                        {{device.entry}}
                                    </li>
                                </ul>
                            </ul>
                        </ul>
                </ul>    
            </li>
        </ul>
    </div>
</template>

<script>
    import top from '../components/top.vue'
    export default {
        name: 'myform',
        components: {
            top
        },
        created: function() {
            this.get();
        },
        data: () => (
            { result: {} }
        ),
        methods: {
            async get() {
                fetch('http://localhost:3000/history', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(async data => {
                    this.result = await data.json();
                });
            }
        }
    }
</script>