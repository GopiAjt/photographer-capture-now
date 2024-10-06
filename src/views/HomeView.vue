<template>
    <Login v-if="!$store.state.isLogedIn"></Login>
    <ProfileView v-else></ProfileView>
</template>

<script setup>
import Login from "@/views/Login.vue";
import ProfileView from "./ProfileView.vue";
</script>

<script>
export default {
    methods: {
        
    }
}
</script>