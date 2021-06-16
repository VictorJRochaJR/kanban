<template>
  <form @submit.prevent="editComment">
    <label class="sr-only" for="Comment Title"></label>
    <input v-model="state.newComment.title" placeholder="Comment Title..." required>
    <label class="sr-only" for="Comment Content"></label>
    <input v-model="state.newComment.content" placeholder="Comment Content...">
    <button class="btn btn-primary" type="submit">
      edit comment
    </button>
  </form>
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
