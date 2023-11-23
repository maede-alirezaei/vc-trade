<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps(['selectedUser'])
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

watch(
  () => props.selectedUser,
  () => {
    user.value = props.selectedUser
  }
)
</script>

<template>
  <h1>{{ user && user.name.first }}</h1>
</template>
