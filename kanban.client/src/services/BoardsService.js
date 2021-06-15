import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BoardsService {
  async getBoardsById(creatorId) {
    const res = await api.get(`api/boards/${creatorId}`)
    logger.log(res)
    AppState.allBoards = res.data
  }

  async getOneBoard(creatorId, boardId) {
    const res = await api.get(`api/${creatorId}/${boardId}`)
    logger.log(res)
    AppState.activeBoard = res.data
  }

  async createBoard() {

  }
}

export const boardsService = new BoardsService()
