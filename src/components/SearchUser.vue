<script setup lang="ts">
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

  <select @change="emitSelectedGender">
    <option value="">All</option>
    <option value="female">Female</option>
    <option value="male">Male</option>
  </select>
  <input @keyup.enter="enterClicked" />
</template>
