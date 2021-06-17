<template>
  <div class="col-md-4 col-lg-3 my-img p-0 ">
    <div class="card my-card mx-4 mt-4" title="Open Board" @click.stop="openBoard" :style="{'background-image': 'url(' + board.backgroundImg + ')'}">
      <div class="">
        <div class="rounded-circle my-btn-bg ab-pos">
          <i data-toggle="modal" data-target="#editmodal" @click.stop="editBoard" title="Edit Board" class="my-edit mdi mdi-pencil mdi-24px px-1">
          </i>
        </div>
      </div>
      <div class="row justify-content-center my-auto">
        <h4 class="my-text m-1 ">
          {{ board.title }}
        </h4>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade"
       id="editmodal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="editmodalLabel"
       aria-hidden="true"
  >
    <form @submit.prevent="updateBoard">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <button type="button" class="btn d-flex justify-content-end p-0 mr-3 mt-1" data-dismiss="modal">
            <i class="mdi mdi-close-thick mdi-24px"></i>
          </button>
          <h4 class="d-flex justify-content-center">
            Board Info
          </h4>
          <div class="modal-header p-0 px-3 pb-1">
            <label class="sr-only" for="Board Title"></label>
            <input v-model="state.activeBoard.title" class="modal-title w-100" placeholder="Board Title..." required>
          </div>
          <div class="modal-body">
            <label class="sr-only" for="Board Image URL"></label>
            <input v-model="state.activeBoard.backgroundImg" class="modal-title w-100" placeholder="Img URL...">
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button @click="deleteByBoardId" type="button" class=" myDButton" data-dismiss="modal">
              Delete
            </button>
            <button type="submit" class=" myUButton">
              Update
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
import { useRouter } from 'vue-router'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import Notification from '../utils/Notification'

export default {
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    const router = useRouter()
    const state = reactive({
      activeBoard: computed(() => AppState.activeBoard)

    })
    return {
      state,
      async editBoard() {
        try {
          await boardsService.getOneBoard(props.board.id)
          $('#editmodal').modal('show')
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      },
      async updateBoard() {
        try {
          $('#editmodal').modal('hide')
          await boardsService.editBoard(state.activeBoard.id, state.activeBoard)
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      },
      openBoard() {
        try {
          router.push(`/board/${props.board.id}`)
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      },
      async deleteByBoardId() {
        try {
          if (await Notification.confirmAction('Are you sure?', `This will permanently delete ${state.activeBoard.title}`, 'warning', 'Delete')) {
            await boardsService.deleteByBoardId(state.activeBoard.id)
          }
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      }
    }
  }
}

</script>

<style>
.my-edit{
  cursor: pointer;
  color: rgb(173, 92, 0);
  transition: all, .3s;
}
.my-edit:hover{
color: rgb(221, 169, 0);
}

.ab-pos{
  position: absolute;
  right: 1px;
}
.my-btn-bg{
  background-color: rgba(0, 0, 0, 0.233);

}
.my-card{
  cursor: pointer;
  height: 13rem;
  background-size: cover;
  border:double;
  border-color: rgba(255, 255, 255, 0.253);
  transition: all, 1s;
}
.my-card:hover{
  color: black;
  border-color: blueviolet;
  transform: scale(1.05);
}
.my-text{

text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}

.myDButton {
background:linear-gradient(to bottom, #940d0d 5%, #cc0c0c 100%);
background-color:#940d0d;
border-radius:36px;
border:1px solid #850808;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:16px;
padding:2px 12px;
text-decoration:none;
}
.myDButton:hover {
background:linear-gradient(to bottom, #cc0c0c 5%, #940d0d 100%);
background-color:#cc0c0c;

}

.myDButton:active {
position:relative;
top:1px;
}

.myUButton {
background:linear-gradient(to bottom, #0f0d94 5%, #0c39cc 100%);
background-color:#0d0f94;
border-radius:36px;
border:1px solid #080a85;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:16px;
padding:2px 12px;
text-decoration:none;
}
.myUButton:hover {
background:linear-gradient(to bottom, #0c1fcc 5%, #0d1694 100%);
background-color:#0c0fcc;

}

.myUButton:active {
position:relative;
top:1px;
}
</style>
