<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const initValue = ref(router.currentRoute.value.query.gender)
const emit = defineEmits(['clicked', 'selected'])

function enterClicked(e: any) {
  emit('clicked', e.target.value)
}
function emitSelectedGender(e: any) {
  emit('selected', e.target.value)
}
</script>

<template>
  <h1>Search</h1>

  <select :value="initValue" @change="emitSelectedGender">
    <option value="">All</option>
    <option value="female">Female</option>
    <option value="male">Male</option>
  </select>
  <input @input="enterClicked" />
</template>
