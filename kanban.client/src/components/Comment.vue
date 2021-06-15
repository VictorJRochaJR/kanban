<template>
  <h1>Comment Component</h1>
  <h2>{{ comment.title }}</h2>
  <p>{{ comment.content }}</p>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    comment: { type: Object, required: true }
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
