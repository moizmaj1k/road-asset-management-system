<template>
  <div class="layout">
    <!-- Left: Form (60%)) -->
    <div class="form-container">
      <h2 class="text-center mb-4 text-2xl">Retaining Wall Section Detail</h2>

      <div class="form-grid">
        <!-- District -->
        <div class="form-group">
          <label for="district">Select District</label>
          <select id="district" v-model="form.district">
            <option disabled value="">-- Choose District --</option>
            <option>District A</option>
            <option>District B</option>
            <option>District C</option>
          </select>
        </div>

        <!-- Road -->
        <div class="form-group">
          <label for="road">Select Road</label>
          <select id="road" v-model="form.road">
            <option disabled value="">-- Choose Road --</option>
            <option>Road 1</option>
            <option>Road 2</option>
            <option>Road 3</option>
          </select>
        </div>
        <div class="form-group">
          <label for="retainingWallType">Type of Retaining Wall</label>
          <select id="retainingWallType" v-model="form.retainingWallType">
            <option disabled value="">-- Choose Retaining Wall Type --</option>
            <option>PCC</option>
            <option>RCC</option>
            <option>PLUM</option>
            <option>Dry Stone Masonry</option>
            <option>Mortar Stone Masonry</option>
          </select>
        </div>
        <div class="form-group">
          <label for="parapetWallType">Parapet Wall Type</label>
          <select id="parapetWallType" v-model="form.parapetWallType">
            <option disabled value="">-- Choose Parapet Wall Type --</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div class="form-group">
          <label for="retainingWallSide">Retaining Wall Side</label>
          <select id="retainingWallSide" v-model="form.retainingWallSide">
            <option disabled value="">-- Choose Retaining Wall Side --</option>
            <option>Right side</option>
            <option>Left Side</option>
            <option>Both Side</option>
          </select>
        </div>

        <div class="form-group">
          <label for="DrainageCondition">Condition</label>
          <select id="DrainageCondition" v-model="form.DrainageCondition">
            <option disabled value="">-- Choose Condition --</option>
            <option>Poor</option>
            <option>Fair</option>
            <option>Good</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group flex-half">
            <label for="startLat">Start lat</label>
            <input id="startLat" type="number" v-model="form.startLat" />
          </div>
          <div class="form-group flex-half">
            <label for="startLon">Start lon</label>
            <input id="startLon" type="number" v-model="form.startLon" />
          </div>
        </div>
        <!-- End Lat & End Lon side-by-side -->
        <div class="form-row">
          <div class="form-group flex-half">
            <label for="endLat">End lat</label>
            <input id="endLat" type="number" v-model="form.endLat" />
          </div>
          <div class="form-group flex-half">
            <label for="endLon">End lon</label>
            <input id="endLon" type="number" v-model="form.endLon" />
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-group full-width">
          <h3 class="images-heading">Remarks</h3>

          <textarea
            v-model="remarks"
            rows="4"
            class="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter remarks here..."
          ></textarea>
        </div>
        <!-- Images Section -->
      
        
      </div>
      <!-- Start RD -->
    </div>

    <!-- Right: OL Map -->
    <div class="map-side">
      <div class="map-container">
        <OLMap />
      </div>
      <div class="image-section">
        <h3>Image</h3>
        <h3>Image</h3>
        <h3>Image</h3>
        <h3>Image</h3>

        <h3>Image</h3>
        <h3>Image</h3>
        <!-- You can place an <img> or anything else here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import OLMap from "../Map-For-Editing.vue";

const form = reactive({
  district: "",
  road: "",
  length: "",
  width: "",
  depth: "",
  constructionDate: "",
  drainage: "",
  drainType: "",
  hasCatEyes: false,
  isDrainOpen: false,
  DrainageCondition: "",
  breastWallType: "",
  DrainageSide: "",
  startLat: "",
  startLon: "",
  endLat: "",
  endLon: "",
  retainingWallType: "",
  parapetWallType: "",
  retainingWallSide: "",
});
const imageLinks = ref([]);
onMounted(async () => {
  try {
    const response = await fetch("https://your-api.com/images");
    const data = await response.json();
    imageLinks.value = data.imageUrls || [];
  } catch (err) {
    console.error("Failed to fetch images:", err);
  }
});
const submitForm = () => {
  console.log("Form submitted:", form);
};
</script>

<style scoped>
.form-container {
  width: 60%;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* now 3 columns */
  gap: 1rem 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input,
select {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-row {
  grid-column: span 3; /* Take the full row in your 3-col grid */
  display: flex;
  gap: 1rem;
}

.flex-half {
  flex: 1; /* Each child takes 50% of the row */
}
.form-actions {
  margin-top: 1.5rem;
  text-align: center;
}

button {
  padding: 8px 16px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2c3e91;
}
.layout {
  display: flex;
}
.map-side {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.map-container {
  height: 40vh; /* Leave some space for the image */
}

.image-section {
  padding: 1rem;
  background: #f8f8f8;
  border-top: 1px solid #ccc;
}
.toggle-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle-label {
  font-weight: 600;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
.two-col {
  grid-column: span 2;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #3f51b5;
}

input:checked + .slider::before {
  transform: translateX(24px);
}
.full-width {
  grid-column: span 3; /* span full width of the form grid */
}

.images-heading {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.image-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.image-item a {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #3f51b5;
  text-decoration: underline;
}

.text-muted {
  color: #888;
}
</style>
