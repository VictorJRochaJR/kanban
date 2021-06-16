<template>
  <div class="col-4 card align-items-center">
    <div>
      <div>
        {{ card.title }}
      </div>
      <Tasks v-for="task in state.tasks" :key="task.id" :task="task" />
      <CreateTask :card-id="card.id" />
    </div>
    <div>
      <button class="btn btn-primary" @click="deleteByCardId">
        Delete
      </button>
      <button class="btn btn-primary" @click="editCard">
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
      </form>
    </div>
  </div>
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
          cardsService.deleteByCardId(props.card.id)
          console.log(props.card.id, 'deleted card')
        }
      },
      async editCard() {
        try {
          await cardsService.editCard(state.editedCard, props.card)
        } catch (error) {
          console.log(error)
          console.log(props.card.id)
        }
      }
    }
  }
}
</script>

    <style lang="scss" scoped>
    </style>
