<template>
  <div class="row">
    <CardTemplate v-for="c in state.cards" :key="c.id" :card="c" />
  </div>
</template>

<script>
import { cardsService } from '../services/CardsService'
import { AppState } from '../AppState'
import { reactive } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      cards: computed(() => AppState.cards)
    })
    watchEffect(async() => {
      console.log(route.params)
      if (AppState.account.id) {
        try {
          await cardsService.getCardsById(route.params.boardId)
        } catch (error) {
          Notification.toast(error.message)
        }
      }
    })
    return { state }
  }
}

</script>

<style lang="scss" scoped>

</style>
