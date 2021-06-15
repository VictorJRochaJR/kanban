import { AppState } from '../AppState'
import { api } from './AxiosService'

class CardsService {
  async getCardsById(id) {
    const res = await api.get('api/cards/' + '60c8cdc128a0d91eb023a2cc')
    console.log('thecards', res.data.cards)
    AppState.cards = res.data.cards
  }
}

export const cardsService = new CardsService()
