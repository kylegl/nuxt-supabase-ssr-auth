<script setup lang="ts">
const { error } = defineProps<{ error: unknown }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
<NuxtLayout>
  <div>
    <h1>Error Page</h1>
    <div>
      {{ error }}
    </div>
    <button @click="handleError">
      Home
    </button>
  </div>
</NuxtLayout>
</template>
