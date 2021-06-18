<template>
  <div dropzone="zone" @dragover.prevent @drop.prevent="moveTask" class="col-md-4 mx-2 border shadow bg-light rounded align-items-center fill x-scroll">
    <div class="row">
      <div class="col d-flex justify-content-center p-0" :style="{'background-color': card.cardColor}">
        <span>
          <h4 class="my-text">
            {{ card.title }}
          </h4>
        </span>
      </div>
      <div class="d-flex justify-content-end align-top p-2" :style="{'background-color': card.cardColor}">
        <div class="dropdown click text-light"
             id="dropdownMenuButton"
             data-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
             title="options"
        >
          <h1>...</h1>
        </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="text-danger dropdown-item" @click="deleteByCardId" title="Delete task">
            Delete Card
          </button>
        </div>
      </div>
    </div>

    <Tasks v-for="task in state.tasks" :key="task.id" :task="task" :color="card.cardColor" />
    <CreateTask :card-id="card.id" :color="card.cardColor" />
  </div>

  <!-- <button class="btn btn-primary" @click="editCard">
        Edit
      </button>
      <form @submit.prevent="editCard" class="mt-4 border bg-primary p-3">
        <div class="form-group text-center">
          <label for="exampleFormControlInput1">Edit Card</label>
          <input type="text"
                 v-model="state.editedCard.title"
                 class="form-control"
                 id="exampleFormControlInput1"
                 placeholder="Change Title Here"
                 required
          >
        </div>
      </form> -->
</template>
<script>
import { reactive } from '@vue/reactivity'
import { cardsService } from '../services/CardsService'
import Notification from '../utils/Notification'
import { computed, watchEffect } from '@vue/runtime-core'
import { tasksService } from '../services/TasksService'
import { AppState } from '../AppState'

export default {
  props: {
    card: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      editedCard: { id: props.card.id },
      tasks: computed(() => AppState.tasks[props.card.id])
    })
    watchEffect(() => {
      tasksService.getTasksById(props.card.id)
    })
    return {
      state,
      async deleteByCardId() {
        if (await Notification.confirmAction('Are you sure you want to delete?')) {
          cardsService.deleteByCardId(props.card)
          cardsService.getCardsById(props.card.boardId)
        }
      },
      moveTask() {
        tasksService.moveTask(props.card.id)
      }
      // async editCard() {
      //   try {
      //     await cardsService.editCard(state.editedCard, props.card)
      //   } catch (error) {
      //     console.log(error)
      //     console.log(props.card.id)
      //   }
      // }
    }
  }
}
</script>

    <style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');

    .fill{
      height: 70vh;
    }
    .my-text{
font-family: 'Reggae One', cursive;
color: white;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
.x-scroll{
  overflow-y: auto;
}
    </style>
