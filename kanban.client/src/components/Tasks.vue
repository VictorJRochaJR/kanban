<template>
  <h1>tasks list</h1>
  <span class="click" @click="selectTask">{{ task.title }}</span>
  <button @click="deleteTask">
    delete task
  </button>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { tasksService } from '../services/TasksService'
export default {
  props: {
    task: { type: Object, required: true }
  },
  setup() {
    const state = reactive({

    })
    return {
      state,
      selectTask(props) {
        AppState.activeTask = props.task
      },
      async deleteTask(props) {
        try {
          if (await Notification.confirmAction('Do you really want to delete this task?')) {
            await tasksService.deleteByTaskId(props.task.id)
          }
        } catch (error) {
          Notification.toast(error.message)
        }
      }
    }
  }
}
</script>

<style scope>
.click{
  cursor: pointer;
}
</style>
