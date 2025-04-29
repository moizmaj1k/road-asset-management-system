<template>
    <div class="tool-box">
<div>search</div>
<div>test</div>
<div>check</div>
</div> 
</template>
<script setup></script>
<style scoped>
.tool-box {
  position: absolute;
  display: flex;
    flex-direction: column;
  top: 2px;
  left: 6px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  height: 20%;
}
.tool-box div {
  margin: 10px 0;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>