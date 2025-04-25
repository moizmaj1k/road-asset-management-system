<template>
    <div class="flex h-full">
      <aside :class="['w-1/3', { 'w-0': store.isSidebarCollapsed }]">
        <nav class="tabs">
          <router-link :to="{ name: 'AdminToolsAdd' }">Add New</router-link>
          <router-link :to="{ name: 'AdminToolsEdit' }">Edit Existing</router-link>

          <button @click="store.toggleSidebar()">⇤</button>
        </nav>
        <router-view />
      </aside>
  
      <main class="flex-1 relative">
        <OLMap />
        <DrawToolbar class="absolute top-4 right-4" />
      </main>
    </div>
  </template>
  
  <script setup>
  import { useAdminToolsStore } from '../../stores/adminTools';
  import OLMap from './AdminToolsComponents/OLMap.vue';
  import DrawToolbar from './AdminToolsComponents/DrawToolbar.vue';
  
  const store = useAdminToolsStore();
  </script>
  
  <style>
  /* Add flex and collapse transitions */
  </style>
  