<template>
  <div class="icon-container" @click="showAssets = !showAssets">
    <span class="pi pi-search"></span>
  </div>
  <!-- Popup -->
  <div v-if="showAssets" class="popup">
    <ul>
      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span>Bridge</span>
        </div>

        <i
          class="pi pi-plus-circle cursor-pointer hover:text-blue-800 transition"
          @click="toggleBridgeFilterDropdown = !toggleBridgeFilterDropdown"
        >
        </i>
      </li>

      <!-- Filter of bridge -->
      <div v-if="toggleBridgeFilterDropdown" class="list-container mt-2">
        <div class="mb-2 text-center">Number of spans</div>
        <div class="flex items-center justify-center gap-2">
          <button
            @click="decrement"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span class="w-6 text-center">{{ BridgeNumberofspansCount }}</span>
          <button
            @click="increment"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <div class="mt-2 text-center font-medium">Construction type</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="BridgeSelectedConstructionType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in bridgeConstructionType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Parapet type</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="BridgeSelectedParapetType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in BridgeParapetType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Abutment Pier Material</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="BridgeSelectedAbutmentPierMaterial"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in BridgeAbutmentPierMaterial"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Functional Type</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="BridgeSelectedFunctionalType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in BridgeFunctionalType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Foundation Type</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="BridgeSelectedFondationType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in BridgeFoundationType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Type of Joints</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="BridgeSelectedFondationType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in BridgeFoundationType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Culvert</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleCulvertFilterDropdown = !toggleCulvertFilterDropdown"
        ></i>
      </li>
      <!-- Filter of Culvert -->
      <div v-if="toggleCulvertFilterDropdown" class="list-container">
        <div class="mb-2 text-center">Number of cells</div>
        <div class="flex items-center justify-center gap-2">
          <button
            @click="DecrementCulverts"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span class="w-6 text-center">{{ CulvertNumberofcellsCount }}</span>
          <button
            @click="IncrementCulverts"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <div class="mt-1 text-center font-medium">Construction type</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="CulvertSelectedConstructionType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in CulvertConstructionType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-1 text-center font-medium">Type of Apron</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="CulvertSelectedApronType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in CulvertApronType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-1 text-center font-medium">Type of Wingwalls</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="CulvertSelectedWingwallType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in CulvertWingwallType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-1 text-center font-medium">Type of Headwalls</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="CulvertSelectedHeadwallsType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in CulvertHeadwallsType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-1 text-center font-medium">Waterway Clearance</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="CulvertSelectedWaterwayType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in CulvertWaterwayType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Sign Board</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="
            toggleSignboardFilterDropdown = !toggleSignboardFilterDropdown
          "
        ></i>
      </li>
      <!-- Filter of Sign Board -->
      <div v-if="toggleSignboardFilterDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">Type of Sign Board</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SignboardSelectedType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in SignboardType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-1 text-center font-medium">Side of Sign Board</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SignboardSelectedSide"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in SignboardSide" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Toll Plaza</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="
            toggleTollplazaFilterDropdown = !toggleTollplazaFilterDropdown
          "
        ></i>
      </li>
      <!-- Filter of Toll Plaza -->
      <div v-if="toggleTollplazaFilterDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">Number of Booths</div>
        <div class="flex items-center justify-center gap-2">
          <button
            @click="DecrementTollBooths"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span class="w-6 text-center">{{ TollNumberofBooths }}</span>
          <button
            @click="IncrementTollBooths"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <div class="mt-1 text-center font-medium">Type of Toll</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="TollSelectedType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in TollType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Light pole</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="
            toggleLightpoleFilterDropdown = !toggleLightpoleFilterDropdown
          "
        ></i>
      </li>
      <!-- Filter of Light pole -->
      <div v-if="toggleLightpoleFilterDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">Type of Light Pole</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="LightpoleSelectedType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in LightpoleType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-1 text-center font-medium">Side of Light Pole</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="LightpoleSelectedSide"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in LightpoleSide" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Interchange</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleInterchangeDropdown = !toggleInterchangeDropdown"
        ></i>
      </li>
      <!-- Filter of Interchange -->
      <div v-if="toggleInterchangeDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">Type of Interchange</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="InterchangeSelectedType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in InterchangeType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Patch Condition</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="togglePatchconditionDropdown = !togglePatchconditionDropdown"
        ></i>
      </li>
      <!-- Filter of Patch Condition -->
      <div v-if="togglePatchconditionDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">
          Quality of Patch Condition
        </div>
        <div class="flex justify-center mt-1">
          <select
            v-model="PatchConditionSelectedQuality"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in PatchConditionQuality"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Commercial Entity</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="
            toggleCommericalentityDropdown = !toggleCommericalentityDropdown
          "
        ></i>
      </li>
      <!-- Filter of Commercial Entity -->
      <div v-if="toggleCommericalentityDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">
          Type of Commerical Entity
        </div>
        <div class="flex justify-center mt-1">
          <select
            v-model="CommericalEntitySelectedType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option
              v-for="type in CommericalEntityType"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Road Crossing</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleRoadcrossingDropdown = !toggleRoadcrossingDropdown"
        ></i>
      </li>
      <!-- Filter ofRoad Crossing -->
      <div v-if="toggleRoadcrossingDropdown" class="list-container">
        <div class="mt-1 text-center font-medium">Type of Road Crossing</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedRoadCrossingType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in RoadCrossingType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Type of Headwalls</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedHeadwallsType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in HeadwallsType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">
          Is the road crossing skew?
        </div>
        <div class="flex justify-center mt-2">
          <button
            @click="toggleSkew"
            :class="[
              'px-4 py-1 rounded border transition-colors duration-200',
              isRoadSkew
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-red-500 text-white border-red-600',
            ]"
          >
            {{ isRoadSkew ? "Yes" : "No" }}
          </button>
        </div>
        <div class="mt-2 text-center font-medium">
          Is Drain Inside road crossing?
        </div>
        <div class="flex justify-center mt-2">
          <button
            @click="toggleDrainSkew"
            :class="[
              'px-4 py-1 rounded border transition-colors duration-200',
              isDrainInsideRoadCrossing
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-red-500 text-white border-red-600',
            ]"
          >
            {{ isDrainInsideRoadCrossing ? "Yes" : "No" }}
          </button>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Drainage</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleDrainageDropdown = !toggleDrainageDropdown"
        ></i>
      </li>
      <!-- Filter of Drainage-->
      <div v-if="toggleDrainageDropdown" class="list-container">
        <div class="mt-2 text-center font-medium">Type of Drainage</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedDrainageType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in DrainageType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Type of Breastwall</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedBreastwallType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in BreastwallType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Side of Drainage</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedDrainageSide"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in DrainageSide" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">
          Does Drain have Foothpath?
        </div>
        <div class="flex justify-center mt-2">
          <button
            @click="toggleDrainFoothpath"
            :class="[
              'px-4 py-1 rounded border transition-colors duration-200',
              isDrainFoothpath
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-red-500 text-white border-red-600',
            ]"
          >
            {{ isDrainFoothpath ? "Yes" : "No" }}
          </button>
        </div>
        <div class="mt-2 text-center font-medium">
          is Drain Choked?
        </div>
        <div class="flex justify-center mt-2">
          <button
            @click="toggleDrainChoked"
            :class="[
              'px-4 py-1 rounded border transition-colors duration-200',
              isDrainChoked
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-red-500 text-white border-red-600',
            ]"
          >
            {{ isDrainChoked ? "Yes" : "No" }}
          </button>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Retaining Wall</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleRetainingwallDropdown = !toggleRetainingwallDropdown"
        ></i>
      </li>
      <!-- Filter of Retaining Wall-->
      <div v-if="toggleRetainingwallDropdown" class="list-container">
        <div class="mt-2 text-center font-medium">Type of Retaining Wall</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedRetainingWallType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in RetainingWallType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Is there a Parapet wall?</div>
        <div class="flex justify-center mt-2">
          <button
            @click="toggleRetainingWallParapet"
            :class="[
              'px-4 py-1 rounded border transition-colors duration-200',
              isRetainingWallParapet
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-red-500 text-white border-red-600',
            ]"
          >
            {{ isRetainingWallParapet ? "Yes" : "No" }}
          </button>
        </div>
        <div class="mt-2 text-center font-medium">Side of Retaining Wall</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedRetainingWallSide"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in RetainingWallSide" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Dyke & Curb Stone </span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="
            toggleDykeandcurbstoneDropdown = !toggleDykeandcurbstoneDropdown
          "
        ></i>
      </li>
      <!-- Filter of Dyke and curb stone-->
      <div v-if="toggleDykeandcurbstoneDropdown" class="list-container">
        <div class="mt-2 text-center font-medium">Type of Dyke Curb Stone</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedDykeandCurbStoneType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in DykeandCurbStoneType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Side of Dyke & Curb Stone</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedDykeandCurbStoneSide"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in DykeandCurbStoneSide" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Guard Rail </span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleGuardrailDropdown = !toggleGuardrailDropdown"
        ></i>
      </li>
      <!-- Filter of Guard Rail-->
      <div v-if="toggleGuardrailDropdown" class="list-container">
        <div class="mt-2 text-center font-medium">Type of Guard Rail</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedGuardrailType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in GuardrailType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Side of Guard Rail</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedGuardrailSide"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in GuardrailSide" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <li class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" />
          <span class="">Tunnel</span>
        </div>
        <i
          class="pi pi-plus-circle ml-auto"
          @click="toggleTunnelDropdown = !toggleTunnelDropdown"
        ></i>
      </li>
      <!-- Filter of Tunnel-->
      <div v-if="toggleTunnelDropdown" class="list-container">
        <div class="mt-2 text-center font-medium">Type of Tunnel</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedTunnelType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in TunnelType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Shape of Tunnel</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedTunnelShape"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in TunnelShape" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Type of Lining</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedTunnelLiningType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in TunnelLiningType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mt-2 text-center font-medium">Type of Portal</div>
        <div class="flex justify-center mt-1">
          <select
            v-model="SelectedTunnelPortalType"
            class="border border-gray-300 rounded px-3 py-1"
          >
            <option disabled value="">Select a type</option>
            <option v-for="type in TunnelPortalType" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="mb-2 text-center">Number of spans</div>
        <div class="flex items-center justify-center gap-2 mb-3">
          <button
            @click="decrementTunnelTubes"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span class="w-6 text-center">{{ TunnelTubes }}</span>
          <button
            @click="incrementTunnelTubes"
            class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div @click="FilterRoadData()"
        class="text-center bg-blue-700"
        style="
          height: 40px;
          position: sticky;
          width: 140px;
          color: white;
          top: 0;
          cursor: pointer;
          border-radius: 10px;
          margin-left: 3rem;
          padding-top: 7px;
        "
      >
        Apply Filters
      </div>
    </ul>
  </div>
