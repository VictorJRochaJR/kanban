<template>
  <div class="col-3 m-2 my-img">
    <div class="card" :style="{'background-image': 'url(' + board.backgroundImg + ')'}">
      <!-- <img class="card-img-top" :src="board.backgroundImg" alt="Card image cap"> -->
      <h5>
        {{ board.title }}
      </h5>
    </div>
    <button class="btn btn-warning btn-sm">
      Edit
    </button>
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
      state
    }
  }
}
</script>

<style>
</style>
