<template>
  <div class="layout">
    <!-- Left: Form (60%)) -->
    <div class="form-container">
      <h2 class="text-center mb-4 text-2xl">Culvert Section Detail</h2>

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
          <label for="culvert">Select Culvert</label>
          <select id="culvert" v-model="form.culvert">
            <option disabled value="">-- Choose Culvert --</option>
            <option>Culvert 1</option>
            <option>Culvert 2</option>
            <option>Culvert 3</option>
          </select>
        </div>
        <div class="form-group">
          <label for="constructionDate">Year of Construction</label>
          <input
            id="constructionDate"
            type="date"
            v-model="form.constructionDate"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="culvertType">Culvert Type</label>
          <select id="culvertType" v-model="form.culvertType">
            <option disabled value="">-- Choose Culvert Type --</option>
            <option>Box</option>
            <option>Pipe</option>
            <option>Arch</option>
            <option>Slab</option>
            <option>Pipe Arch</option>
            <option>Slab over Masonry</option>
            <option>Composite</option>
          </select>
        </div>
        <div class="form-group">
          <label for="numSpans">Number of spans</label>
          <input id="numSpans" type="number" v-model="form.numSpans" />
        </div>
        <div class="form-group">
          <label for="length">Length (Meters) </label>
          <input id="length" type="number" v-model="form.length" />
        </div>
        <div class="form-group">
          <label for="width">Width (Meters)</label>
          <input id="width" type="number" v-model="form.width" />
        </div>
        <div class="form-group">
          <label for="height">Height (Meters)</label>
          <input id="height" type="number" v-model="form.height" />
        </div>
        <div class="form-group">
          <label for="diameter">Diameter (Meters)</label>
          <input id="diameter" type="number" v-model="form.diameter" />
        </div>
        <div class="form-group">
          <label for="typeofapron">Type of Aprons</label>
          <select id="typeofapron" v-model="form.typeofapron">
            <option disabled value="">-- Choose Type of Aprons --</option>
            <option>Stone</option>
            <option>Brick</option>
            <option>Concrete</option>
            <option>None</option>
          </select>
        </div>
        <div class="form-group">
          <label for="typeofwingwalls">Type of Wingwalls</label>
          <select id="typeofwingwalls" v-model="form.typeofwingwalls">
            <option disabled value="">-- Choose Type of Wingwalls --</option>
            <option>Stone</option>
            <option>Brick</option>
            <option>Concrete</option>
            <option>None</option>
          </select>
        </div>
        <div class="form-group">
          <label for="typeofheadwalls">Type of headwalls</label>
          <select id="typeofheadwalls" v-model="form.typeofheadwalls">
            <option disabled value="">-- Choose Type of Headwalls --</option>
            <option>Stone</option>
            <option>Brick</option>
            <option>Concrete</option>
            <option>None</option>
          </select>
        </div>
        <div class="form-group">
          <label for="waterwayclearance">Waterway Clearance</label>
          <select id="waterwayclearance" v-model="form.waterwayclearance">
            <option disabled value="">-- Choose Waterway Clearance --</option>
            <option>Chocked</option>
            <option>Clear</option>
          </select>
        </div>
        <div class="form-group">
          <label for="CulvertCondition">Condition</label>
          <select id="CulvertCondition" v-model="form.CulvertCondition">
            <option disabled value="">-- Choose Condition --</option>
            <option>Poor</option>
            <option>Fair</option>
            <option>Good</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group flex-half">
            <label for="startLat ">Start lat</label>
            <input id="startLat" type="number" v-model="form.startLat" />
          </div>
          <div class="form-group flex-half">
            <label for="startLon">Start lon</label>
            <input id="startLon" type="number" v-model="form.startLon" />
          </div>
        </div>
        <!-- End Lat & End Lon side-by-side -->

        <!-- Two toggles side-by-side -->
        <div class="form-row">
          <div class="form-group flex-half toggle-group">
            <label class="toggle-label">Is culvert in skew?</label>
            <label class="switch">
              <input type="checkbox" v-model="form.isCulvertInSkew" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="form-group flex-half toggle-group">
            <label class="toggle-label">Is drain open</label>
            <label class="switch">
              <input type="checkbox" v-model="form.isDrainOpen" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
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
        <div class="form-group full-width">
          <h3 class="images-heading">Images</h3>
          <div class="image-list">
            <div v-if="imageLinks.length === 0" class="text-muted">
              No images available
            </div>
            <div
              v-else
              class="image-item"
              v-for="(url, index) in imageLinks"
              :key="index"
            >
              <img :src="url" :alt="'Image ' + (index + 1)" />
              <a :href="url" target="_blank">View Full</a>
            </div>
          </div>
        </div>
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
  culvert: "",
  culvertType: "",
  CulvertCondition: "",
  startLat: "",
  startLon: "",
  isCulvertInSkew: false,
  numSpans: "",
  height: "",
  diameter: "",
  typeofapron: "",
  typeofwingwalls: "",
  typeofheadwalls: "",
  waterwayclearance: "",
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
