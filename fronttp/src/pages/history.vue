<template>
    <div>
        <top/>
        <h1> History </h1>
        <button v-on:click="get">update history</button>
        <ul>
            <li v-for="item in result" :key=item.idrequest>
                requete : {{ item.idrequest }}
                <ul v-for="file in item.files" :key=file.id>
                        <li>ID : {{ file.id }}, nom du fichier : {{file.name}}, status : {{ file.status }} <font-awesome-icon v-if="file.status=='ended'" class="ok" icon="check-circle" /></li>
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