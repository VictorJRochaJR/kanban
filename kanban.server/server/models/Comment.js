import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
