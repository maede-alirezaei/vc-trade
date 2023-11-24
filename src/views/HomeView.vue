<script setup lang="ts">
import SearchUser from '@/components/SearchUser.vue'
import UserDisplay from '@/components/UserDisplay.vue'
import UserListItem from '@/components/UserListItem.vue'
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

function handleScroll(event: Event) {
  const target = event.target as HTMLDivElement
  const isAtBottom = target.scrollTop + target.clientHeight <= target.scrollHeight
  if (isAtBottom && !loading.value) {
    offset.value += 5
    readUsers(offset.value)
  }
}
</script>

<template>
  <div class="side-container">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <SearchUser @selected="genderSelected" @change="onChange" />
    <h1>Users</h1>
    <div v-if="loading">Loading...</div>
    <ul @scroll="handleScroll" class="users-list">
      <UserListItem
        @click="userSelected(user)"
        v-for="user in users"
        :key="user.id.value"
        :user="user"
      />
      <li v-if="users.length > 24">More...</li>
    </ul>
  </div>
  <UserDisplay :selected-user="selectedUser" />
</template>
<style scoped>
.side-container {
  border: 1px solid #ddd;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
.users-list {
  overflow-y: auto;
  max-height: 80vh;
  padding: 0;
}
.users-list::-webkit-scrollbar {
  width: 0px;
}
</style>
