<script setup lang="ts">
import SearchUser from '@/components/SearchUser.vue'
import UserListItem from '@/components/UserListItem.vue'
import UserPreview from '@/components/UserPreview.vue'
import { getUsers, type User } from '@/services/users'
import { onMounted, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
const offset = ref(0)
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const searchParams = ref({ gender: router.currentRoute.value.query.gender })
const selectedUser = ref({})
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
}
function readMoreUsers() {
  offset.value = offset.value + 25
  readUsers(offset.value)
}

function userSelected(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
  selectedUser.value = user
}
function genderSelected(e: string) {
  users.value = []
  searchParams.value = { gender: e }
  readUsers(0)
  router.push({
    name: 'home',
    query: {
      gender: e
    }
  })
}

function enterClicked(e: string) {
  users.value = [
    ...currentUsers.value.filter(
      (user) =>
        user.name.first.toLowerCase().includes(e.toLowerCase()) ||
        user.name.last.toLowerCase().includes(e.toLowerCase())
    )
  ]
}
</script>

<template>
  <div>
    <SearchUser @selected="genderSelected" @clicked="enterClicked" />
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
