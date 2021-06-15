<template>
  <div class="row">
    {{ card.title }}
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { cardsService } from '../services/CardsService'
// import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  props: {
    card: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({

    })
    return {
      state,

      async deleteCardById() {
        if (await Notification.confirmAction('Are you sure you want to delete?')) {
          cardsService.deleteCardById(props.card.id)
          console.log(props.card.id, 'deleted card')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
