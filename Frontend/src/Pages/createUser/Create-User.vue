<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">Create User </h2>
      <form @submit.prevent="handleCreateUser">
        <input type="text" placeholder="First name" v-model="first_name" required />
        <input type="text" placeholder="Last name" v-model="last_name" required />
        <input type="text" placeholder="Email" v-model="email" required />
        <input type="text" placeholder="Username" v-model="username" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />

        <!-- Role Dropdown -->
        <select v-model="role" required>
          <option value="" disabled>Select Role</option>
          <option value="Admin">Admin</option>
          <option value="XEN">XEN</option>
          <option value="GIS_OPERATOR">GIS Operator</option>
        </select>

        <!-- District Dropdown -->
        <select v-model="district_code" required>
          <option value="" disabled>Select District</option>
          <option 
            v-for="district in districts" 
            :key="district.code" 
            :value="district.code"
          >
            {{ district.name }}
          </option>
        </select>

        <button type="submit" style="background-color: #669e97; font-size: 20px;">Create User</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Form state
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const role = ref('');
const district_code = ref('');

// District data
const districts = [
  { name: "All Districts", code: "ALL" },
  { name: "Abbotttabad", code: "100ABT" },
  { name: "Bajaur", code: "200BAJ" },
  { name: "Bannu", code: "300BAN" },
  { name: "Batagram", code: "400BAT" },
  { name: "Buner", code: "500BUN" },
  { name: "Charsadda", code: "600CHA" },
  { name: "Chitral Lower", code: "700CHL" },
  { name: "Chitral Upper", code: "800CHU" },
  { name: "D.I Khan", code: "900DIK" },
  { name: "Hangu", code: "010HAN" },
  { name: "Hairpur", code: "010HAR" },
  { name: "Karak", code: "030KAR" },
  { name: "Khyber", code: "040KHY" },
  { name: "Kohat", code: "050KOH" },
  { name: "Koishtan Upper", code: "060KOL" },
  { name: "Koishtan Lower", code: "070KOU" },
  { name: "Kolia Palas Kohistan", code: "080KPK" },
  { name: "Kurram", code: "090KUR" },
  { name: "Lakki Marwat", code: "001LAK" },
  { name: "Lower Dir", code: "002LOD" },
  { name: "Malakand", code: "003MAL" },
  { name: "Mansehra", code: "004MAN" },
  { name: "Mardan", code: "005MAR" },
  { name: "Mohamand", code: "006MOH" },
  { name: "North Waziristan", code: "007NWA" },
  { name: "Nowshera", code: "008NOW" },
  { name: "Orakzai", code: "009ORA" },
  { name: "Peshawar", code: "110PES" },
  { name: "Shangla", code: "210SHA" },
  { name: "South Waziristan", code: "310SWA" },
  { name: "Sawabi", code: "410SWI" },
  { name: "Swat", code: "510SWT" },
  { name: "Tank", code: "610TAN" },
  { name: "Tor Ghar", code: "710TOG" },
  { name: "Upper Dir", code: "810UPD" },
];

// Handle form submit
const handleCreateUser = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const token = localStorage.getItem("access_token"); // Get token from localStorage
        if (!token) {
          alert("No access token found. Please log in.");
          return;
        }
    const response = await axios.post("http://localhost:8000/api/auth/register/", 
     {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      username: username.value,
      password: password.value,
      role: role.value,
      district_code: district_code.value
    },
    {
    headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
   
  );
    console.log('User created:', response.data);
    alert('User created successfully!');
    // Optionally reset form
    first_name.value = '';
    last_name.value = '';
    email.value = '';
    username.value = '';
    password.value = '';
    confirmPassword.value = '';
    role.value = '';
    district_code.value = '';
  } catch (error) {
    console.error('Error creating user:', error);
    alert('Error creating user');
  }
};
</script>

<style scoped>
/* Reuse your login page styles */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  background: linear-gradient(135deg, #ccc3c3, #e1e7e6);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: black;
}

.login-box {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  padding: 2rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  color: black;
}

.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 600;
}
.login-box{

  background: linear-gradient(135deg, #aababb, #b4c5c0);
}
input, select {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  outline: none;
  background: rgba(255, 255, 255, 0.25);
  color: black;
  font-size: 1rem;
}

select option {
  color: black;
}

input::placeholder {
  color: black;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #4f46e5;
  border: none;
  border-radius: 8px;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4338ca;
}
</style>
