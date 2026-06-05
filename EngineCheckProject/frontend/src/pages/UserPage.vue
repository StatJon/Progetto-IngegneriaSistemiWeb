<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Booking } from '../types';

export default defineComponent({
  data() {
    return {
      userName: '',
      bookings: [] as Booking[],
      errorMessage: '',
    }
  },
  async mounted() {
    this.getUserName()
    await this.getUserJobs()
  },
  methods: {

    getUserName() {
      const firstName = sessionStorage.getItem('firstName') || '';
      const lastName = sessionStorage.getItem('lastName') || '';
      this.userName = `${firstName} ${lastName}`.trim()
    },

    async getUserJobs() {
      this.errorMessage = '';
      try {
        const response = await axios.get("/api/customer/customerPage");
        this.bookings = response.data;
        if (this.bookings.length === 0){
          this.errorMessage = "Nessuna prenotazione presente, prenota ora!"
        }
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
   async goToJobDetails(jobId: number) {
      //this.$router.push(`/booking-edit/${jobId}`)
       await axios.get(`/api/customer/jobDelete/${jobId}`)
    },
    async logout() {
      this.errorMessage = '';
      try {
      await axios.get('/api/auth/logout');
      sessionStorage.clear();
      this.$router.push('/')
      }catch(error: any){
        this.errorMessage = error.response.data.message
      }
    },

    helperFormatDate(dateString: string): string {
      const date = new Date(dateString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    }
  }
}
)
</script>

<template>
  <div class="page-container">

    <h1 class="welcome-title">Benvenuto/a {{ userName }}</h1>

    <div class="bookings-list">

<div v-if="errorMessage" style="text-align: center; color: #666; font-size: 18px; margin-top: 60px; width: 100%;">
  {{ errorMessage }}
</div>

      <div v-for="booking in bookings" :key="booking.Job_ID" class="booking-card">

        <div class="card-info">
          <h3 class="booking-header">
            {{ helperFormatDate(booking.Date_Time) }} | {{ booking.Model }} ({{ booking.License_Plate }})
          </h3>
          <p class="booking-details">
             {{ booking.Services }}
          </p>
        </div>

        <div class="card-actions">
          <button class="btn-review" @click="goToJobDetails(booking.Job_ID)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              style="margin-right:8px">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Rivedi prenotazione
          </button>
        </div>

      </div>
    </div>

    <div class="logout-container">
      <button class="btn-logout" @click="logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="margin-right:8px">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        Logout
      </button>
    </div>

  </div>
</template>

<style scoped>
/* CONTAINER PRINCIPALE */
.page-container {
  background-color: #f0f6fc;
  /* Azzurrino chiaro */
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
  font-weight: 800;
  /* Molto grassetto come nell'immagine */
  margin-bottom: 40px;
  color: #000;
  text-align: center;
}

/* LISTA CARD */
.bookings-list {
  width: 100%;
  max-width: 1000px;
  /* Larghezza massima per non allargarsi troppo su desktop */
  display: flex;
  flex-direction: column;
  gap: 25px;
  /* Spazio tra le card */
}

/* CARD PRENOTAZIONE */
.booking-card {
  background-color: white;
  border-radius: 24px;
  /* Angoli molto arrotondati (simili alla foto) */
  padding: 35px 40px;
  display: flex;
  justify-content: space-between;
  /* Spinge testo a sx e bottone a dx */
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  /* Ombra leggerissima */
  flex-wrap: wrap;
  /* Per mobile */
  gap: 20px;
}

/* TESTI DENTRO LA CARD */
.card-info {
  flex: 1;
  /* Occupa tutto lo spazio disponibile */
  min-width: 250px;
}

.booking-header {
  font-size: 18px;
  font-weight: 800;
  /* Titolo in grassetto */
  color: #000;
  margin: 0 0 15px 0;
}

.booking-details {
  font-size: 15px;
  color: #444;
  /* Grigio scuro per i dettagli */
  margin: 0;
  line-height: 1.5;
}

/* BOTTONE RIVEDI (Blu) */
.btn-review {
  background-color: #0084ff;
  /* Blu brillante */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  /* Evita che il testo vada a capo */
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
  padding: 12px 60px;
  /* Molto largo come nell'immagine */
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
    justify-content: flex-end;
    /* Allinea bottone a destra anche su mobile */
  }
}
</style>