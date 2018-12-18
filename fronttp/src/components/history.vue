
<template>
    <ul>
        <li v-for="request in this.history" :key=request._id>
            <displayRequest v-bind:request="request" ></displayRequest>
        </li>
    </ul>
</template>

<script>
    import displayRequest from '../components/request.vue'
    export default {
        name: 'displayHistory',
        props: ['history'],
        components: {
            displayRequest
        }
    }
</script>