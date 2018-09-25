<template>
  <main-layout>
    <top/>
    <p>Page not found</p>
  </main-layout>
</template>

<script>
  import top from '../components/top.vue'
  export default {
    name: 'page404',
    components: {
       top
    },
  }
</script>