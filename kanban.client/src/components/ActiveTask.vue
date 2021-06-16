<template>
  <div>
    <h1>Task Component</h1>
    <EditTask />
  </div>
  <div>
    <CreateComment />
  </div>
  <div>
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'
export default {
  setup() {
    const state = reactive({
      comments: computed(() => AppState.comments),
      task: computed(() => AppState.activeTask)
    })
    watchEffect(async() => {
      try {
        await commentsService.getCommentsById(AppState.activeTask.id)
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
