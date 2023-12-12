<script setup lang="ts">
import type { User } from '@/services/users'
import { computed } from 'vue'
interface UserDisplayProps {
  selectedUser?: User
}
const props = defineProps<UserDisplayProps>()
const fullName = computed(() => {
  if (!props.selectedUser) return
  return (
    props.selectedUser?.name.first.charAt(0).toUpperCase() +
    props.selectedUser?.name.first.slice(1) +
    props.selectedUser?.name.last.charAt(0).toUpperCase() +
    props.selectedUser?.name.last.slice(1)
  )
})
</script>

<template>
  <div class="user-display-container">
    <h1>
      {{ fullName }}
    </h1>
    <div v-if="props.selectedUser" class="user-info">
      <img
        :src="props.selectedUser && props.selectedUser.picture.large"
        :alt="`${props.selectedUser && props.selectedUser.name.first} ${
          props.selectedUser && props.selectedUser.name.last
        }`"
        class="user-image"
      />
      <div class="user-details">
        <div><strong>ID:</strong> {{ props.selectedUser && props.selectedUser.id.value }}</div>
        <div>
          <strong>Location:</strong> {{ props.selectedUser && props.selectedUser.location.city }},
          {{ props.selectedUser && props.selectedUser.location.country }}
        </div>
        <div><strong>Contact:</strong> {{ props.selectedUser && props.selectedUser.email }}</div>
      </div>
    </div>
    <div v-else>No user has been selected.</div>
  </div>
</template>

<style scoped>
strong {
  font-weight: bold;
}
.user-display-container {
  border: 1px solid var(--vt-c-light-grey);
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--vt-c-dark-grey);
  padding: 16px;
  flex: 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100%;
  overflow: hidden;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: bold;
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.user-image {
  flex: 1;
  width: 50%;
  height: 50%;
  border-radius: 20%;
  margin: 16px;
}

.user-details {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.user-details > div {
  margin-bottom: 8px;
}
</style>
