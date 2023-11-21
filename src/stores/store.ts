import type { User } from '@/services/users'
import { reactive } from 'vue'
interface RootState {
  user?: User
}
export const store = reactive<RootState>({})
