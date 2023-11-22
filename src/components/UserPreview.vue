<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps(['selectedUser'])
const user = ref()
const userData = JSON.parse(localStorage.getItem('user'))
if (userData) {
  user.value = userData
}

watch(
  () => props.selectedUser,
  () => {
    user.value = props.selectedUser
  }
)
</script>

<template>
  <h1>{{ user?.name.first }}</h1>
</template>
