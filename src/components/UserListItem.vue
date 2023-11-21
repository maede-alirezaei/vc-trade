<script setup lang="ts">


defineProps(['user'])
</script>

<template>
  <li>
    {{ user.name.first + ' ' + user.name.last }}
  </li>
</template>
