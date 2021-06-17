<template>
  <div class="add bg-white" @click="toggleForm" v-if="!state.toggle">
    + add task
  </div>
  <div class="border shadow p-3 m-3" v-if="state.toggle">
    <form @submit.prevent="createComment">
      <div class="form-group">
        <label class="sr-only" for="Comment"></label>
        <input v-model="state.newComment.title" placeholder="Comment..." required>
      </div>
      <button class="btn btn-primary" type="submit">
        post comment
      </button>
    </form>
    <button class="btn btn-danger" @click="toggleForm">
      cancel
    </button>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { commentsService } from '../services/CommentsService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
export default {
  setup() {
    const state = reactive({
      newComment: {
        taskId: computed(() => AppState.activeTask.id),
        title: '',
        content: ''
      },
      toggle: false
    })
    return {
      state,
      async createComment() {
        try {
          await commentsService.createComment(state.newComment)
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

<style>
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
