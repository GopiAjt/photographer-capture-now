<template>
    <Login v-if="!$store.state.isLogedIn"></Login>
    <NavBar v-else></NavBar>
</template>

<script setup>
import Login from "@/views/Login.vue";
import NavBar from '@/components/NavBar.vue'
</script>

<script>
export default {
    methods: {
        
    }
}
</script>