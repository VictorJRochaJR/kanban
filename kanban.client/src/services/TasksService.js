import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import api from './AxiosService'

class TasksService {
  async getOneTask(cardId, taskId) {
    const res = await api.get(`api/tasks/${cardId}/${taskId}`)
    AppState.activeTask = res.data
  }

  async getTasksById(cardId) {
    const res = await api.get('api/tasks/' + cardId)
    logger.log(res)
  }
}

export const tasksService = new TasksService()
