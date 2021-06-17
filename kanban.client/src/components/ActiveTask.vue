<template>
  <div class="border col-12 p-0">
    <h4 class="pb-3" v-if="!state.taskEdit">
      {{ state.task.title }}
    </h4>
    <button class="btn btn-info" @click="toggleTaskEdit">
      {{ state.taskEdit ? 'cancel' : 'edit task' }}
    </button>
    <div v-if="state.taskEdit">
      <EditTask />
    </div>
    <h4>Comments</h4>
    <CreateComment />
    <div class="border bg-white p-5">
      <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
    </div>
  </div>
  <button @click="back" class="btn btn-danger">
    back
  </button>
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
      comments: computed(() => AppState.comments[AppState.activeTask.id]),
      task: computed(() => AppState.activeTask),
      taskEdit: false
    })
    watchEffect(async() => {
      try {
        console.log(AppState.comments)
        await commentsService.getCommentsById(AppState.activeTask.id)
      } catch (error) {
        Notification.toast(error.message)
      }
    })
    return {
      state,
      toggleTaskEdit() {
        state.taskEdit = !state.taskEdit
      },
      back() {
        AppState.activeTask = {}
      }
    }
  }
}
</script>

<style>

</style>
