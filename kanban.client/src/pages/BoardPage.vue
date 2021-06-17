<template>
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-center">
        <ActiveTask v-if="state.task.id" />
        <Card v-else />
        <div v-if="!state.task.id">
          <div class="col-md-4 card justify-content-center " @click="isHidden">
            <span>Add New Card</span>
          </div>
          <div class="d-flex justify-content-between">
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
/* *{
  outline: 1px solid red;
} */
</style>
