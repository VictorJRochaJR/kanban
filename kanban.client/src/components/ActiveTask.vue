<template>
  <div class="border col-12 p-3 mb-5 mt-3">
    <div v-if="!state.taskEdit">
      <h4 class="pb-3">
        {{ state.task.title }}
      </h4>
      <p>{{ state.task.content }}</p>
    </div>
    <button class="btn btn-info" @click="toggleTaskEdit">
      {{ state.taskEdit ? 'cancel' : 'edit task' }}
    </button>
    <div v-if="state.taskEdit">
      <EditTask />
    </div>
  </div>
  <div class="border shadow col-12 p-0">
    <h4 class="m-2">
      Comments
    </h4>
    <CreateComment />
    <div class="border bg-white p-5">
      <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
    </div>
  </div>
  <button @click="back" class="btn btn-danger mt-5 col">
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
