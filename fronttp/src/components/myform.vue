<template>
  <div class="container">
    <fieldset>
      <b-btn v-on:click="submit" variant="primary">valider</b-btn>  
    </fieldset>
    <div>
      <ul>
        <li v-for="file in TPRequest" :key=file.ID>
          {{ file.name }} {{ file.status }}
          <a v-if="file.status != 'ended'">
            <circle-spin></circle-spin>
          </a>
          <a v-else>
            <ul v-for="tp in file.result" :key=tp.id>
              <displayTp v-bind:tp="tp" v-bind:file="file" v-bind:requestId="idrequest"></displayTp>
            </ul>
          </a>
  
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script>
  import CircleSpin from '../../node_modules/vue-loading-spinner/src/components/Circle2'
  import displayTp from '../components/tp.vue'
  export default {
    name: 'myform',
    components: {
      CircleSpin,
      displayTp
    },
    data: () => ({
      TPRequest: {},
      idrequest: ''
    }),
    methods: {
      async submit() {
        fetch('http://localhost:3000/submit', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          })
        }).then(async data => {
          const myjson = await data.json();
          this.TPRequest = myjson.files;
          this.idrequest = myjson.idrequest;
          while (this.TPRequest.some(function(value) {
              return value.status !== 'ended'
            })) {
            await fetch('http://localhost:3000/update', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idrequest: this.idrequest,
                files: this.TPRequest
              })
            }).then(async data => {
              this.TPRequest = await data.json();
            });
          }
        });
      }
    }
  }
</script>

<style>
  .ok {
    display: inline-block;
    font-style: normal;
    color: green;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
  
  .warn {
    display: inline-block;
    font-style: normal;
    color: red;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
  }
</style>