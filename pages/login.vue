<script setup lang="ts">
const next = useRoute().query?.next as string
const { user } = useSupabaseUser()

if (next)
  navigateTo(next)

definePageMeta({
  middleware: 'auth',
})
</script>

<template>
<div>
  Login Page
</div>
</template>
