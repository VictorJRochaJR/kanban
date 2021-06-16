<template>
  <h1>Board Page</h1>
  <Card />
  <ActiveTask v-if="task.id" />
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Board',
  setup() {
    const state = reactive({
      task: computed(() => AppState.activeTask)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
