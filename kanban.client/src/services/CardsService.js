import { AppState } from '../AppState'
import { api } from './AxiosService'

class CardsService {
  async getCardsById(boardId) {
    const res = await api.get('api/cards/' + boardId)
    AppState.cards = res.data
  }

  async createCard(cardData) {
    const res = await api.post('api/cards', cardData)
    AppState.cards.push(res.data)
  }

  async editCard(cardData, cardProp) {
    await api.put('api/cards/' + cardData.id, cardData.title)
    this.getCardsById(cardProp.boardId)
  }

  async deleteByCardId(card) {
    await api.delete('api/cards/' + card.id)
    this.getCardsById(card.boardId.id)
  }
}

export const cardsService = new CardsService()
