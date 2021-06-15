import { api } from './AxiosService'

class BoardsService {
  async getAllBoards(id) {
    const res = await api.get(`/api/boards/${id}`)
    console.log(res)
  }
}

export const boardsService = new BoardsService()
