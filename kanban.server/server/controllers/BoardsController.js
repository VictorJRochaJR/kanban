import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import BaseController from '../utils/BaseController'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:creatorId', this.getBoardsById)
      .post('', this.createBoard)
      .put('/:boardId', this.editBoard)
      .delete('/:boardId', this.deleteByBoardId)
  }

  async deleteByBoardId(req, res, next) {
    try {
      const board = await boardsService.deleteByBoardId(req.params.boardId, req.userInfo.Id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async editBoard(req, res, next) {
    try {
      const board = await boardsService.editBoard(req.params.boardId, req.body)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const board = await boardsService.createBoard(req.body)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async getBoardsById(req, res, next) {
    try {
      const board = await boardsService.getBoardsById(req.params.creatorId)
      return res.send(board)
    } catch (error) {
      next(error, 'controller')
    }
  }
}
