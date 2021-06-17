<template>
  <div class="container-fluid" :style="{'background-image': 'url(' + state.board.backgroundImg + ')'}">
    <div class="row justify-content-center py-5">
      <h1>My Board Title</h1>
    </div>
    <div class="row">
      <ActiveTask v-if="state.task.id" />
      <Card v-else />

      <div v-if="!state.task.id" class="col-md-4 card text">
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
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { cardsService } from '../services/CardsService'
import { useRoute } from 'vue-router'
import { boardsService } from '../services/BoardsService'
export default {
  name: 'Board',
  setup() {
    onMounted(async() => {
      try {
        AppState.activeBoard = await boardsService.getOneBoard(route.params.boardId)
      } catch (error) {
        Notification.toast(error.message)
      }
    })
    const route = useRoute()
    const state = reactive({
      board: computed(() => AppState.activeBoard),
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
