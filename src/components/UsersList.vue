<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { store } from '../stores/store'

interface User {
  gender: string
  name: Name
  id: Id
}
interface Name {
  first: string
  last: string
}
interface Id {
  name: string
  value: string
}
const offset = ref(0)
const loading = ref(false)
const errorMessage = ref('')
const users: Ref<User[]> = ref([])
function loadMoreUsers() {
  offset.value = offset.value + 25
  loadUsers(offset.value, 25)
}

onMounted(() => {
  loadUsers(offset.value, 25)
})

async function loadUsers(offset: number, size: number) {
  loading.value = true
  try {
    const res = await fetch(`https://randomuser.me/api/?page=${offset}&results=${size}&seed=abc`)
    return (users.value = [...users.value, ...(await res.json()).results])
  } catch (error) {
    errorMessage.value = 'Error! Could not reach the API. ' + error
  } finally {
    loading.value = false
  }
}

function userSelected(user: User) {
  store.user = { ...user }
}
</script>

<template>
  <h1>Users</h1>
  <ul>
    <li @click="userSelected(user)" v-for="user in users" :key="user.id.value">
      {{ user.name.first + ' ' + user.name.last }}
    </li>
    <button @click="loadMoreUsers">More result...</button>
  </ul>
</template>
