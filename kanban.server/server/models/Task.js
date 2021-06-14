import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    content: { type: String },
    cardId: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
    tag: { type: Object }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
