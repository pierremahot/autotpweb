<template>
    <div>
        requete : {{ request._id }}
        <ul v-for="file in request.files" :key=file.id>
            <displayFileInfo v-bind:file="file" v-bind:requestId="request._id" ></displayFileInfo>
        </ul>
    </div>
</template>

<script>
    import displayFileInfo from '../components/fileinfo.vue'
    export default {
        name: 'displayRequest',
        props: ['request'],
        components: {
            displayFileInfo
        }
    }
</script>