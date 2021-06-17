<template>
  <div class="row justify-content-between my-3 p-3 shadow border rounded fill">
    <div class="click text-left col" @click="selectTask">
      <span>{{ task.title }}</span>
    </div>
    <div class=" ">
      <div class="dropdown click text-secondary align-top"
           id="dropdownMenuButton"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false"
      >
        ...
      </div>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button class="text-info dropdown-item" @click="move">
          Move Task
        </button>
        <button class="text-danger dropdown-item" @click="deleteTask" title="Delete task">
          Delete Task
        </button>
      </div>
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
.fill{
  min-width: 90%;
}
</style>
