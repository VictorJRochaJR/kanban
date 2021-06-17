<template>
  <div class="border">
    <form @submit.prevent="editComment">
      <div class="form-group">
        <label class="sr-only" for="Comment Title"></label>
        <input class="form-control" v-model="state.newComment.title" placeholder="Comment Title..." required>
      </div>
      <div class="form-group">
        <label class="sr-only" for="Comment Content"></label>
        <input class="form-control" v-model="state.newComment.content" placeholder="Comment Content...">
      </div>
      <button class="btn btn-primary" type="submit">
        edit comment
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { commentsService } from '../services/CommentsService'
import Notification from '../utils/Notification'
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newComment: {
        title: '',
        content: '',
        id: props.comment.id
      }
    })
    return {
      state,
      async editComment() {
        try {
          await commentsService.editComment(state.newComment)
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
