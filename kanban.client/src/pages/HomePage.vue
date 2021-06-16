<template>
  <div class="container-fluid">
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

import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.allBoards),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })

    return {
      state
    }
  }
}
</script>

<style>

</style>
