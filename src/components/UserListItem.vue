<script setup lang="ts">
defineProps(['user'])
</script>

<template>
  <li class="user-item">
    <img
      :src="user.picture.thumbnail"
      :alt="`${user.name.first} ${user.name.last}`"
      class="user-image"
    />
    <div class="user-details">
      <div class="user-name">
        {{
          `${user.name.first.charAt(0).toUpperCase()}${user.name.first.slice(1)} ${user.name.last
            .charAt(0)
            .toUpperCase()}${user.name.last.slice(1)}`
        }}
      </div>
      <div class="user-email">{{ user.email }}</div>
    </div>
  </li>
</template>

<style scoped>
.user-item {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
  margin: 8px 0;
  cursor: pointer;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.user-email {
  color: #555;
}



</style>