</template>

<script setup>
import { Button } from "primevue";
import { defineEmits } from "vue";
import { computed, ref } from "vue";

const showAssets = ref(false);
const toggleBridgeFilterDropdown = ref(false);
const toggleCulvertFilterDropdown = ref(false);
const toggleSignboardFilterDropdown = ref(false);
const toggleTollplazaFilterDropdown = ref(false);
const toggleLightpoleFilterDropdown = ref(false);
const toggleInterchangeDropdown = ref(false);
const togglePatchconditionDropdown = ref(false);
const toggleCommericalentityDropdown = ref(false);
const toggleRoadcrossingDropdown = ref(false);
const toggleDrainageDropdown = ref(false);
const toggleRetainingwallDropdown = ref(false);
const toggleDykeandcurbstoneDropdown = ref(false);
const toggleGuardrailDropdown = ref(false);
const toggleTunnelDropdown = ref(false);
const BridgeNumberofspansCount = ref(0);
const BridgeSelectedConstructionType = ref("");
const bridgeConstructionType = ref([
  "All",
  "RCC",
  "RCC stone",
  "Arch",
  "Steel Truss",
  "Suspension",
  "Masonry",
  "Wooden",
  "Steel With Wooden Slab",
  "T-Grinder",
  "I-Grinder",
  "Prestressed",
]);
const BridgeSelectedParapetType = ref("");
const BridgeParapetType = ref([
  "All",
  "Masonry",
  "RCC",
  "Arch",
  "RCC Guard/Rails",
  "Metallic Raillings",
  "Crash Barrier",
  "Wooden",
]);
const BridgeSelectedAbutmentPierMaterial = ref("");
const BridgeAbutmentPierMaterial = ref([
  "All",
  "Stone Masonry",
  "Brick Masonry",
  "Mass Concrete",
  "Reinforced Concrete",
  "Columns",
]);
const BridgeSelectedFunctionalType = ref("");
const BridgeFunctionalType = ref([
  "All",
  "River",
  "Flood Relief Channal",
  "Irrigation Channal",
  "Canal",
  "Railway",
  "Roadway",
  "Pedestrian",
  "Underpass",
  "Flyover",
  "Nalia",
]);
const BridgeSelectedFondationType = ref("");
const BridgeFoundationType = ref([
  "All",
  "Spread Footing",
  "Piles",
  "Caissons",
  "Others",
]);
const CulvertNumberofcellsCount = ref(0);
const CulvertConstructionType = ref([
  "All",
  "Box",
  "Pipe",
  "Arch",
  "Slab",
  "Pipe Arch",
  "Slab over Masonry",
  "Composite",
]);
const CulvertSelectedConstructionType = ref("");
const CulvertSelectedApronType = ref("");
const CulvertApronType = ref(["All", "Concrete", "Brick", "Stone", "None"]);
const CulvertSelectedWingwallType = ref("");
const CulvertWingwallType = ref(["All", "Concrete", "Brick", "Stone", "None"]);
const CulvertSelectedHeadwallsType = ref("");
const CulvertHeadwallsType = ref(["All", "Concrete", "Brick", "Stone", "None"]);
const CulvertSelectedWaterwayType = ref("");
const CulvertWaterwayType = ref(["All", "Cleared", "Clear"]);
const SignboardSelectedType = ref("");
const SignboardType = ref([
  "All",
  "Warning",
  "Regulatory",
  "Informational",
  "Gantry",
  "Milestone",
  "RD Post",
]);
const SignboardSelectedSide = ref("");
const SignboardSide = ref([
  "All",
  "Left Side",
  "Right Side",
  "Median",
  "Both Sides",
]);
const TollSelectedType = ref("");
const TollType = ref(["All", "Barrier Only", "Barrier with infrastructure"]);
const TollNumberofBooths = ref(0);
const LightpoleSelectedType = ref("");
const LightpoleType = ref([
  "All",
  "Single Arm",
  "Double Arm",
  "Multi Arm",
  "Flood Light",
]);
const LightpoleSelectedSide = ref("");
const LightpoleSide = ref([
  "All",
  "Left Side",
  "Right Side",
  "Median",
  "Both Sides",
]);
const InterchangeSelectedType = ref("");
const InterchangeType = [
  "All",
  "Diamond",
  "Partial Clover",
  "Full Cloverleaf",
  "Directional",
  "Trumpet",
  "At Grade",
];
const PatchConditionSelectedQuality = ref("");
const PatchConditionQuality = ref(["All", "Good", "Fair", "Poor"]);
const CommericalEntitySelectedType = ref("");
const CommericalEntityType = ref([
  "Restaurant",
  "Hotel",
  "Bank",
  "Petrol Pump",
  "Marriage Hall",
  "Kanta",
]);
const SelectedRoadCrossingType = ref("");
const RoadCrossingType = ref(["Underpass", "Subway", "Cattle Creep"]);
const SelectedHeadwallsType = ref("");
const HeadwallsType = ref(["Stone", "Brick", "Concrete"]);
const isRoadSkew = ref(false);
const isDrainInsideRoadCrossing = ref(false);
const SelectedDrainageType = ref("");
const DrainageType = [
  "All",
  "Ditch Drain",
  "Saucer",
  "Earthen",
  "PCC open Drain",
  "PCC Cover Drain",
  "RCC",
  "Drain With Breast Wall",
];
const SelectedBreastwallType = ref("");
const BreastwallType = [
  "All",
  "PCC",
  "Plum",
  "RCC",
  "Stone Masonary",
  "None",
];
const SelectedDrainageSide = ref("");
const DrainageSide = ["All", "Left Side", "Right Side", "Both Sides", "Median", "Median and Both sides"];
const isDrainFoothpath = ref(false);
const SelectedRetainingWallType = ref("");
const RetainingWallType = [
  "All",
  "PCC",
  "RCC",
  "Plum",
  "Dry Stone Masonry",
  "Motar Stone Masonry",
];
const isRetainingWallParapet = ref(false);
const SelectedRetainingWallSide = ref("");
const RetainingWallSide = [
  "All",
  "Left Side",
  "Right Side",
  "Both Sides",
];
const SelectedDykeandCurbStoneType = ref("");
const DykeandCurbStoneType = [
  "All",
  "PCC",
  "Stone",
];
const SelectedDykeandCurbStoneSide = ref("");
const DykeandCurbStoneSide = [
  "All",
  "Left Side",
  "Right Side",
  "Both Sides",
  "Median",
  "Median and Both sides",
];
const SelectedGuardrailType = ref("");
const GuardrailType = [
  "All",
  "W-Beam",
  "Steel Pipes",
  "Steel Ropes",
  "Wooden",
];
const SelectedGuardrailSide = ref("");
const GuardrailSide = [
  "All",
  "Left Side",
  "Right Side",
  "Both Sides",
  "Median",
  "Median and Both sides",
];
const SelectedTunnelType = ref("");
const TunnelType=[
  "All",
  "Side Shelter",
  "Hill Crossing"
]
const SelectedTunnelShape = ref("");
const TunnelShape = [
  "All",
  "Arched Shaped",
  "Rectangular Shaped",
  "Circular Shaped",
];
const SelectedTunnelLiningType = ref("");
const TunnelLiningType=[
  "All",
  "RCC",
  "Without Lining"
];
const SelectedTunnelPortalType = ref("");
const TunnelPortalType = [
  "All",
  "With Box cut",
  "Without Box cut"
];
const TunnelTubes = ref(0);
const incrementTunnelTubes = () => {
  if (TunnelTubes.value >= 8) {
    return; // Limit to a maximum of 10 tubes
  }
  TunnelTubes.value++;
};
const decrementTunnelTubes = () => {
  if (TunnelTubes.value > 0) {
    TunnelTubes.value--;
  }
};
const toggleRetainingWallParapet = () => {
  isRetainingWallParapet.value = !isRetainingWallParapet.value;
};
const toggleDrainFoothpath = () => {
  isDrainFoothpath.value = !isDrainFoothpath.value;
};
const isDrainChoked = ref(false);
const toggleDrainChoked = () => {
  isDrainChoked.value = !isDrainChoked.value;
};
const toggleDrainSkew = () => {
  isDrainInsideRoadCrossing.value = !isDrainInsideRoadCrossing.value;
};
function toggleSkew() {
  isRoadSkew.value = !isRoadSkew.value;
}
const IncrementTollBooths = () => {
  TollNumberofBooths.value++;
};
const DecrementTollBooths = () => {
  TollNumberofBooths.value--;
};
const increment = () => {
  BridgeNumberofspansCount.value++;
};

