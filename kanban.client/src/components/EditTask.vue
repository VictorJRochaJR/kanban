<template>
  <h1>edit task</h1>
  <form @submit.prevent="editTask">
    <label class="sr-only" for="Task Title"></label>
    <input v-model="state.newTask.title" placeholder="Task Title..." required>
    <label class="sr-only" for="Task Content"></label>
    <input v-model="state.newTask.content" placeholder="Task Content...">
    <button class="btn btn-primary" type="submit">
      edit task
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { tasksService } from '../services/TasksService'
export default {
  setup() {
    const state = reactive({
      task: computed(() => AppState.activeTask),
      newTask: {
        title: computed(() => AppState.activeTask.title),
        content: computed(() => AppState.activeTask.content),
        cardId: computed(() => AppState.activeTask.cardId)
      }
    })
    return {
      state,
      async editTask() {
        try {
          await tasksService.editTask(state.newTask)
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
