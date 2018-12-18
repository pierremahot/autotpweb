<template>
  <div>
    <top/>
    <div class="container">
        <h1> History </h1>
        <b-btn v-on:click="get" variant="primary">update history</b-btn>
        <displayHistoryTable v-bind:history="result" ></displayHistoryTable>
    </div>
  </div>
</template>

<script>
    import top from '../components/top.vue'
    import displayHistoryTable from '../components/table.vue'
    export default {
        name: 'myform',
        components: {
            top,
            displayHistoryTable
        },
        created: function() {
            this.get();
        },
        data: () => ({ 
            result: {}
        }),
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