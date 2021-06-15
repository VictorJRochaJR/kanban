import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getCommentsById(taskId) {
    const res = api.get('api/comments/' + taskId)
    logger.log(res)
    AppState.comments = res.data
  }
}

export const commentsService = new CommentsService()
