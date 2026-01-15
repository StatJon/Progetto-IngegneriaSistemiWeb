<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios'; // Scommenta se usi il backend reale

// Interfaccia per i dati della prenotazione
interface Booking {
  id: number;
  dateStr: string; 
  vehicle: string; 
  details: string; 
}

const router = useRouter();
const userName = ref('Nome Utente'); // Default placeholder
const bookings = ref<Booking[]>([]);
const isLoading = ref(true);

// Funzione di Logout
const handleLogout = () => {
  localStorage.removeItem('user'); // Rimuove la sessione
  router.push('/'); // Torna al login
};

// Navigazione ai dettagli
const goToBookingDetails = () =>/*(id: number) =>*/ {
  router.push(`/booking-edit/:id`);
};

// Caricamento Dati (Simulato)
onMounted(async () => {
  // 1. Recupera Nome Utente dal LocalStorage
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObj = JSON.parse(storedUser);
    userName.value = userObj.name || 'Nome Utente';
  }

  // 2. Carica Prenotazioni (Mock Dati per replicare l'immagine)
  try {
    // const response = await axios.get(`http://localhost:3000/api/bookings?userId=...`);
    // bookings.value = response.data;

    // --- DATI MOCK (Uguali alla tua immagine) ---
    bookings.value = [
      {
        id: 1,
        dateStr: "Domenica 25/12/25 dalle 14:00",
        vehicle: "Veicolo AB 123 CD",
        details: "Tagliando completo, Cinghia di distrubuzione, Pneumatici, ..."
      },
      {
        id: 2,
        dateStr: "Domenica 31/12/25 dalle 08:00",
        vehicle: "Veicolo AB 456 CD",
        details: "Tagliando completo, Cinghia di distrubuzione, Pneumatici, ..."
      }
    ];
    // --------------------------------------------
  } catch (error) {
    console.error("Errore caricamento", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="page-container">
    
    <h1 class="welcome-title">Benvenuto/a “{{ userName }}”</h1>

    <div class="bookings-list">
      
      <div v-if="isLoading" class="loading-text">Caricamento...</div>

      <div v-else v-for="booking in bookings" :key="booking.id" class="booking-card">
        
        <div class="card-info">
          <h3 class="booking-header">
            {{ booking.dateStr }}, {{ booking.vehicle }}
          </h3>
          <p class="booking-details">
            {{ booking.details }}
          </p>
        </div>

        <div class="card-actions">
          <button class="btn-review" @click="goToBookingDetails(/*booking.id*/)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Rivedi prenotazione
          </button>
        </div>

      </div>
    </div>

    <div class="logout-container">
      <button class="btn-logout" @click="handleLogout">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        LogOut
      </button>
    </div>

  </div>
</template>

<style scoped>
/* CONTAINER PRINCIPALE */
.page-container {
  background-color: #f0f6fc; /* Azzurrino chiaro */
  min-height: 85vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* TITOLO */
.welcome-title {
  font-size: 36px;
  font-weight: 800; /* Molto grassetto come nell'immagine */
  margin-bottom: 40px;
  color: #000;
  text-align: center;
}

/* LISTA CARD */
.bookings-list {
  width: 100%;
  max-width: 1000px; /* Larghezza massima per non allargarsi troppo su desktop */
  display: flex;
  flex-direction: column;
  gap: 25px; /* Spazio tra le card */
}

/* CARD PRENOTAZIONE */
.booking-card {
  background-color: white;
  border-radius: 24px; /* Angoli molto arrotondati (simili alla foto) */
  padding: 35px 40px;
  display: flex;
  justify-content: space-between; /* Spinge testo a sx e bottone a dx */
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02); /* Ombra leggerissima */
  flex-wrap: wrap; /* Per mobile */
  gap: 20px;
}

/* TESTI DENTRO LA CARD */
.card-info {
  flex: 1; /* Occupa tutto lo spazio disponibile */
  min-width: 250px;
}

.booking-header {
  font-size: 18px;
  font-weight: 800; /* Titolo in grassetto */
  color: #000;
  margin: 0 0 15px 0;
}

.booking-details {
  font-size: 15px;
  color: #444; /* Grigio scuro per i dettagli */
  margin: 0;
  line-height: 1.5;
}

/* BOTTONE RIVEDI (Blu) */
.btn-review {
  background-color: #0084ff; /* Blu brillante */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap; /* Evita che il testo vada a capo */
  transition: background 0.2s;
}

.btn-review:hover {
  background-color: #006bcf;
}

/* BOTTONE LOGOUT (Centrato in basso) */
.logout-container {
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn-logout {
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 60px; /* Molto largo come nell'immagine */
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}

.btn-logout:hover {
  background-color: #006bcf;
}

/* ADATTAMENTO MOBILE */
@media (max-width: 768px) {
  .booking-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .card-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end; /* Allinea bottone a destra anche su mobile */
  }
}
</style>