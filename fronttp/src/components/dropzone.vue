<template>
  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions">
  </vue-dropzone>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  export default {
    name: 'app',
    components: {
      vueDropzone: vue2Dropzone
    },
    data: function() {
      return {
        dropzoneOptions: {
          url: 'http://localhost:3000/upload',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: {
            "My-Awesome-Header": "header value"
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
