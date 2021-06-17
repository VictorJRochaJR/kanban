import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:taskId', this.getCommentsById)
      .post('', this.createComment)
      .put('/:commentId', this.editComment)
      .delete('/:commentId', this.deleteByCommentId)
  }

  async deleteByCommentId(req, res, next) {
    try {
      const comment = await commentsService.deleteByCommentId(req.params.commentId, req.userInfo.id)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      const comment = await commentsService.editComment(req.params.commentId, req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsById(req, res, next) {
    try {
      const comment = await commentsService.getCommentsById(req.params.taskId)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
