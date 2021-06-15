<template>
  <h1>Board Page</h1>
  <Card />
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Board',
  setup() {
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
