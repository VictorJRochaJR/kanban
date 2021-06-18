<template>
  <div class="bg-light w-75 p-4 my-text text-wrap m-auto">
    <div class="border p-3 mb-5 mt-3 bg-dark">
      <div v-if="!state.taskEdit">
        <h4 class="pb-3 border-bottom">
          {{ state.task.title }}
        </h4>
        <p class="ml-5">
          {{ state.task.content }}
        </p>
      </div>
      <!-- <button class="btn btn-info" @click="toggleTaskEdit">
        {{ state.taskEdit ? 'cancel' : 'edit task' }}
      </button>
      <div v-if="state.taskEdit">
        <EditTask />
      </div> -->
    </div>
    <div class="border shadow p-0 bg-dark">
      <h4 class="m-2">
        Comments
      </h4>
      <CreateComment />
      <div class="border bg-dark p-5">
        <Comment v-for="comment in state.comments" :key="comment.id" :comment="comment" />
      </div>
    </div>
    <button @click="back" class="btn btn-danger mt-5 col">
      back
    </button>
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
      comments: computed(() => AppState.comments[AppState.activeTask.id]),
      task: computed(() => AppState.activeTask),
      taskEdit: false
    })
    watchEffect(async() => {
      try {
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
 .my-text{
font-family: 'Reggae One', cursive;
color: white;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
.text-wrap{
      overflow-wrap: anywhere;
}

</style>
