<template>
  I'm a board
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
