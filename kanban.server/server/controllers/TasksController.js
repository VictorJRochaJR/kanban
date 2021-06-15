import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:cardId', this.getTasksById)
      .post('', this.createTask)
      .put('/:taskId', this.editTask)
      .delete('/:taskId', this.deleteByTaskId)
  }

  async deleteByTaskId(req, res, next) {
    try {
      const task = await tasksService.deleteByTaskId(req.params.taskId)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      const task = await tasksService.editTask(req.params.taskId, req.body)
      return res.send(task)
    } catch (error) {
      next(error, 'controllerror')
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.createTask(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getTasksById(req, res, next) {
    try {
      const task = await tasksService.getTasksById(req.params.cardId)
      return res.send(task)
    } catch (error) {
      next(error, 'controller')
    }
  }
}
