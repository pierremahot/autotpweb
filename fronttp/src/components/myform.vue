<template>
  <div class="container">
    <fieldset>
      <legend>Merci de renseigner vos login GLPI</legend>
      <div>
        <label for="userName">Utilisateur :</label>
        <input ref="user" type="text" id="username" name="username" required />
      </div>
  
      <div>
        <label for="password">Mot de passe :</label>
        <input ref="password" type="password" id="password" name="password" />
      </div>
  
      <b-btn v-on:click="submit" variant="primary">valider</b-btn>
  
    </fieldset>
    <div>
      <ul>
        <li v-for="file in visualizeTPRequest" :key=file.ID>
          {{ file.name }} {{ file.status }}
          <a v-if="file.status != 'ended'">
            <circle-spin></circle-spin>
          </a>
          <a v-else>
            <font-awesome-icon v-if="file.error == 0" class="ok" icon="check-circle" />
            <font-awesome-icon v-else class="warn" icon="exclamation-circle" />
            <b-btn v-b-toggle="'info' + file.ID" class="btn btn-primary btn-sm btn btn-outline-info">detail</b-btn>
            <b-collapse :id="'info' + file.ID" class="mt-2">
              <b-card>
                <ul v-for="tp in file.result" :key=tp.id>
                  <li><a :href="tp.url">{{ tp.name }}</a><font-awesome-icon v-if="tp.error == 0" class="ok" icon="check-circle" /><font-awesome-icon v-else class="warn" icon="exclamation-circle" /></li>
                </ul>
              </b-card>
            </b-collapse>
          </a>
  
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script>
  import CircleSpin from '../../node_modules/vue-loading-spinner/src/components/Circle2'
  export default {
    name: 'myform',
    components: {
      CircleSpin
    },
    data: () => ({
      TPRequest: {},
      visualizeTPRequest: {},
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
            user: this.$refs.user.value,
            password: this.$refs.password.value
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
              let temp = this.TPRequest;
              temp.forEach(file => {
                if(this.visualizeTPRequest.file) {
                  if(this.visualizeTPRequest.file.folded) {
                    file.folded = this.visualizeTPRequest.file.folded;
                  } else {
                    file.folded = false;
                  }
                } else {
                  file.folded = false;
                }
              });
              this.visualizeTPRequest = temp;
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