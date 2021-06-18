<template>
  <div class="container-fluid" :style="{'background-image': 'url(' + state.board.backgroundImg + ')'}">
    <button class="myButton2 pos-ab m-4" title="your boards" @click="boardPage()">
      Your Boards
    </button>
    <div class="row justify-content-center py-3">
      <h1 class="my-text">
        {{ state.board.title }}
      </h1>
    </div>
    <div class="y-scroll height">
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
import { useRoute, useRouter } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
export default {
  name: 'Board',
  setup() {
    onMounted(async() => {
      try {
        await boardsService.getOneBoard(route.params.boardId)
      } catch (error) {
        Notification.toast(error.message)
      }
    })
    const route = useRoute()
    const router = useRouter()
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
      boardPage() {
        router.push({ name: 'Home' })
      },
      isHidden() {
        state.formHidden = !state.formHidden
      },
      async createCard() {
        try {
          await cardsService.createCard(state.newCard)
        } catch (error) {
          Notification.toast(error.message)
        }
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
.myButton2 {
  z-index: 3;
background:linear-gradient(to bottom, #525252 5%, #000000 100%);
background-color:#525252;
border-radius:36px;
border:1px solid #a8a8a8;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:16px;
padding:2px 12px;
text-decoration:none;
}
.myButton2:hover {
background:linear-gradient(to bottom, #000000 5%, #525252 100%);
background-color:#000000;

}
.myButton2:active {
position:absolute;
top:1px;
}
.pos-ab{
  position: absolute;
}

.height{
  min-height: calc(100vh - (88px + 35px)) ;
}

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
.y-scroll{
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
}
/* *{
  outline: 1px solid red;
} */
</style>
