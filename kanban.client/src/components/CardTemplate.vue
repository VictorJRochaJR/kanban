<template>
  <h1>Card info</h1>
  <div class="CreateCard row">
    <form id="createCardForm" @submit.prevent="createCard">
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
  <div>
    {{ card.title }}
  </div>
  <Task v-for="task in state.task" :key="task.id" :task="task" />
</template>

<script>
import { reactive } from '@vue/reactivity'
import { cardsService } from '../services/CardsService'
// import { AppState } from '../AppState'
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
      newCard: {},
      formhidden: true,
      tasks: computed(() => AppState.tasks)
    })
    watchEffect(() => {
      tasksService.getTasksById(props.card.id)
    })
    return {
      state,
      isHidden() {
        state.formhidden = !state.formhidden
      },
      async createCard() {
        try {
          await cardsService.createCard(state.newCard)
        } catch (error) {
          console.log(error)
        }
      },

      async deleteCardById() {
        if (await Notification.confirmAction('Are you sure you want to delete?')) {
          cardsService.deleteCardById(props.card.id)
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
  },
  components: {}
}
</script>

<style lang="scss" scoped>
</style>
