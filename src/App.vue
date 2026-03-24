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
  padding: 1.5rem 0;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(14, 165, 233, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  animation: slideInDown 0.6s ease-out;
}

.app-header h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-header h1::before {
  content: "🌦️";
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

.app-footer {
  padding: 2rem 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.9) 0%, rgba(6, 182, 212, 0.9) 100%);
  color: white;
  text-align: center;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.app-footer p {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

main {
  min-height: calc(100vh - 180px);
  padding: 2rem 0;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 640px) {
  .app-header h1 {
    font-size: 1.4rem;
  }
  
  main {
    padding: 1rem 0;
  }
}
</style>