import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BoardSchema = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    backgroundImg: { type: String, default: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
BoardSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
