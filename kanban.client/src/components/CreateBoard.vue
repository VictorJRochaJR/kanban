<template>
  <!-- Button trigger modal -->
  <div class="col-4">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      New Board
    </button>
  </div>

  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <form @submit.prevent="createBoard">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <label class="sr-only" for="Board Title"></label>
            <input v-model="state.newBoard.title" class="modal-title w-100" placeholder="Board Title..." required>
          </div>
          <div class="modal-body">
            <label class="sr-only" for="Board Image URL"></label>
            <input v-model="state.newBoard.backgroundImg" class="modal-title w-100" placeholder="Img URL...">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal">
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { boardsService } from '../services/BoardsService'
export default {
  setup() {
    const state = reactive({
      newBoard: {}
    })
    return {
      state,
      createBoard() {
        boardsService.createBoard(state.newBoard)
        state.newBoard = {}
      }
    }
  }
}
</script>

<style>

</style>
