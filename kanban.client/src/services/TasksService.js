import { AppState } from '../AppState'
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
    AppState.tasks[taskData.cardId].push(res.data)
  }

  async editTask(taskData) {
    await api.put('api/tasks/' + taskData.id, taskData)
    this.getTasksById(taskData.cardId)
  }

  async deleteByTaskId(taskData) {
    await api.delete('api/tasks/' + taskData.id)
    this.getTasksById(taskData.cardId)
  }

  prepToMove(task) {
    AppState.movingTask = task
  }

  async moveTask(cardId) {
    const oldId = AppState.movingTask.cardId
    AppState.movingTask.cardId = cardId
    const res = await api.put('api/tasks/' + AppState.movingTask.id, AppState.movingTask)
    // fix line 39 so it removes moved task from appstate
    AppState.tasks[oldId].filter(t => t.id !== oldId)
    AppState.tasks[cardId].push(res.data)
  }
}

export const tasksService = new TasksService()
