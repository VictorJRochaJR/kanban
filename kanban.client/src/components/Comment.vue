<template>
  <div>
    <span class="rounded-circle creator-img">{{ comment.creatorId.picture }}</span>
    <span>{{ comment.creatorId.name }}</span>
  </div>
  <h2>{{ comment.title }}</h2>
  <p>{{ comment.content }}</p>
  <div v-if="state.editComment">
    <EditComment :comment="comment" />
  </div>
  <button class="btn btn-info" @click="showEditForm">
    {{ state.editComment ? 'cancel' : 'edit comment' }}
  </button>
  <button class="btn btn-danger" title="Delete Comment" @click="deleteComment">
    X
  </button>
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
        console.log(props.comment)
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
