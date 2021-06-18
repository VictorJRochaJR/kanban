<template>
  <div class="d-flex border-bottom my-3 bg-dark">
    <div class="d-flex flex-column mr-3">
      <img class="rounded-circle creator-img" :src="comment.creatorId.picture">
      <span>{{ comment.creatorId.name }}</span>
    </div>
    <p>"{{ comment.title }}"</p>
    <button class="btn btn-danger m-4" title="Delete Comment" @click="deleteComment">
      X
    </button>
  </div>
  <!-- <div v-if="state.editComment">
    <EditComment :comment="comment" />
  </div>
  <button class="btn btn-info" @click="showEditForm">
    {{ state.editComment ? 'cancel' : 'edit comment' }}
  </button> -->
</template>

<script>
import { reactive } from '@vue/reactivity'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      editComment: false
    })
    return {
      state,
      showEditForm() {
        state.editComment = !state.editComment
      },
      async deleteComment() {
        try {
          if (await Notification.confirmAction('Do you really want to delete this comment?')) {
            await commentsService.deleteByCommentId(props.comment.id)
          }
        } catch (error) {
          Notification.toast(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.creator-img{
  height: 50px;
  width: 50px;
}
</style>
