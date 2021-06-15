import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CardsService {
  async getCardsById() {
    const route = useRoute()
    const res = await api.get('api/cards/' + route.params)
    logger.log(res)
    AppState.cards = res.data
  }

  async createCard(cardData) {
    const res = await api.post('api/cards', cardData)
    logger.log(res)
    AppState.cards.push(res.data)
  }

  async editCard(cardData) {
    await api.put('api/cards/' + cardData.id, cardData)
    this.getCardsById(AppState.activeBoard.id)
  }

  async deleteByCardId(cardId) {
    const res = await api.delete('api/cards/' + cardId)
    logger.log(res)
    this.getCardsById(AppState.activeBoard.id)
  }
}

export const cardsService = new CardsService()
