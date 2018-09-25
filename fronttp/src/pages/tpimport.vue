<template>
  <div>
    <top/>
    <dropzone/>
    <myform/>
  </div>
</template>

<script>
  import dropzone from '../components/dropzone.vue'
  import myform from '../components/myform.vue'
  import top from '../components/top.vue'
  export default {
    name: 'app',
    components: {
      top,
      dropzone,
      myform
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
