import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async getOneTask(cardId, taskId) {
    const res = await api.get(`api/tasks/${cardId}/${taskId}`)
    AppState.activeTask = res.data
  }

  async getTasksById(cardId) {
    const res = await api.get('api/tasks/' + cardId)
    AppState.tasks[cardId] = res.data
  }

  async createTask(taskData) {
    const res = await api.post('api/tasks', taskData)
    console.log(taskData)
    AppState.tasks[taskData.cardId].push(res.data)
  }

  async editTask(taskData) {
    await api.put('api/tasks/' + taskData.id, taskData)
    this.getTasksById(taskData.cardId)
    logger.log(AppState.tasks)
  }

  async deleteByTaskId(taskData) {
    await api.delete('api/tasks/' + taskData.id)
    this.getTasksById(taskData.cardId)
  }
}

export const tasksService = new TasksService()
