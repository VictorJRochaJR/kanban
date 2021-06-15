<template>
  <div class="row">
    Cards
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: computed(() => AppState.cards)
    }
  },
  setup() {
   onMounted(async() => {
       try {
           cardService.getCardsById()     
       } catch (error) {
           console.log(error)
       }
   }

    
   }) 
   return {
       state
   },
  components: {}
}

</script>

<style lang="scss" scoped>

</style>
