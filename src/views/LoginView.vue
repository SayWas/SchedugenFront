<template>
  <div class="login">
    <div class="login-container">
      <div class="login-title">Schedugen</div>
      <div class="login-form">
        <div class="login-form-input">
          <input v-model="login" type="text" placeholder="Логин">
        </div>
        <div class="login-form-input">
          <input v-model="password" type="password" placeholder="Пароль">
        </div>
        <div class="login-form-button">
          <button @click="loginButtonClick">Войти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      login: "",
      password: ""
    }
  },
  methods: {
    loginButtonClick() {
      axios.post("https://schedugen.pythonanywhere.com/api/login/", {
        username: this.login,
        password: this.password
      }).then(response => {
        if (response.status === 200) {
          this.$store.commit("setAccessToken", response.data.access);
          this.$router.push("/");
        } else {
          alert("Неверный логин или пароль");
        }
      });
      //this.$store.commit("setAccessToken", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMTAwMDk2LCJpYXQiOjE2ODQzMjQwOTYsImp0aSI6IjAyOWQwMjhjY2M3ODRiZDBiMjUxOTcwNWNlOWI4MDQ5IiwidXNlcl9pZCI6Mn0.3SIsJOcCdvF1IPjed2RXNk0BY8wIgHXvMXNFY0xVhZE");
      //this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-header);
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
}
.login-title {
  font-size: 30px;
  font-weight: bold;
  color: var(--color-header);
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
}
.login-form-input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
}
.login-form-input input {
  width: 100%;
  height: 100%;
  border: 1px solid #687182;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: normal;
  color: #687182;
}
.login-form-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
}
.login-form-button button {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  background-color: var(--color-header);
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}
</style>