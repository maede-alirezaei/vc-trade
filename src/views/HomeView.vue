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
const selectedUser: Ref<User | undefined> = ref(JSON.parse(localStorage.getItem('user') || 'null'))
const users: Ref<User[]> = ref([])
const currentUsers: Ref<User[]> = ref([])
const isSmallScreen = ref(false)

onMounted(() => {
  isSmallScreen.value = window.innerWidth < 600
  window.addEventListener('resize', () => {
    isSmallScreen.value = window.innerWidth < 600
  })
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
      if (searchParams.value.gender) {
        filterGender()
      }
    })
}

function userSelected(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
  selectedUser.value = user
}

function filterGender() {
  const { gender } = searchParams.value

  if (gender !== '') {
    currentUsers.value = [
      ...users.value.filter((user: User) => {
        return user.gender === gender
      })
    ]
  } else {
    currentUsers.value = users.value
  }
}

function genderSelected(gender: string) {
  // Since the api returns random users with each api call so here I filtered the curent users as well
  // but if you need more users it will fetch the new users accordingly to the gender
  searchParams.value = { gender }

  router.push({
    name: 'home',
    query: {
      gender
    }
  })

  filterGender()

  // // If the page reloads and the gender is set there will be no data for the opposite gender
  if (currentUsers.value.length === 0) {
    readUsers(0)
  }
}

function onChange(searchText: string) {
  currentUsers.value = [
    ...users.value.filter((user: User) => {
      const name = user.name.first + user.name.last
      return name.toLowerCase().includes(searchText.toLowerCase().replace(/\s/g, ''))
    })
  ]
}

function handleScroll(event: Event) {
  const target = event.target as HTMLDivElement
  const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight-1
  if (isAtBottom && !loading.value && target.scrollTop > 0) {
    offset.value += 1
    readUsers(offset.value)
  }
}
function showUsersList() {
  selectedUser.value = undefined
}
</script>

<template>
  <button class="go-back-button" v-if="selectedUser && isSmallScreen" @click="showUsersList">
    Go Back to the User List
  </button>
  <div class="side-container" v-if="(isSmallScreen && !selectedUser) || !isSmallScreen">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <SearchUser @selected="genderSelected" @change="onChange" />
    <h1>Users</h1>
    <div v-if="loading">Loading...</div>

    <ul @scroll="handleScroll" class="users-list">
      <UserListItem
        @click="userSelected(user)"
        v-for="user in currentUsers"
        :key="user.id.value"
        :user="user"
      />
      <li v-if="currentUsers.length > 24">More...</li>
    </ul>
  </div>
  <UserDisplay v-if="!(isSmallScreen && !selectedUser)" :selected-user="selectedUser" />
</template>
<style scoped>
.side-container {
  border: 1px solid var(--vt-c-light-grey);
  margin: 16px;
  flex: 0.5 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--vt-c-dark-grey);
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.users-list {
  overflow-y: auto;
  max-height: 100%;
  padding: 0; /* to enable list defult padding */
  padding-right: 5px;
}
.users-list::-webkit-scrollbar {
  background-color: var(--vt-c-white-soft);
  width: 5px;
}
.users-list::-webkit-scrollbar-thumb {
  background-color: var(--vt-c-divider-dark-1);
  border-radius: 4px;
}
@media (max-width: 600px) {
  .side-container {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
  }
}
</style>
