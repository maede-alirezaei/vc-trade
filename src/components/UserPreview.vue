<script setup lang="ts">
import { store } from '../stores/store'
</script>

<template>
  <h1>{{ store.user?.name.first }}</h1>
</template>
