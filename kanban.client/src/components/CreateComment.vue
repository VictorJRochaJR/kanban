<template>
  <div class="add" @click="toggleForm" v-if="!state.toggle">
    + add task
  </div>
  <form @submit.prevent="createComment">
    <div class="form-group">
      <label class="sr-only" for="Comment Title"></label>
      <input v-model="state.newComment.title" placeholder="Comment Title..." required>
    </div>
    <div class="form-group">
      <label class="sr-only" for="Comment Content"></label>
      <input v-model="state.newComment.content" placeholder="Comment Content...">
    </div>
    <button class="btn btn-primary" type="submit">
      post comment
    </button>
  </form>
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

</style>
