<script setup lang="ts">
import SearchUser from '@/components/SearchUser.vue';
import UserPreview from '@/components/UserPreview.vue';
import UsersList from '@/components/UsersList.vue';
</script>

<template>
  <div>
    <SearchUser />
    <UsersList />
  </div>
  <UserPreview />
</template>
