import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getOneBoard(boardId) {
    const board = await dbContext.Board.findById(boardId).populate('creatorId')
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

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
    const board = await dbContext.Board.findByIdAndUpdate(boardId, boardData, { new: true, runValidators: true })
    await board.populate('creatorId').execPopulate()
    return board
  }

  async deleteByBoardId(boardId, userId) {
    const newBoard = await dbContext.Board.findOneAndRemove({ _id: boardId, creatorId: userId })
    if (!newBoard) {
      throw new BadRequest('invalid id')
    }
    return (boardId + 'deleted')
  }
}

export const boardsService = new BoardsService()
