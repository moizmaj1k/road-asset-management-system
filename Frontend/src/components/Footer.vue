<template>
  <div class="footer">
    Copyrights © All rights Reserved. Communication & Works Department - Design/Developed by 
    <button class="footer-btn" @click="goToWebsite">Pavron</button>
  </div>
</template>

<script setup>
function goToWebsite() {
  window.open("https://pavron.com.pk/", "_blank"); // replace with your actual site
}
</script>

<style scoped>
.footer {
  font-family: 'Courier New', Courier, monospace !important;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 5px;
  color: black;
  background: #70a894;
  z-index: 10;
}

.footer-btn {
  background: transparent;
  border: none;
  color: rgb(0, 0, 0); /* make it stand out */
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

.footer-btn:hover {
  color: #ffeb3b; /* hover effect */
}
</style>
