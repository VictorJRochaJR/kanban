<template>
  <form @submit.prevent="createComment">
    <label class="sr-only" for="Comment Title"></label>
    <input v-model="state.newComment.title" placeholder="Comment Title..." required>
    <label class="sr-only" for="Comment Content"></label>
    <input v-model="state.newComment.content" placeholder="Comment Content..." required>
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
      }
    })
    return {
      state,
      async createComment() {
        try {
          await commentsService.createComment(state.newComment)
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
