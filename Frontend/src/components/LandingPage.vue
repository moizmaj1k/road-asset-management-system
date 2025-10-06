<template>
  <div class="landing-wrapper">
    <div class="video-container">
      <!-- Background video -->
      <img
        :src="Bgimage"
        alt="Background Image"
        style="width: 100%; height: 100%"
      />
      <!-- <video autoplay muted loop playsinline class="bg-video">
            <source :src="Bgvideo" type="video/mp4" />
            Your browser does not support the video tag.
        </video> -->

      Overlay div -->
      <div class="overlay-content">
        <h1 style="font-size: 44px; font-weight: 700">Welcome</h1>
        <h2 style="font-size: 30px; font-weight: 500">
          Geo Database for Provincial Road Asset
        </h2>
        <h2 style="font-size: 30px; font-weight: 500">Data Managment System</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import Bgvideo from "../assets/Bgvideo.mp4"; //
import Bgimage from "../assets/images/bgimg1.1.png"; //
import Navbar from "./Navbar.vue";
function handleClick() {
  alert("Overlay button clicked!");
}
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* full width of viewport */
  height: 99vh; /* full height of viewport */
  object-fit: cover; /* scale and crop to fill */
  z-index: -1; /* behind other content */
}
.overlay-content {
  position: absolute; /* sits on top of image */
  top: 50%; /* center vertically */
  left: 50%; /* center horizontally */
  transform: translate(-50%, -50%);
  color: rgb(255, 255, 255);
  text-align: center;
  z-index: 10;
  background: rgba(39, 48, 45, 0.3); /* optional dark overlay */
  padding: 20px;
  border-radius: 10px;
}
</style>
