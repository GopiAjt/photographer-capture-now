<template>
    <h1>this is home</h1>
    <Button label="logout" @click="handleLogout" />
    <NavBar></NavBar>
</template>

<script setup>

import NavBar from '@/components/NavBar.vue'
</script>

<script>
export default {
    methods: {
        handleLogout(){
            this.$store.dispatch('logout');
        }
    }
}
</script>