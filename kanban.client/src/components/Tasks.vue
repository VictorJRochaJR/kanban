<template>
  <div class="row justify-content-between">
    <div class="border click col-8 text-center" @click="selectTask">
      <span>{{ task.title }}</span>
    </div>
    <div class="col-4">
      <button class="btn btn-info" @click="move">
        move
      </button>
      <button class="btn btn-danger ml-3 m-2" @click="deleteTask" title="Delete task">
        X
      </button>
    </div>
  </div>
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
  setup(props) {
    const state = reactive({

    })
    return {
      state,
      selectTask() {
        AppState.activeTask = props.task
      },
      move() {
        AppState.movingTask = props.task
        this.deleteTask()
      },
      async deleteTask() {
        try {
          if (await Notification.confirmAction('Do you really want to delete this task?')) {
            await tasksService.deleteByTaskId(props.task)
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
