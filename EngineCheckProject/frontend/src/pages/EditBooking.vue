<script lang="ts">
import { defineComponent } from 'vue';
import type { Job, Booking } from '../types';
import axios from 'axios';


export default defineComponent({
    data() {
        return {
          errorMessage: '',
          job : [] as Job [],
          selectedBooking : [] as Booking[],
          jobId:''

        }
    },
    async mounted() {
        this.jobId = this.$route.query.id as any;

       await this.getServices();


    },
    methods: {
      async getServices(){
        try{
          const response = await axios.get(`/api/customer/jobDetails/${this.jobId}`);
          this.job = response.data;
          console.log("cosa stai facendo")
          

        }catch(error: any){
           this.errorMessage = error.response.data.message

        }
      },
      async deleteBooking(){
        try{

        }catch(error: any )
        {
           this.errorMessage = error.response.data.message
        }

      },
      async goBack() {
      // tasto per tornare nella pagina precedente , senza salvare le cose
      this.$router.back();
    }


    }
}
)

</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Rivedi l’appuntamento</h1>

    <div class="details-card">
      <h2 class="card-subtitle">{{ job. }}</h2>

      <div class="table-responsive">
        <table class="jobs-table">
          <thead>
            <tr>
              <th>Prenotazione</th>
              <th>Stato</th>
              <th>Data-Ora Inizio</th>
              <th>Lavoro da effettuare</th>
              <th>Tempo</th>
              <th>Targa</th>
              <th class="text-center">Seleziona</th> </tr>
          </thead>
          <tbody>
            <tr v-if="jobId.length === 0">
              <td colspan="7" class="empty-state">Nessun lavoro presente in questa prenotazione.</td>
            </tr>
            <tr v-else>
              <td>{{ job.status}}</td>
              <td>{{ job.status }}</td>
              <td>{{ job.startTime }}</td>
              <td>{{ job.task }}</td>
              <td>{{ job.estimated }}</td>
              <td>{{ job.plate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="action-container">
      <button class="btn-booking" @click="deleteBooking">
        <svg xmlns="http://www.w3.org/2000/Svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
       Cancella Appuntamento
      </button>
      <button class="btn-booking">Pagina precedente </button>
    </div>

  </div>
</template>

<style scoped>
.page-container {
  background-color: #f0f6fc;
  min-height: 85vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 30px;
  color: #000;
  text-align: center;
}

.details-card {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1100px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  min-height: 400px;
}

.card-subtitle {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #000;
}

.table-responsive { width: 100%; overflow-x: auto; }

.jobs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #333;
}

.jobs-table th {
  background-color: #ededed;
  font-weight: 700;
  text-align: left;
  padding: 12px;
  border: 1px solid #ccc;
}

.jobs-table td {
  border: 1px solid #ccc;
  padding: 12px;
  vertical-align: middle;
}

.text-center { text-align: center; }

/* CHECKBOX PERSONALIZZATO */
.custom-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #0084ff; /* Colore blu quando selezionato */
}

/* EVIDENZIA LA RIGA SELEZIONATA */
.row-selected {
  background-color: #f0f8ff; /* Azzurro chiarissimo */
}

.empty-state { text-align: center; padding: 20px; color: #666; font-style: italic; }

.action-container {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn-booking {
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 40px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background 0.2s;
}

.btn-booking:hover {
  background-color: #006bcf;
}
</style>