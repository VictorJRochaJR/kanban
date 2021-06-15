<template>
  <h1>home page</h1>
  <Board v-for="b in state.boards" :key="b.id" :board="b" />
</template>

<script>
import Notification from '../utils/Notification'
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        boardsService.getAllBoards()
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    const state = reactive({
      boards: computed(() => AppState.boards)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
