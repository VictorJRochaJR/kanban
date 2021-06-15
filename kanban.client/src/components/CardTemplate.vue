<template>
  <div class="row">
    {{ card.title }}
  </div>
</template>

<script>

export default {
  props: {
    card: { type: Object, required: true }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
