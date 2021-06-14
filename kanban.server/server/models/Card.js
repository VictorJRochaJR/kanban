import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CardSchema = new Schema(
  {
    title: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    cardColor: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
