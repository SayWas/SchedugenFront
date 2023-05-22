<script setup>
import {RouterLink, RouterView} from 'vue-router'
import Header from "@/components/Header.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import store from "@/store";
</script>

<template>
  <RouterView v-if="store.state.access_token === ''"/>
  <div v-else>
    <Header/>
    <div class="body">
      <NavigationBar/>
      <div class="f-one">
        <div v-if="!store.state.page_is_loaded" class="wrapper">
          <img src="./assets/loading.gif" class="loading-gif" alt="Loading...">
        </div>
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
}

.f-one{
  flex: 1;
}

.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  background: linear-gradient(to bottom, white, rgba(0, 0, 0, 0));
}

.loading-gif{
  margin-top: 50px;
  width: 50px;
  height: 50px;
}
</style>
