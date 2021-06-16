<template>
  <div v-if="!state.user.isAuthenticated" class=" container-fluid home-bg my-text">
    <div class="row justify-content-center mt-5 text-center">
      <h1>
        Welcome to KanBan!
      </h1>
    </div>

    <div class="row fillRemaining">
      <div class="flex-column  d-flex align-items-center my-auto p-5  my-signin">
        Sign In
      </div>
    </div>
  </div>

  <div v-if="state.user.isAuthenticated" class="container-fluid boards-bg">
    <div class="row justify-content-center">
      <Board v-for="b in state.boards" :key="b.id" :board="b" />
      <CreateBoard />
    </div>
  </div>
</template>

<script>

import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.allBoards),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })

    return {
      state
    }
  }
}
</script>

<style>

 .home-bg{
   background-color: black;
   background-image: url("../assets/img/shattered-island.gif");
 }
  .boards-bg{
   background-color: black;
   background-image: url("../assets/img/chalkboard.jpg");
 }
 .my-text{
color: white;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
.fillRemaining{
height: calc(100vh - (56px + 48px + 71px));
}
</style>
