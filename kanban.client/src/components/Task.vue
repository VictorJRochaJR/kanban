<template>
  <div>
    <h1>Task Component</h1>
    <h2>{{ task.title }}</h2>
    <p>{{ task.content }}</p>
  </div>
  <div>
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    task: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      comments: computed(() => AppState.comments)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
