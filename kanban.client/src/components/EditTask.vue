<template>
  <h5>edit task</h5>
  <form @submit.prevent="editTask">
    <div class="form-group">
      <label for="Task Title">task title</label>
      <input class="form-control" v-model="state.newTask.title" required>
    </div>
    <div class="form-group">
      <label for="Task Content">task content</label>
      <input class="form-control" v-model="state.newTask.content">
    </div>
    <button class="btn btn-primary" type="submit">
      submit edit
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
