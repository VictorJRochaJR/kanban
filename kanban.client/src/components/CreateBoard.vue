<template>
  <!-- Button trigger modal -->

  <div class="col-md-4 col-lg-3 p-0 ">
    <div class="card my-button justify-content-center mx-4 mt-4" title="Create Board" type="button" data-toggle="modal" data-target="#exampleModal">
      <div class="row">
        <div class="col d-flex justify-content-center my-auto">
          <h5 class="m-0">
            <i class=" mdi mdi-plus-thick mdi-36px">
            </i>
          </h5>
        </div>
      </div>
    </div>
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
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'
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
        $('#exampleModal').modal('hide')
        state.newBoard = {}
      }
    }
  }
}
</script>

<style>
.my-button{
  cursor: pointer;
  height: 13rem;
  color: rgba(241, 255, 246, 0.623);
  border: 3px;
  border-style:dashed;
  background-color: transparent;
  transition: all 1s;
  transform: scale(.9)
}
.my-button:hover{
  transform: scale(1);
  color: rgba(40, 172, 36, 0.671);

}
</style>
