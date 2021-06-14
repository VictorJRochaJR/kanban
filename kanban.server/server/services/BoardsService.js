import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getBoardsById(creatorId) {
    const board = await dbContext.Board.find({ creatorId: creatorId }).populate('creatorId')
    if (!board) {
      throw new BadRequest('invalid service')
    }
    return board
  }

  async createBoard(boardData) {
    const board = await dbContext.Board.create(boardData)
    await board.populate('creatorId')
    return board
  }

  async editBoard(boardId, boardData) {
    // const board = await dbContext.Board.findById(boardId)
    return await dbContext.Board.findByIdAndUpdate(boardId, boardData, { new: true, runValidators: true }).populate('creatorId')
  }

  async deleteByBoardId(boardId, userId) {
    await dbContext.Board.findOneAndDelete({ _id: boardId, creatorId: userId })
    return 'deleted'
  }
}

export const boardsService = new BoardsService()
