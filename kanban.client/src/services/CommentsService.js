import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getCommentsById(taskId) {
    const res = await api.get('api/comments/' + taskId)
    logger.log(res)
    AppState.comments[taskId] = res.data
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    console.log(commentData.taskId)
    AppState.comments[commentData.taskId].push(res.data)
    console.log(AppState.comments)
    this.getCommentsById(AppState.activeTask.id)
  }

  async editComment(commentData) {
    await api.put('api/comments/' + commentData.id, commentData)
    this.getCommentsById(AppState.activeTask.id)
    logger.log(AppState.tasts)
  }

  async deleteByCommentId(commentId) {
    await api.delete('api/comments/' + commentId)
    this.getCommentsById(AppState.activeTask.id)
    logger.log(AppState.tasks)
  }
}

export const commentsService = new CommentsService()
