<template>
  <h1>Comment Component</h1>
  <div>
    <span class="rounded-circle creator-img">{{ comment.creatorId.picture }}</span>
    <span>{{ comment.creatorId.name }}</span>
  </div>
  <h2>{{ comment.title }}</h2>
  <p>{{ comment.content }}</p>
  <EditComment :comment="comment" />
  <button class="btn btn-primary" @click="showEditForm">
    edit comment
  </button>
  <button class="btn btn-primary" @click="deleteComment">
    delete comment
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
  setup() {
    const state = reactive({

    })
    return {
      state,
      async deleteComment(props) {
        try {
          if (await Notification.confirmAction('Do you really want to delete this comment?')) {
            await commentsService.deleteByCommentId(props.comment.id)
          }
        } catch (error) {
          Notification.toast(error)
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
