<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Welcome Back 👋</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>
      <p class="signup-prompt">
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await axios.post("http://localhost:8000/api/auth/login/", {
      email: email.value,
      password: password.value,
    });
    console.log("Login successful:", response.data);


    // Store token (assuming DRF SimpleJWT or similar)
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    // Redirect after login
    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
    if (error.response && error.response.data) {
      errorMessage.value =
        error.response.data.detail || "Invalid email or password";
    } else {
      errorMessage.value = "Something went wrong. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  background: linear-gradient(135deg, #4566a5, #2a5298);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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

.error {
  margin-top: 1rem;
  color: #ffcccc;
  text-align: center;
  font-size: 0.9rem;
}
</style>
