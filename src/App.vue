<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Login from "@/views/Login.vue";
import HomeView from '@/views/HomeView.vue';
</script>

<template>
  <Login v-if="!$store.state.isLogedIn"></Login>
  <HomeView v-else></HomeView>
  <!-- <RouterView /> -->
</template>

<style scoped></style>