<template>
  <div>
  <fieldset>
    <legend>Sign in</legend>

    <div>
        <label for="userName">Username:</label>
        <input ref="user" type="text" id="username" name="username"
               required />
    </div>

    <div>
        <label for="password">Password:</label>
        <input  ref="password" type="password" id="password" name="password" />
    </div>

    <button v-on:click="submit">submit</button>

    </fieldset>
    <div>
        <p>{{ result }}</p>
    </div>
    </div>
</template>

<script>

export default {
  name: 'myform',
  components: {},
  data:() => ({
    result: ''
  }),
  methods: {
    submit()  {
      fetch('http://localhost:3000/submit', {
        method:'POST',
        //mode: 'cors',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          user : this.$refs.user.value,
          password : this.$refs.password.value
        })
      }).then(async data => {
        const res = await data.json()
        this.result = res.test
        });
    } 
  }
}

</script>
