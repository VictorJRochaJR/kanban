<template>
  <div class="col-md-3 mx-1 mt-1 my-img p-0">
    <div class="card my-card" title="Open Board" @click="openBoard" :style="{'background-image': 'url(' + board.backgroundImg + ')'}">
      <div class="">
        <div class="rounded-circle my-btn-bg ab-pos">
          <i @click="editBoard" title="Edit Board" class="my-edit mdi mdi-pencil mdi-12px px-1">
          </i>
        </div>
      </div>
      <div class="row justify-content-center my-auto">
        <h5 class="my-text m-1">
          {{ board.title }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    board: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state,
      editBoard() {

      },
      openBoard() {

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
  height: 7rem;
  color: white;
  transition: all, 1s;
}
.my-card:hover{

  color: rgb(211, 255, 215);
}
.my-text{

text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
</style>
