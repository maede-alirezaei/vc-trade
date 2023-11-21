<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { store } from '../stores/store'
import type { User } from '@/services/users'
import { getUsers } from '@/services/users'

</script>

<template>
  <h1>Users</h1>

</template>
