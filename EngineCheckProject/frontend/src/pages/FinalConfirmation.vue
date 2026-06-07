<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    goToDashboard() {
      this.$router.push('/user-dashboard')
    }
  }
})
</script>

<template>
  <div class="main-container">

    <div class="success-card">

      <h1 class="welcome-title">Prenotazione Confermata!</h1>

      <div class="spacer">
        <p class=""> Vi ringraziamo della preferenza accordataci</p>
      </div>

      <button class="btn-primary" @click="goToDashboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="margin-right:8px">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        Vai alle mie prenotazioni
      </button>

    </div>

  </div>
</template>

<style scoped>

.success-card {
  background-color: white;
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  position: relative;
}

.spacer {
  flex-grow: 1;
  font-size: 18px;
}

</style>