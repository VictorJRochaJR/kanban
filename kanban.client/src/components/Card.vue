<template>
  <div class="row">
    <div class="card align-items-center">
      <CardTemplate v-for="c in state.cards" :key="c.id" :card="c" />
    </div>
  </div>
</template>

<script>
import { cardsService } from '../services/CardsService'
import { AppState } from '../AppState'
import { reactive } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      cards: computed(() => AppState.cards)
    })
    watchEffect(async() => {
      if (AppState.account.id) {
        try {
          await cardsService.getCardsById(route.params)
          console.log(AppState.cards)
        } catch (error) {
          console.log(error)
        }
      }
    })
    return { state }
  }
}

</script>

<style lang="scss" scoped>

</style>
