<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Login from "@/views/Login.vue";
</script>

<template>
  <Login></Login>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>

  <RouterView />
</template>

<style scoped></style>