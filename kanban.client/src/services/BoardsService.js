import { AppState } from '../AppState'
import { api } from './AxiosService'

class BoardsService {
  async getBoardsById() {
    const res = await api.get('api/boards')
    AppState.allBoards = res.data
  }

  async getOneBoard(boardId) {
    const res = await api.get(`api/boards/${boardId}`)
    AppState.activeBoard = res.data
  }

  async createBoard(boardData) {
    const res = await api.post('api/boards', boardData)
    AppState.allBoards.push(res.data)
  }

  async editBoard(boardId, boardData) {
    await api.put('api/boards/' + boardId, boardData)
    this.getBoardsById(AppState.account.id)
  }

  async deleteByBoardId(boardId) {
    await api.delete('api/boards/' + boardId)
    this.getBoardsById(AppState.account.id)
  }
}

export const boardsService = new BoardsService()
