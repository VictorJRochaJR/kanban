import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getOneTask(taskId) {
    const task = await dbContext.Task.findById(taskId).populate('creatorId')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async getTasksById(id) {
    const task = await dbContext.Task.find({ cardId: id })
    if (!task) {
      throw new BadRequest('invalid service')
    }
    return task
  }

  async createTask(taskData) {
    const task = await dbContext.Task.create(taskData)
    await task.populate('creatorId')
    return task
  }

  async editTask(taskId, taskData) {
    const task = await dbContext.Task.findByIdAndUpdate(taskId, taskData, { new: true, runValidators: true })
    await task.populate('creatorId').execPopulate()
    return task
  }

  async deleteByTaskId(taskId, userId) {
    const task = await dbContext.Task.findOneAndRemove({ _id: taskId, creatorId: userId })
    if (!task) {
      throw new BadRequest('invalid id')
    }
    return (taskId + 'deleted')
  }
}

export const tasksService = new TasksService()
