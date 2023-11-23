<script setup lang="ts">
import SearchUser from '@/components/SearchUser.vue'
import UserListItem from '@/components/UserListItem.vue'
import UserPreview from '@/components/UserPreview.vue'
import { getUsers, type User } from '@/services/users'
import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const offset = ref(0)
const loading = ref(false)
const errorMessage = ref('')
const searchParams = ref({ gender: router.currentRoute.value.query.gender })
const selectedUser: Ref<User | undefined> = ref()
const users: Ref<User[]> = ref([])
const currentUsers: Ref<User[]> = ref([])
onMounted(() => {
  readUsers(0)
})
function readUsers(offset: number) {
  loading.value = true
  getUsers({ page: offset, ...searchParams.value })
    .then(({ data }) => {
      users.value = [...users.value, ...data.results]
      currentUsers.value = [...users.value]
      loading.value = false
    })
    .catch((error) => {
      errorMessage.value = error
      if (error) return
    })
    .finally(() => {
      loading.value = false
    })
}
function readMoreUsers() {
  offset.value += 25
  readUsers(offset.value)
}

function userSelected(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
  selectedUser.value = user
}
function genderSelected(gender: string) {
  users.value = []
  searchParams.value = { gender }
  readUsers(0)
  router.push({
    name: 'home',
    query: {
      gender
    }
  })
}

function onChange(searchText: string) {
  users.value = [
    ...currentUsers.value.filter(
      (user) =>
        user.name.first.toLowerCase().includes(searchText.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchText.toLowerCase())
    )
  ]
}
</script>

<template>
  <div class="aside-container">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <SearchUser @selected="genderSelected" @change="onChange" />
    <h1>Users</h1>
    <div v-if="loading">Loading...</div>
    <ul>
      <UserListItem
        @click="userSelected(user)"
        v-for="user in users"
        :key="user.id.value"
        :user="user"
      />
      <button @click="readMoreUsers">More result...</button>
    </ul>
  </div>
  <UserPreview :selected-user="selectedUser" />
</template>
<style scoped>
.aside-container {
  border: 1px solid #ddd;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
ul {
  padding: 0;
}
</style>
