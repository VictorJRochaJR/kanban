<template>
  <div @dragstart="prepToMove" draggable="true" class="row justify-content-between my-3 p-3 shadow border rounded bg-white">
    <div class="click text-left col">
      <b @click="selectTask" :style="{'color': color}">{{ task.title }}</b>
    </div>
    <div class="dropdown click text-secondary align-top"
         id="dropdownMenuButton"
         data-toggle="dropdown"
         aria-haspopup="true"
         aria-expanded="false"
         title="options"
    >
      ...
    </div>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <button class="text-danger dropdown-item" @click="deleteTask" title="Delete task">
        Delete Task
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
    task: { type: Object, required: true },
    color: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state,
      selectTask() {
        AppState.activeTask = props.task
      },
      prepToMove() {
        tasksService.prepToMove(props.task)
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
