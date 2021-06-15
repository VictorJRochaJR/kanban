<template>
  <div class="row">
    <Cards v-for = "c in cards" :key="c.id" :cards="c" />
  </div>
</template>

<script>
import {cardsService} from CardsService
import{AppState} from '../AppState'
import { reactive } from '@vue/reactivity'
export default {
  setup() {
      const state = reactive({
          cards: computed(() => AppState.cards)
      })
   onMounted(async() => {
       try {
           cardService.getCardsById()     
       } catch (error) {
           console.log(error)
       }

   }) 
   return state
  
  
}

</script>

<style lang="scss" scoped>

</style>
