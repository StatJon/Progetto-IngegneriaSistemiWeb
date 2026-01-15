<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Funzione per tornare alla dashboard (lista prenotazioni)
const goToDashboard = () => {
  router.push('/user-dashboard');
};
</script>

<template>
  <div class="page-container">
    
    <div class="success-card">
      
      <h1 class="success-title">Prenotazione Confermata!</h1>

      <div class="spacer"></div>

      <button class="btn-dashboard" @click="goToDashboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        Vai alle mie prenotazioni
      </button>

    </div>

  </div>
</template>

<style scoped>
/* SFONDO PAGINA */
.page-container {
  background-color: #f0f6fc; /* Azzurrino chiaro */
  min-height: 85vh; /* Occupa quasi tutta l'altezza */
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center; /* Centra perfettamente la card */
}

/* CARD BIANCA */
.success-card {
  background-color: white;
  border-radius: 24px; /* Angoli molto arrotondati come nell'immagine */
  width: 100%;
  max-width: 900px; /* Larghezza simile alla foto */
  height: 500px; /* Altezza fissa per creare lo spazio vuoto */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  /* Ombra leggera invece del bordo blu spesso, per un look più pulito come questa immagine */
  box-shadow: 0 4px 20px rgba(0,0,0,0.02); 
  position: relative;
}

/* TITOLO */
.success-title {
  font-size: 36px; /* Grande e visibile */
  font-weight: 800; /* Molto grassetto */
  font-style: italic; /* Corsivo */
  color: #000;
  margin-top: 30px; 
  text-align: center;
}

/* SPAZIATORE */
.spacer {
  flex-grow: 1; /* Occupa tutto lo spazio disponibile tra titolo e bottone */
}

/* BOTTONE BLU */
.btn-dashboard {
  background-color: #0084ff; /* Blu brillante */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px 30px; /* Un po' più grande */
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 40px; /* Distanza dal fondo della card */
  transition: background 0.2s;
}

.btn-dashboard:hover {
  background-color: #006bcf;
}
</style>