<template>
   <div class="landing-wrapper">
    <div class="video-container">
        <!-- Background video -->
        <video autoplay muted loop playsinline class="bg-video">
            <source :src="Bgvideo" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <!-- Overlay div -->
        <!-- <div class="overlay-content">
            <h1>This is an overlay</h1>
            <button @click="handleClick">Click Me</button>
        </div> -->
    </div>
</div>
</template>

<script setup>
import Bgvideo from '../assets/Bgvideo.mp4'; // 
import Navbar from './Navbar.vue'; 
function handleClick() {
    alert('Overlay button clicked!');
}
</script>

<style scoped>
.landing-wrapper {
  padding-top: 7vh; /* Matches navbar height */
}
.video-container {
    position: relative;
    width: 100%;
    height: 57.45rem;
    overflow: hidden;
}

.bg-video {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    z-index: -1;
}

.overlay-content {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding-top: 40vh;
}
</style>
