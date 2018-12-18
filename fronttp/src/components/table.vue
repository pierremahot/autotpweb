
<template>
    <table id="table" class="table table-striped table-dark">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">File</th>
                <th scope="col">TP</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="request in this.history">
                <template v-for="file in request.files"> 
                    <tr v-for="tp in file.result" :key=tp.id>
                        <th scope="row">{{request._id+file.id+tp.id}}</th>
                        <th>{{file.date}}</th>
                        <th>{{file.name}}</th>
                        <th><displayTp v-bind:tp="tp" v-bind:requestId="request._id"  v-bind:fileId="file.id"></displayTp></th>
                    </tr>
                </template>
            </template>
        </tbody>
    </table>
</template>

<script>
    import displayTp from '../components/tp.vue'
    export default {
        name: 'displayHistory',
        props: ['history'],
        components: {
            displayTp
        }
    }
</script>