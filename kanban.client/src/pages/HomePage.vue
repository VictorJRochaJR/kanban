<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div v-if="!state.user.isAuthenticated">
        <h1>
          Welcome to KanBan!
        </h1>
        <h2>Sign in to view your boards!</h2>
      </div>
    </div>
    <div v-if="state.user.isAuthenticated" class="row justify-content-center">
      <Board v-for="b in state.boards" :key="b.id" :board="b" />
      <CreateBoard />
    </div>
  </div>
</template>

<script>
import Notification from '../utils/Notification'
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.allBoards),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    watchEffect(async() => {
      try {
        await boardsService.getBoardsById(state.account.id)
        logger.log(state.account.id)
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })

    return {
      state
    }
  }
}
</script>

<style>

</style>
