<template>
  <div>
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
  
      <button v-on:click="submit">valider</button>
  
    </fieldset>
    <div>
      <ul>
        <li v-for="item in visualizedata" :key=item.ID>
          {{ item.name }} {{ item.status }}
          <a v-if="item.status != 'ended'">
            <circle-spin></circle-spin>
          </a>
          <a v-else>
            <font-awesome-icon v-if="item.error == 0" class="ok" icon="check-circle" />
            <font-awesome-icon v-else class="warn" icon="exclamation-circle" />
            <font-awesome-icon v-if="item.folded == true" v-on:click="item.folded=false" icon="caret-right" />
            <font-awesome-icon v-if="item.folded == false" v-on:click="item.folded=true" icon="caret-down" />
            <ul v-if="item.folded == false" v-for="tp in item.result" :key=tp.id>
              <li><a :href="tp.url">{{ tp.name }}</a><font-awesome-icon v-if="tp.error == 0" class="ok" icon="check-circle" /><font-awesome-icon v-else class="warn" icon="exclamation-circle" /></li>
            </ul>
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
      result: {},
      visualizedata: {},
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
          this.result = myjson.files;
          this.idrequest = myjson.idrequest;
          while (this.result.some(function(value) {
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
                files: this.result
              })
            }).then(async data => {
              this.result = await data.json();
              let temp = this.result;
              temp.forEach(file => {
                if(this.visualizedata.file) {
                  if(this.visualizedata.file.folded) {
                    file.folded = this.visualizedata.file.folded;
                  } else {
                    file.folded = false;
                  }
                } else {
                  file.folded = false;
                }
              });
              console.log(temp);
              this.visualizedata = temp;
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