const decrement = () => {
  BridgeNumberofspansCount.value--;
};
const IncrementCulverts = () => {
  CulvertNumberofcellsCount.value++;
};

const DecrementCulverts = () => {
  CulvertNumberofcellsCount.value--;
};

const emit = defineEmits(["clicked"]);

const FilterRoadData = () => {
  const payload = {
    // Bridges
    BridgeNumberofspansCount: BridgeNumberofspansCount.value,
    BridgeSelectedConstructionType: BridgeSelectedConstructionType.value,
    BridgeSelectedParapetType: BridgeSelectedParapetType.value,
    BridgeSelectedAbutmentPierMaterial: BridgeSelectedAbutmentPierMaterial.value,
    BridgeSelectedFunctionalType: BridgeSelectedFunctionalType.value,
    BridgeSelectedFondationType: BridgeSelectedFondationType.value,

    // Culverts
    CulvertNumberofcellsCount: CulvertNumberofcellsCount.value,
    CulvertSelectedConstructionType: CulvertSelectedConstructionType.value,
    CulvertSelectedApronType: CulvertSelectedApronType.value,
    CulvertSelectedWingwallType: CulvertSelectedWingwallType.value,
    CulvertSelectedHeadwallsType: CulvertSelectedHeadwallsType.value,
    CulvertSelectedWaterwayType: CulvertSelectedWaterwayType.value,

    // Signboard
    SignboardSelectedType: SignboardSelectedType.value,
    SignboardSelectedSide: SignboardSelectedSide.value,

    // Toll Plaza
    TollSelectedType: TollSelectedType.value,
    TollNumberofBooths: TollNumberofBooths.value,

    // Light Poles
    LightpoleSelectedType: LightpoleSelectedType.value,
    LightpoleSelectedSide: LightpoleSelectedSide.value,

    // Interchange
    InterchangeSelectedType: InterchangeSelectedType.value,

    // Patch Condition
    PatchConditionSelectedQuality: PatchConditionSelectedQuality.value,

    // Commercial Entity
    CommericalEntitySelectedType: CommericalEntitySelectedType.value,

    // Road Crossing
    SelectedRoadCrossingType: SelectedRoadCrossingType.value,
    isRoadSkew: isRoadSkew.value,

    // Drainage
    SelectedDrainageType: SelectedDrainageType.value,
    SelectedBreastwallType: SelectedBreastwallType.value,
    SelectedDrainageSide: SelectedDrainageSide.value,
    isDrainFoothpath: isDrainFoothpath.value,
    isDrainChoked: isDrainChoked.value,
    isDrainInsideRoadCrossing: isDrainInsideRoadCrossing.value,

    // Retaining Wall
    SelectedRetainingWallType: SelectedRetainingWallType.value,
    SelectedRetainingWallSide: SelectedRetainingWallSide.value,
    isRetainingWallParapet: isRetainingWallParapet.value,

    // Dyke and Curb Stone
    SelectedDykeandCurbStoneType: SelectedDykeandCurbStoneType.value,
    SelectedDykeandCurbStoneSide: SelectedDykeandCurbStoneSide.value,

    // Guard Rail
    SelectedGuardrailType: SelectedGuardrailType.value,
    SelectedGuardrailSide: SelectedGuardrailSide.value,

    // Tunnel
    SelectedTunnelType: SelectedTunnelType.value,
    SelectedTunnelShape: SelectedTunnelShape.value,
    SelectedTunnelLiningType: SelectedTunnelLiningType.value,
    SelectedTunnelPortalType: SelectedTunnelPortalType.value,
    TunnelTubes: TunnelTubes.value,
  };

  console.log("Sending filters:", payload);
  console.log("Filters applied:");
  showAssets.value = false; // Hide the filter popup after applying filters
};
</script>

<style scoped>
.icon-container {
  cursor: pointer;
}
.popup {
  position: absolute;
  top: 3rem;
  left: 5rem;
  background-color: white;
  border: 4px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  height: 38rem; /* Set a fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1100;
  width: 17rem;
  padding: 3px;
}
.popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.popup li {
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.popup li:last-child {
  border-bottom: none;
}
.list-container {
  max-height: 150px;
  overflow-y: auto;
}
</style>
