import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CardsService {
  async getCardsById(id) {
    const card = await dbContext.Card.find({ boardId: id }).populate('boardId')
    if (!card) {
      throw new BadRequest('invalid service')
    }
    return card
  }

  async createCard(cardData) {
    const card = await dbContext.Card.create(cardData)
    await card.populate('creatorId')
    return card
  }

  async editCard(cardId, cardData) {
    // const card = await dbContext.Card.findById(cardId)
    const card = await dbContext.Card.findByIdAndUpdate(cardId, cardData, { new: true, runValidators: true })
    await card.populate('creatorId').execPopulate()
    return card
  }

  async deleteByCardId(cardId, userId) {
    const card = await dbContext.Card.findOneAndRemove({ _id: cardId, creatorId: userId })
    if (!card) {
      throw new BadRequest('invalid id')
    }
    return (cardId + 'deleted')
  }
}

export const cardsService = new CardsService()
