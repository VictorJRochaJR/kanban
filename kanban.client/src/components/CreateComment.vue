<template>
  <div class="add text-center bg-dark" @click="toggleForm" v-if="!state.toggle">
    + add comment
  </div>
  <div class="border bg-light shadow p-3 m-3" v-if="state.toggle">
    <form @submit.prevent="createComment">
      <div class="form-group">
        <label class="sr-only" for="Comment"></label>
        <input v-model="state.newComment.title" type="textArea" rows="4" placeholder="Comment..." required>
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
  border: 3px;
  border-color: #ffffff;
  border-style:dashed;
  background-color: transparent;
  transition: all 1s;
  transform: scale(.9)
}
.add:hover{
  transform: scale(1);
}
</style>
