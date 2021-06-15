import { Auth0Provider } from '@bcwdev/auth0provider'
import { cardsService } from '../services/CardsService'
import BaseController from '../utils/BaseController'

export class CardsController extends BaseController {
  constructor() {
    super('api/cards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:boardId', this.getCardsById)
      .post('', this.createCard)
      .put('/:cardId', this.editCard)
      .delete('/:cardId', this.deleteByCardId)
  }

  async deleteByCardId(req, res, next) {
    try {
      const card = await cardsService.deleteByCardId(req.params.cardId)
      return res.send(card)
    } catch (error) {
      next(error)
    }
  }

  async editCard(req, res, next) {
    try {
      const card = await cardsService.editCard(req.params.cardId, req.body)
      return res.send(card)
    } catch (error) {
      next(error, 'controllerror')
    }
  }

  async createCard(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const card = await cardsService.createCard(req.body)
      return res.send(card)
    } catch (error) {
      next(error)
    }
  }

  async getCardsById(req, res, next) {
    try {
      const card = await cardsService.getCardsById(req.params.boardId)
      return res.send(card)
    } catch (error) {
      next(error, 'controller')
    }
  }
}
