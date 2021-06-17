<template>
  <div class="container-fluid" :style="{'background-image': 'url(' + state.board.backgroundImg + ')'}">
    <div class="row justify-content-center py-5">
      <h1 class="my-text">
        My Board Title
      </h1>
    </div>
    <div class="y-scroll">
      <ActiveTask v-if="state.task.id" />
      <Card v-else />
      <div v-if="!state.task.id" class="col-md-4 mx-2 border shadow bg-white rounded align-items-center fill colheight">
        <div class="text-center">
          <span @click.stop="isHidden"><h4 class="my-text" style="cursor: pointer;" title="add card">Add New Card</h4></span>
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
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');

.createform{
  min-width: 90vh
}

.colheight{
  height: 20%;
}
 .my-text{
font-family: 'Reggae One', cursive;
color: white;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}

/* *{
  outline: 1px solid red;
} */
</style>
