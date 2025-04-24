import { defineStore } from 'pinia';

export const useAdminToolsStore = defineStore('adminTools', {
  state: () => ({
    drawMode: null,           // 'Point' | 'LineString' | ...
    entityCategory: null,     // e.g. 'Bridge', 'Culvert'
    featureGeometry: null,    // GeoJSON or OL feature
    isSidebarCollapsed: false,
    // ...other flags
  }),
  actions: {
    setDrawMode(mode) { this.drawMode = mode; },
    setEntityCategory(cat) { this.entityCategory = cat; },
    setFeatureGeometry(geom) { this.featureGeometry = geom; },
    toggleSidebar() { this.isSidebarCollapsed = !this.isSidebarCollapsed; },
    // TODO: saveFeature, fetchFeatures, updateFeature…
  }
});
