import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getCommentsById(taskId) {
    const comment = await dbContext.Comment.find({ taskId: taskId })
    comment.populate('creatorId').execPopulate()
    if (!comment) {
      throw new BadRequest('invalid service')
    }
    return comment
  }

  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    comment.populate('creatorId').execPopulate()
    return comment
  }

  async editComment(commentId, commentData) {
    const comment = await dbContext.Comment.findByIdAndUpdate(commentId, commentData, { new: true })
    await comment.populate('creatorId').execPopulate()
    return comment
  }

  async deleteByCommentId(commentId) {
    const comment = await dbContext.Comment.findOneAndRemove({ _id: commentId })
    if (!comment) {
      throw new BadRequest('invalid id')
    }
    return (commentId + 'deleted')
  }
}

export const commentsService = new CommentsService()
