<template>
  <header>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="d-flex justify-content-center my-footer py-1">
      <p class="p-0 m-0">
        <a target="_blank" title="Github" href="https://github.com/dhildeb"><i
          class="mdi mdi-github align-self-center ml-2"
          aria-hidden="true"
        ></i></a> Daniel Hildebrandt |<a target="_blank" title="Github" href="https://github.com/JaredVandeWater"><i
          class="mdi mdi-github align-self-center ml-2"
          aria-hidden="true"
        ></i></a> Jared VandeWater |<a target="_blank" title="Github" href="https://github.com/VictorJRochaJR"><i
          class="mdi mdi-18px mdi-github align-self-center ml-2"
          aria-hidden="true"
        ></i></a> Victor Rocha
      </p>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.my-footer{
background-color: rgba(0, 0, 0, 0.876);
color: rgba(255, 255, 255, 0.548);
}

</style>
