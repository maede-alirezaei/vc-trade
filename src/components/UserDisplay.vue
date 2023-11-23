<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps(['selectedUser'])
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

watch(
  () => props.selectedUser,
  () => {
    user.value = props.selectedUser
  }
)
</script>

<template>
  <div class="user-display-container">
    <h1>
      {{
        `${user.name.first.charAt(0).toUpperCase()}${user.name.first.slice(1)} ${user.name.last
          .charAt(0)
          .toUpperCase()}${user.name.last.slice(1)}`
      }}
    </h1>
    <div class="user-info">
      <img
        :src="user && user.picture.large"
        :alt="`${user && user.name.first} ${user && user.name.last}`"
        class="user-image"
      />
      <div class="user-details">
        <div><strong>ID:</strong> {{ user && user.id.value }}</div>
        <div>
          <strong>Location:</strong> {{ user && user.location.city }},
          {{ user && user.location.country }}
        </div>
        <div><strong>Contact:</strong> {{ user && user.email }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
strong {
  font-weight: bold;
}
.user-display-container {
  border: 1px solid #ddd;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
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
  width: 50%;
  height: 50%;
  border-radius: 20%;
  margin: 16px;
  image-rendering: auto;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  image-rendering: -webkit-optimize-contrast;
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
