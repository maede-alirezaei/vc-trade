<script setup lang="ts">
import SearchUser from '@/components/SearchUser.vue'
import UserListItem from '@/components/UserListItem.vue'
import UserPreview from '@/components/UserPreview.vue'
import { getUsers, type User } from '@/services/users'
import { store } from '@/stores/store'
import { onMounted, ref, type Ref } from 'vue'

const offset = ref(0)
const loading = ref(false)
const errorMessage = ref('')
const users: Ref<User[]> = ref([])
onMounted(() => {
  readUsers(0)
})
function readUsers(offset: number, params?: object) {
  loading.value = true
  getUsers({ page: offset, ...params })
    .then(({ data }) => {
      users.value = [...users.value, ...data.results]
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
  store.user = { ...user }
}
const searchText = ref('')
function clicked(e) {
  searchText.value = e
  readUsers(0, { name: searchText.value })
}
</script>

<template>
  <div>
    <SearchUser @click="clicked" />
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
  <UserPreview />
</template>
