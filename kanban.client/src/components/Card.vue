<template>
  <div class="row">
    <Cards v-for="c in cards" :key="c.id" :cards="c" />
  </div>
</template>

<script>
import { cardsService } from '../services/CardsService'
import { AppState } from '../AppState'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { computed } from 'vue'
export default {
  setup() {
    const state = reactive({
      cards: computed(() => AppState.cards)
    })
    onMounted(async() => {
      try {
        await cardsService.getCardsById()
      } catch (error) {
        console.log(error)
      }
    })
    return { state }
  }
}

</script>

<style lang="scss" scoped>

</style>
