<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Welcome Back 👋</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
      <p class="signup-prompt">
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value);
  // Add actual login logic here
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  background: linear-gradient(135deg, #4566a5, #2a5298);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-box {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  color: white;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  font-size: 1rem;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4f46e5;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4338ca;
}

.signup-prompt {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.signup-prompt a {
  color: #fff;
  font-weight: bold;
  text-decoration: underline;
}
</style>
