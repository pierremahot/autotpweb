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
        <li v-for="item in result" :key="item">
          {{ item.name }} {{ item.status }}
        </li>
      </ul>
    </div>
    </div>
</template>

<script>

export default {
  name: 'myform',
  components: {},
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
        var ended = false;
        console.log(this.result.every(function(value, index) { return value.status === 'ended'}));
        while (this.result.some(function(value, index) { return value.status !== 'ended'})) {
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
