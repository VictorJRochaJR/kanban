<template>
  <form class="border py-1 my-3" @submit.prevent="createTask">
    <div class="form-group">
      <label class="sr-only" for="Task Title"></label>
      <input class="form-control" v-model="state.newTask.title" placeholder="Task Title..." required>
    </div>
    <div class="form-group">
      <label class="sr-only" for="Task Content"></label>
      <input class="form-control" v-model="state.newTask.content" placeholder="Task Content..." required>
    </div>
    <button class="btn btn-primary" type="submit">
      create task
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Notification from '../utils/Notification'
import { tasksService } from '../services/TasksService'
export default {
  props: {
    cardId: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({
      newTask: {
        cardId: props.cardId
      }
    })
    return {
      state,
      async createTask() {
        try {
          await tasksService.createTask(state.newTask)
        } catch (error) {
          Notification.toast(error.message)
        }
      }

    }
  }
}
</script>

<style>

</style>
