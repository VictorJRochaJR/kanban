import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { BoardSchema } from '../models/Board'
import { CardSchema } from '../models/Card'
import { TaskSchema } from '../models/Task'
import { CommentSchema } from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Board = mongoose.model('Board', BoardSchema)
  Card = mongoose.model('Card', CardSchema)
  Task = mongoose.model('Task', TaskSchema)
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
