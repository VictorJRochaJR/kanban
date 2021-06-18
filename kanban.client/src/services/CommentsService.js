import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getCommentsById(taskId) {
    if (taskId !== undefined) {
      const res = await api.get('api/comments/' + taskId)
      AppState.comments[taskId] = res.data
    }
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    AppState.comments[commentData.taskId].push(res.data)
    this.getCommentsById(AppState.activeTask.id)
  }

  async editComment(commentData) {
    await api.put('api/comments/' + commentData.id, commentData)
    this.getCommentsById(AppState.activeTask.id)
  }

  async deleteByCommentId(commentId) {
    await api.delete('api/comments/' + commentId)
    this.getCommentsById(AppState.activeTask.id)
  }
}

export const commentsService = new CommentsService()
