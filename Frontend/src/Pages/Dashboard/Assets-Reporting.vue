<template>
    <div @click="toggleInput" class="cursor-pointer">
      <span class="pi pi-pencil"></span>
    </div>
  
    <div
      v-if="showInput"
      class="white-box"
      :style="{ top: boxY + 'px', left: boxX + 'px' }"
      @mousedown="startDrag"
    >
    <button @click.stop="closeBox" class="close-button">X</button>
      <textarea v-model="inputText" placeholder="Enter text here..."></textarea>
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showInput = ref(false);
  const inputText = ref('');
  
  // Reactive variables for box position
  const boxX = ref(50); // Initial X position
  const boxY = ref(50); // Initial Y position
  
  // Variables for drag functionality
  const isDragging = ref(false);
  const offsetX = ref(0);
  const offsetY = ref(0);
  
  const toggleInput = () => {
    showInput.value = !showInput.value;
    if (!showInput.value) {
      inputText.value = ''; // Clear text if hiding the input
    }
  };
  
  const saveText = () => {
    console.log("Text saved:", inputText.value);
    showInput.value = false;
    inputText.value = '';
  };
  
  const cancelInput = () => {
    showInput.value = false;
    inputText.value = '';
  };
  
  // --- Drag functionality methods ---
  const startDrag = (event) => {
    isDragging.value = true;
    // Calculate the offset from the mouse pointer to the top-left corner of the box
    offsetX.value = event.clientX - boxX.value;
    offsetY.value = event.clientY - boxY.value;
  
    // Add global event listeners for mousemove and mouseup
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
  };
  
  const drag = (event) => {
    if (isDragging.value) {
      // Calculate new position based on mouse movement and initial offset
      boxX.value = event.clientX - offsetX.value;
      boxY.value = event.clientY - offsetY.value;
    }
  };
  
  const stopDrag = () => {
    isDragging.value = false;
    // Remove global event listeners
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('mouseup', stopDrag);
  };
  const closeBox = () => {
  showInput.value = false;
  inputText.value = ''; // Clear text when closing
};

  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  
  .white-box {
    background-color: white;
    border: 1px solid #ccc;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px; /* Adjust as needed */
    max-width: 100%;
    height: 150px;
  
    /* Positioning for dragging */
    position: fixed; /* Allows positioning relative to the viewport */
    cursor: grab;    /* Indicates it's draggable */
    z-index: 1000;   /* Ensure it appears above other content */
  }
  
  .white-box.dragging {
    cursor: grabbing; /* Cursor when actively dragging */
  }
  
  .white-box textarea {
    width: 100%;
    min-height: 120px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end; /* Aligns buttons to the right */
    gap: 10px;
  }
  
  .white-box button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #151748;
    color: white;
  }
  
  .white-box button:hover {
    background-color: #0056b3;
  }
  
  .white-box button:last-child {
    background-color: #6c757d;
  }
  
  .white-box button:last-child:hover {
    background-color: #5a6268;
  }
  .close-button {
  border: none;
  font-size: 0.7em;
  font-weight: bold;
  color: #151748;
  cursor: pointer;
  padding: 3px;
  line-height: 1; /* For better vertical alignment of 'X' */
  position: absolute;
  top: 0px; /* Adjust as needed */
  right: 0px; /* Adjust as needed */
  z-index: 1; /* Ensure it's above other header content if any */
}

.close-button:hover {
  color: #f00; /* Red on hover */
}
  </style>