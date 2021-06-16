<template>
  <form @submit.prevent="createTask">
    <label class="sr-only" for="Task Title"></label>
    <input v-model="state.newTask.title" placeholder="Task Title..." required>
    <label class="sr-only" for="Task Content"></label>
    <input v-model="state.newTask.content" placeholder="Task Content..." required>
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
  setup() {
    const state = reactive({
      newTask: {

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
