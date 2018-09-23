<template>
  <div>
  <fieldset>
    <legend>Merci de renseigner vos login GLPI</legend>
    <div>
        <label for="userName">Utilisateur :</label>
        <input ref="user" type="text" id="username" name="username"
               required />
    </div>

    <div>
        <label for="password">Mot de passe :</label>
        <input  ref="password" type="password" id="password" name="password" />
    </div>

    <button v-on:click="submit">valider</button>

    </fieldset>
    <div>
      <ul>
        <li v-for="item in result" :key=item.ID>
          {{ item.name }} {{ item.status }}  <a v-if="item.status != 'ended'"> <circle-spin></circle-spin> </a> <a v-else> <font-awesome-icon icon="check-circle" /> </a>
        </li>
      </ul>
    </div>
    
    </div>
</template>

<script>
import CircleSpin from '../../node_modules/vue-loading-spinner/src/components/Circle'
export default {
  name: 'myform',
  components: {
    CircleSpin
  },
  data:() => ({
    result: {}
  }),
  methods: {
    async submit()  {
      fetch('http://localhost:3000/submit', {
        method:'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          user : this.$refs.user.value,
          password : this.$refs.password.value
        })
      }).then(async data =>{
        this.result = await data.json();
        while (this.result.some(function(value) { return value.status !== 'ended'})) {
          await fetch('http://localhost:3000/update', {
            method:'POST',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(
              this.result
            )
          }).then(async data => {
            this.result = await data.json();
          });
        }
      });
    } 
  }
}

</script>