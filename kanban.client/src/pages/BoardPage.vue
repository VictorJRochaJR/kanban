<template>
  <div class="container">
    <div class="row" v-if="!state.task.id">
      <h3>Add card</h3>
      <form id="create-card-form" @submit.prevent="createCard">
        <input type="
          text"
               v-model="state.newCard.title"
               placeholder="title"
        >
        <button class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    <div class="row">
      <ActiveTask v-if="state.task.id" />
      <Card v-else />
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { cardsService } from '../services/CardsService'
import { useRoute } from 'vue-router'
export default {
  name: 'Board',
  setup() {
    const route = useRoute()
    const state = reactive({
      task: computed(() => AppState.activeTask),
      newCard: {
        boardId: route.params.boardId
      },
      formhidden: true
    })
    return {
      state,
      isHidden() {
        state.formhidden = !state.formhidden
      },
      async createCard() {
        try {
          console.log('here')
          await cardsService.createCard(state.newCard)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style>
/* *{
  outline: 1px solid red;
} */
</style>
