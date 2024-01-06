<script setup lang="ts">
const {
  useSignInWithOAuth,
  useSignInWithPassword,
  useSignInWithOtp,
  useSignOut,
} = useAuth()

const {user} = useSupabaseUser()

const email = ref('')
const password = ref('')

function testServerUser() {
  $fetch('/auth/serverTest')
}
</script>

<template>
<div>
  Home Page

  <label>Email</label>
  <input type="text" v-model="email"/>
  <label>pass</label>
  <input type="text" v-model="password"/>

  <button @click="useSignInWithOAuth('discord')">
    Login
  </button>
  <button @click="useSignOut()">Logout</button>
  <button @click="testServerUser()">Test Server User</button>

  <div>
    {{ user }}
  </div>
</div>
</template>
