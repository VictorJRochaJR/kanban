<template>
  <div class="container-fluid">
    <div class="row justify-content-center py-5">
      <h1>Board here:</h1>
    </div>
    <div class="y-scroll">
      <ActiveTask v-if="state.task.id" />
      <Card v-else />
      <div v-if="!state.task.id" class="col-md-4 bg-white shadow border rounded">
        <span @click.stop="isHidden">Add New Card</span>
        <form id="create-card-form" v-if="state.formHidden" @submit.prevent="createCard">
          <input type="
          text"
                 v-model="state.newCard.title"
                 placeholder="Add Card"
          >
          <button class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
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
        boardId: route.params.boardId,
        board: computed(() => AppState.activeBoard)
      },
      formHidden: false
    })
    return {
      state,
      isHidden() {
        state.formHidden = !state.formHidden
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
.createform{
  min-width: 90vh
}
.y-scroll{
  overflow-y: auto;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
}
/* *{
  outline: 1px solid red;
} */
</style>
