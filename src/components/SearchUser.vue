<script setup lang="ts">
const emit = defineEmits(['click'])

function enterClicked(e) {
  emit('click', e.target.value)
}
</script>

<template>
  <h1>Search</h1>
  <input @keyup.enter="enterClicked" />
</template>
