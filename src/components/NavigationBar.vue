<template>
  <div class="sidebar">
    <div class="dummy"></div>
    <router-link to="/" class="item">Кабинеты</router-link>
    <router-link to="/classes" class="item">Классы</router-link>
    <router-link to="/subjects" class="item">Предметы</router-link>
    <router-link to="/teachers" class="item">Учителя</router-link>
    <router-link to="/conditions" class="item">Ограничения</router-link>
    <router-link to="/schedule" class="item">Расписание</router-link>
  </div>
</template>

<script>
export default {
  name: "NavigationBar"
}
</script>

<style scoped>
.sidebar {
  display: flex;
  position: sticky;
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: white;
  border-right: solid 1px #E9EDF5;
  flex-direction: column;
}

.sidebar .dummy {
  height: 60px;
  border-bottom: solid 1px #E9EDF5;
}

.sidebar .item {
  display: flex;
  color: black;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: inherit;
  font-weight: bold;
  text-decoration: none;
  border-bottom: solid 1px #E9EDF5;
  height: 50px;
  position: relative;
  transition: 0.1s ease-out;
  cursor: pointer;
}

.sidebar .item:hover {
  background-color: #DFDFDF;
  text-decoration: none;
}
</style>