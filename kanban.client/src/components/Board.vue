<template>
  <div class="col-3 m-2">
    <div class="card">
      <img class="card-img-top" :src="board.backgroundImg" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">
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
      state
    }
  }
}
</script>

<style>

</style>
