import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CardsService {
  async getCardsById(boardId) {
    const card = await dbContext.Card.find({ boardId: boardId }).populate('boardId')
    if (!card) {
      throw new BadRequest('invalid service')
    }
    return card
  }

  async createCard(cardData, boardId) {
    const card = await dbContext.Card.create
    // await card.populate('creatorId')
    return card
  }

  async editCard(cardId, cardData) {
    // const board = await dbContext.Board.findById(boardId)
    const card = await dbContext.Card.findByIdAndUpdate(cardId, cardData, { new: true, runValidators: true })
    await card.populate('creatorId').execPopulate()
    return card
  }

  async deleteByCardId(cardId) {
    await dbContext.Card.findOneAndDelete(cardId)
    return 'deleted'
  }
}

export const cardsService = new CardsService()
