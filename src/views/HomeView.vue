<template>
    <h1>this is home</h1>
    <Button label="logout" @click="handleLogout" />
</template>

<script>

export default {
    methods: {
        handleLogout(){
            this.$store.dispatch('logout');
        }
    }
}
</script>