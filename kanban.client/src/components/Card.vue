<template>
  <div class="row">
    <CardTemplate v-for="c in state.cards" :key="c.id" :card="c" />
  </div>
</template>

<script>
import { cardsService } from '../services/CardsService'
import { AppState } from '../AppState'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const state = reactive({
      cards: computed(() => AppState.cards)
    })
    onMounted(async() => {
      try {
        const route = useRoute()
        await cardsService.getCardsById(route.params)
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
