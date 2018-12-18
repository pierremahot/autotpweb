<template>
    <div>
    
        <li>Nom du fichier : {{file.name}}</li>
        <ul>
            <li>Date de saisie : {{ file.date }}</li>
            <li>ID : {{ file.id }} </li>
            <li>Status : {{ file.status }} <font-awesome-icon v-if="file.error=='0'" class="ok" icon="check-circle" /><font-awesome-icon v-else class="warn" icon="exclamation-circle" /></li>
            <li>TP résultant :</li>
            <ul v-for="tp in file.result" :key=tp.id>
                <displayTp v-bind:tp="tp" v-bind:requestId="requestId"  v-bind:fileId="file.id"></displayTp>
            </ul>
        </ul>
    </div>
</template>

<script>
    import displayTp from '../components/tp.vue'
    export default {
        name: 'displayFileInfo',
        props: ['file','requestId'],
        components: {
            displayTp
        }
    }
</script>