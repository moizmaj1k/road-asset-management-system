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
  
          <!-- Start RD -->
          <div class="form-group">
            <label for="width">Start RD</label>
            <input id="width" type="number" v-model="form.width" />
          </div>
          
        <div class="form-group">
            <label for="carriagewayType">Carriageway Type</label>
            <input id="carriagewayType" type="text" v-model="form.carriagewayType" />
          </div>
          <div class="form-group">
            <label for="carriagewayWidth">Carriageway Width</label>
            <input id="carriagewayWidth" type="number" v-model="form.carriagewayWidth" />
          </div>
          <div class="form-group">
            <label for="shoulderWidthRight">Shoulder Width (R)</label>
            <input id="shoulderWidthRight" type="number" v-model="form.shoulderWidthRight" />
          </div>
          <div class="form-group">
            <label for="shoulderWidthLeft">Shoulder Width (L)</label>
            <input id="shoulderWidthLeft" type="number" v-model="form.shoulderWidthLeft" />
          </div>
          <div class="form-group">
            <label for="totalNumberOfLanes">Total Number of Lanes</label>
            <input id="totalNumberOfLanes" type="number" v-model="form.totalNumberOfLanes" />
          </div>
          <div class="form-group">
            <label for="rightOfWay">Right of Way</label>
            <input id="rightOfWay" type="text" v-model="form.rightOfWay" />
          </div>
          <div class="form-group">
            <label for="roadClass">Road class</label>
            <input id="roadClass" type="number" v-model="form.roadClass" />
          </div>
          <div class="form-group">
            <label for="trafficDirection">Traffic direction</label>
            <input id="trafficDirection" type="text" v-model="form.trafficDirection" />
          </div>
          <div class="form-group">
            <label for="pavement">Pavement Type</label>
            <input id="pavement" type="text" v-model="form.pavement" />
          </div>
          <div class="form-group">
            <label for="medianType">Median Type</label>
            <input id="medianType" type="text" v-model="form.medianType" />
          </div>
          <div class="form-group">
            <label for="shoulderType">Shoulder Type</label>
            <input id="shoulderType" type="text" v-model="form.shoulderType" />
          </div>
          <div class="form-group">
            <label for="usability">Usability</label>
            <input id="usability" type="text" v-model="form.usability" />
          </div>
          <div class="form-group">
            <label for="startLat">Start lat</label>
            <input id="startLat" type="number" v-model="form.startLat" />
          </div>
          <div class="form-group">
            <label for="startLon">Start lon</label>
            <input id="startLon" type="number" v-model="form.startLon" />
          </div>
          <div class="form-group">
            <label for="endLat">End lat</label>
            <input id="endLat" type="number" v-model="form.endLat" />
          </div>
          <div class="form-group">
            <label for="endLon">End lon</label>
            <input id="endLon" type="number" v-model="form.endLon" />
          </div>
          <div class="form-group">
            <label for="annualTraffic">Annual daily traffic</label>
            <input id="annualTraffic" type="number" v-model="form.annualTraffic" />
          </div>
          <div class="form-group">
            <label for="designSpeed">Design speed</label>
            <input id="designSpeed" type="number" v-model="form.designSpeed" />
          </div>
          <div class="form-group">
            <label for="administrativeJurisdiction">Administrative jurisdiction</label>
            <input id="administrativeJurisdiction" type="text" v-model="form.administrativeJurisdiction" />
          </div>
          <div class="form-group">
            <label for="feedingPopulation">Feeding Population</label>
            <input id="feedingPopulation" type="number" v-model="form.feedingPopulation" />
          </div>
          <div class="form-group">
            <label for="yearLastRepaired">Year last repaired</label>
            <input id="yearLastRepaired" type="number" v-model="form.yearLastRepaired" />
          </div>
          <div class="form-group">
            <label for="repairType">Repair Type</label>
            <input id="repairType" type="text" v-model="form.repairType" />
          </div>
         
          <div class="form-group">
            <label for="feedingPopulation">Feeding Population</label>
            <input id="feedingPopulation" type="number" v-model="form.feedingPopulation" />
          </div>
          <!-- Add more field pairs here if needed -->
        </div>
        
        <div class="form-actions">
          <button @click="submitForm">Submit</button>
        </div>
      </div>
  
      <!-- Right: OL Map -->
      <div class="map-container">
        <OLMap />
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
.map-container {
    width: 50%;
    height: 100%;
    position: relative;
    
        height: 100vh;
  }
  </style>
  