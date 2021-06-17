<template>
  <div v-if="!state.user.isAuthenticated" class=" container-fluid home-bg my-text">
    <div class="row d-none d-md-block invisrow">
    </div>
    <div class="row justify-content-center my-5 text-center">
      <h1 class="main-title">
        Welcome to Kanban!
      </h1>
    </div>

    <div class="row mt-3">
      <div class="col my-auto d-flex justify-content-center">
        <button @click="login" title="Sign In" class="myButton ">
          Sign In
        </button>
      </div>
    </div>
  </div>

  <div v-if="state.user.isAuthenticated" class="container-fluid boards-bg">
    <div class="row">
      <div class="col d-flex justify-content-center my-text mb-2 my-top-m">
        <h2><u>My Kanban Boards</u></h2>
      </div>
      <button @click="logout" title="Sign Out" class="myButton2 m-4 pos-ab">
        Sign Out
      </button>
    </div>
    <div class="row justify-content-center">
      <Board v-for="b in state.boards" :key="b.id" :board="b" />
      <CreateBoard />
    </div>
  </div>
</template>

<script>

import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      boards: computed(() => AppState.allBoards),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })

    return {
      state,
      async login() {
        AuthService.loginWithRedirect()
      },
      async logout() {
        AuthService.logout()
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');

.invisrow{
  min-height: 9rem;
}

.main-title {
  animation: swing 3s infinite ease-in-out, color-change 10s infinite;
  font-size: 64px;
}

@keyframes swing{
  0%,
  100% { transform: rotate(-10deg); }
  20% {transform:scale(.95);}
  50% { transform: rotate(10deg); }
  80% {transform:scale(.95);}
}

@keyframes color-change {

  0% { color: red; }
  12.5% { color: rgb(255, 136, 0); }
  25% { color: rgb(255, 238, 0); }
  37.5% { color: rgb(136, 255, 0); }
  50% { color: rgb(0, 255, 76); }
  62.5% { color: rgb(0, 255, 234); }
  75% { color: rgb(0, 60, 255); }
  87.5% { color: rgb(255, 0, 255); }
  100% { color: red; }
  }

.pos-ab{
  position: absolute;
}
 .home-bg{
   background-color: black;
   background-image: url("../assets/img/shattered-island.gif");
 }
  .boards-bg{
   background-color: black;
   background-image: url("../assets/img/chalkboard.jpg");
 }
 .my-text{
font-family: 'Reggae One', cursive;
color: white;
text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px, rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px, rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
.fillRemaining{
height: calc(100vh - (56px + 48px + 71px));
}

.my-top-m{
  margin-top: 5rem;
}

.myButton {
background:linear-gradient(to bottom, #525252 5%, #000000 100%);
background-color:#525252;
border-radius:42px;
border:2px solid #a8a8a8;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:30px;
font-weight:bold;
padding:20px 60px;
text-decoration:none;
}
.myButton:hover {
background:linear-gradient(to bottom, #000000 5%, #525252 100%);
background-color:#000000;

}
.myButton:active {
position:relative;
top:1px;
}

.myButton2 {
  z-index: 3;
background:linear-gradient(to bottom, #525252 5%, #000000 100%);
background-color:#525252;
border-radius:36px;
border:1px solid #a8a8a8;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:16px;
padding:2px 12px;
text-decoration:none;
}
.myButton2:hover {
background:linear-gradient(to bottom, #000000 5%, #525252 100%);
background-color:#000000;

}
.myButton2:active {
position:absolute;
top:1px;
}

</style>
