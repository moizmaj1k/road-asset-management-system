<template>
  <div class="layout">
    <!-- Left: Form (60%)) -->
    <div class="form-container">
      <h2 class="text-center mb-4 text-2xl ">Road Section Detail</h2>

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

        <!-- Year of Construction -->
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
          <label for="constructionType">Construction type</label>
          <select id="constructionType" v-model="form.constructionType">
            <option disabled value="">-- Choose Construction Type --</option>
            <option>RCC</option>
            <option>RCC Stone</option>
            <option>Arch</option>
            <option>Steel Truss</option>
            <option>Suspension</option>
            <option>Masonry</option>
            <option>Wooden</option>
            <option>Steel with wooden slab</option>
            <option>T-Grinder</option>
            <option>I-Grinder</option>
            <option>Prestressed</option>
          </select>
        </div>
        <div class="form-group">
          <label for="parapetType">Parapet type</label>
          <select id="parapetType" v-model="form.parapetType">
            <option disabled value="">-- Choose Parapet Type --</option>
            <option>Masonry</option>
            <option>RCC</option>
            <option>RCC Guard rail</option>
            <option>Metallic Raillings</option>
            <option>Crash Barrier</option>
            <option>Wooden</option>
          </select>
        </div>
        <div class="form-group">
          <label for="abutmentPierMaterial">Abutment Pier material</label>
          <select id="abutmentPierMaterial" v-model="form.abutmentPierMaterial">
            <option disabled value="">-- Choose Abutment Pier Material --</option>
            <option>Stone Masonry</option>
            <option>Brick Masonry</option>
            <option>Mass Concrete</option>
            <option>Reinforced Concrete</option>
            <option>Columns</option>
          </select>
        </div>
        <div class="form-group">
          <label for="functionalType">Functional type</label>
          <select id="functionalType" v-model="form.functionalType">
            <option disabled value="">-- Choose Functional Type --</option>
            <option>River</option>
            <option>Flood Relief Channel</option>
            <option>Irrigation Channel</option>
            <option>Canal</option>
            <option>Railway</option>
            <option>Roadway</option>
            <option>Pedestrian</option>
            <option>Underpass</option>
            <option>Flyover</option>
            <option>Nalla</option>
          </select>
        </div>
        <div class="form-group">
          <label for="foundationType">Foundation Type</label>
          <select id="foundationType" v-model="form.foundationType">
            <option disabled value="">-- Choose Foundation Type --</option>
            <option>Spread Footing</option>
            <option>Piles</option>
            <option>Caissons</option>
            <option>Others</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="jointType">Type of joints</label>
          <select id="jointType" v-model="form.jointType">
            <option disabled value="">-- Choose Joint Type --</option>
            <option>Neoprene</option>
            <option>Steel</option>
          </select>
        </div>
        <div class="form-group">
          <label for="SpanLength">Span length (m)</label>
          <input id="SpanLength" type="number" v-model="form.SpanLength" />
        </div>
        <div class="form-group">
          <label for="VerticalClearance">Vertical Clearance (m)</label>
          <input id="VerticalClearance" type="number" v-model="form.VerticalClearance" />
        </div>
        <div class="form-group">
          <label for="TotalDeckWidth">Total deck width (m)</label>
          <input id="TotalDeckWidth" type="number" v-model="form.TotalDeckWidth" />
        </div>
        <div class="form-group">
          <label for="ClearWidth">Clear width (m)</label>
          <input id="ClearWidth" type="number" v-model="form.ClearWidth" />
        </div>
        <!-- Start RD -->
        <div class="form-group">
          <label for="Lat"> lat</label>
          <input id="Lat" type="number" v-model="form.Lat" />
        </div>
        <div class="form-group">
          <label for="Lon"> lon</label>
          <input id="Lon" type="number" v-model="form.Lon" />
        </div>
        <!-- Add more field pairs here if needed -->
      </div>
      
      <div class="form-actions">
        <button @click="submitForm">Submit</button>
      </div>
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
import { reactive } from 'vue'
import OLMap from '../Map-For-Editing.vue'

const form = reactive({
  district: '',
  road: '',
  length: '',
  width: '',
  depth: '',
   constructionDate: ''
})

const submitForm = () => {
  console.log('Form submitted:', form)
}
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
grid-template-columns: repeat(3, 1fr); /* was 2 columns, now 3 */
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

</style>
