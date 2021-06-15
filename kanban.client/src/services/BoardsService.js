import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getBoardsById() {
    const res = await api.get('api/boards')
    logger.log(res)
    AppState.allBoards = res.data
  }

  async getOneBoard(creatorId, boardId) {
    const res = await api.get(`api/${creatorId}/${boardId}`)
    logger.log(res)
    AppState.activeBoard = res.data
  }

  async createBoard(boardData) {
    const res = await api.post('api/boards', boardData)
    logger.log(res)
    AppState.allBoards.push(res.data)
  }

  async editBoard(boardId, boardData) {
    await api.put('api/boards/' + boardId, boardData)
    this.getBoardsById(AppState.account.id)
    logger.log(AppState.allBoards)
  }

  async deleteByBoardId(boardId) {
    const res = await api.delete('api/boards/' + boardId)
    logger.log(res)
    this.getBoardsById(AppState.account.id)
  }
}

export const boardsService = new BoardsService()
