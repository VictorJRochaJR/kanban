<template>
  <div class="col-4 card align-items-center">
    <div>
      <h1>Card info</h1>
      <div>
        {{ card.title }}
      </div>
      <Task v-for="task in state.task" :key="task.id" :task="task" />
      <CreateTask />
    </div>
    <div>
      <button @click="deleteByCardId">
        Delete
      </button>
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

      tasks: computed(() => AppState.tasks)
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
          await cardsService.editCard(props.card)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

    <style lang="scss" scoped>
    </style>
