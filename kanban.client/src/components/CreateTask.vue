<template>
  <div class="add" @click="toggleForm" v-if="!state.toggle">
    + add task
  </div>
  <div v-if="state.toggle" class="border bg-light shadow">
    <form class="p-2 my-3" @submit.prevent="createTask">
      <div class="form-group shadow">
        <label class="sr-only" for="Task Title"></label>
        <input class="form-control" v-model="state.newTask.title" placeholder="Task Title..." required>
      </div>
      <div class="form-group shadow">
        <label class="sr-only" for="Task Content"></label>
        <input class="form-control" v-model="state.newTask.content" placeholder="Task Content..." required>
      </div>
      <button class="btn btn-primary" type="submit">
        create task
      </button>
    </form>
    <button class="btn btn-danger justify-self-end mb-3 ml-3" @click="toggleForm">
      close
    </button>
  </div>
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
        cardId: props.cardId,
        toggle: false
      }
    })
    return {
      state,
      async createTask() {
        try {
          await tasksService.createTask(state.newTask)
          this.toggleForm()
        } catch (error) {
          Notification.toast(error.message)
        }
      },
      toggleForm() {
        state.toggle = !state.toggle
      }

    }
  }
}
</script>

<style scoped>
.add{
  height: 60px;
  cursor: pointer;
  color: rgba(88, 88, 88, 0.623);
  border: 3px;
  border-style:dashed;
  background-color: transparent;
  transition: all 1s;
  transform: scale(.9)
}
.add:hover{
  transform: scale(1);
  color: rgba(40, 172, 36, 0.671);
}
</style>
