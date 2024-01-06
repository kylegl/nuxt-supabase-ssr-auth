<script setup lang="ts">
const {
  useSignInWithOAuth,
  useSignInWithPassword,
  useSignInWithOtp
} = useAuth()
</script>

<template>
<div>
  Home Page

  <button @click="useSignInWithOAuth('discord')">
    Login
  </button>
</div>
</template>
