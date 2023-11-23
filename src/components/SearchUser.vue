<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const initValue = ref(router.currentRoute.value.query.gender)
const emit = defineEmits(['change', 'selected'])

function handleChange(e: any) {
  emit('change', e.target.value)
}
function emitSelectedGender(e: any) {
  emit('selected', e.target.value)
}
</script>

<template>
  <div>
    <h1>Search</h1>
    <input @input="handleChange" class="input-field" />
    <select :value="initValue" @change="emitSelectedGender" class="select-container">
      <option value="">Gender</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
    </select>
  </div>
</template>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #eae2e2;
  padding-bottom: 16px;
  gap: 16px;
}
.select-container {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
