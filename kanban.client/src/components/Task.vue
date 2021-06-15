<template>
  <h1>Task Component</h1>
  <h2>{{ task.title }}</h2>
  <p>{{ task.content }}</p>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    task: { type: Object, required: true }
  },
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
