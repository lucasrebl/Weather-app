<script setup lang="ts">
// Root App component
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1>Weather Dashboard</h1>
    </div>
  </header>
  
  <main>
    <router-view />
  </main>
  
  <footer class="app-footer">
    <div class="container">
      <p>Powered by Open-Meteo API</p>
    </div>
  </footer>
</template>

<style>
.app-header {
  padding: 1rem 0;
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.app-footer {
  padding: 1rem 0;
  background-color: var(--color-secondary);
  color: white;
  text-align: center;
  margin-top: 2rem;
}

main {
  min-height: calc(100vh - 130px); /* Adjust based on header/footer height */
  padding: 1rem 0;
}

@media (max-width: 640px) {
  .app-header h1 {
    font-size: 1.2rem;
  }
}
</style>