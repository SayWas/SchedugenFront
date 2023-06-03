<template>
  <div v-show="mistakesAreShown" class="modal">
    <div v-show="mistakesAreShown" class="modal-content">
      <div class="modal-header">
        <div class="modal-title">
          Ошибки в расписании
        </div>
        <button class="button cancel-button" @click="close">Закрыть</button>
      </div>
      <div v-if="!mistakesAreLoaded" class="wrapper">
        <img src="src/assets/loading.gif" class="loading-gif" alt="Loading...">
      </div>
      <div v-else class="modal-body">
        <slot name="modal-body"/>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "Mistakes",
  computed: {
    store() {
      return store
    }
  },
  props: {
    mistakesAreShown: {
      type: Boolean,
      required: true
    },
    mistakesAreLoaded: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}) {
    const close = () => {
      emit("close");
    };
    return {close};
  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.modal .modal-content {
  display: flex;
  flex-direction: column;
  width: 600px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: white;
}

.modal .modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  background-color: var(--color-header);
}

.modal .modal-title {
  font-size: 20px;
  font-weight: normal;
  color: white;
}

.modal .modal-body {
  overflow-y: scroll;
  flex: 1;
  padding: 20px;
  max-height: 600px;
}

.modal .cancel-button {
  color: #BE1D1D;
}

.modal .button {
  position: absolute;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  margin-left: 500px;
  outline: none;
  border: none;
  border-radius: 5px;
}

.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: linear-gradient(to bottom, white, rgba(0, 0, 0, 0));
}

.loading-gif{
  margin: 50px;
  width: 50px;
  height: 50px;
}
</style>