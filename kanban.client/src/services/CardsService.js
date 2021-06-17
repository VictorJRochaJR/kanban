import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CardsService {
  async getCardsById(boardId) {
    console.log('board', boardId)
    const res = await api.get('api/cards/' + boardId)
    logger.log(res, 'getcards')
    AppState.cards = res.data
  }

  async createCard(cardData) {
    console.log(cardData)
    const res = await api.post('api/cards', cardData)
    logger.log(res)
    AppState.cards.push(res.data)
  }

  async editCard(cardData, cardProp) {
    console.log(cardData.id, 'cardid')
    await api.put('api/cards/' + cardData.id, cardData.title)
    this.getCardsById(cardProp.boardId)
  }

  async deleteByCardId(cardId) {
    const res = await api.delete('api/cards/' + cardId)
    logger.log(res)
    this.getCardsById(AppState.activeBoard.id)
  }
}

export const cardsService = new CardsService()
