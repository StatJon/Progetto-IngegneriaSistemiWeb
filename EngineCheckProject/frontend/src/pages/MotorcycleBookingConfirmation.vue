<script lang="ts">
import { defineComponent } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

/*todo
  finire la richesta api del checkAvailable
  riadattare le richieste nel template
  menu a tendina orari va bene 


*/



// route = useRoute();
//const router = useRouter();



//const selectedServices = ref<any[]>([]);

interface Service {
  Service_ID: number;
  Minutes: number;
  Title: string;
  Description: string;
  Price: number;
  Vehicle_Type: 'car' | 'motorcycle';
  Category: 'maintenance' | 'repair' | 'tyres';
}

export default defineComponent({
  data() {
    const today = new Date();
    return {
      serviceIds: [] as number[],
      serviceData: [] as Service[],
      avMonth: [] as number[],
      selectedYear: today.getFullYear() ,
      selectedMonth: today.getMonth() + 1,
      selectedDay: 0,
      currentYear: today.getFullYear() ,



      // Aggiunti per memorizzare i dati ricevuti dal backend
      availableDays: [] as { day: number; available: boolean }[],
      availableTimes: [] as { timeSlot: string; available: boolean }[],


      bookingForm: {
        vehicleType: '',
        vehiclePlate: '',
        vehicleModel: '',
        month: '',
        year: '',
        day: '',
        timeSlot: ''
      }

    };

  },
  async mounted() {

    this.serviceIds = this.$route.query.services as any;

    this.getServices();
    //await this.getCurrentYear();
    await this.getMonths();
    await this.checkDay();
    //this.checkTime();


  },
  watch: {
    selectedYear() {
      this.getMonths();
      this.checkDay();
      this.checkTime();
      console.log("hai cambiato l'anno");
    },
    selectedMonth() {
      this.checkDay();
      this.checkTime();
      console.log("hai cambiato il mese");

    },
    selectedDay() {
      this.checkTime();
      console.log("hai cambiato il giorno ");
    }
  },
  methods: {
    async getServices() {
      try {


        const response = await axios.get("/api/service/select", { params: { id: this.serviceIds } });


        this.serviceData = response.data;


      } catch (error) {
        console.error("Errore nel recupero dei servizi:", error);
      }
    },
    /*
    async getCurrentYear() {
      const today = new Date();
      this.selectedYear = today.getFullYear();
      this.selectedMonth = today.getMonth() + 1;


    },
*/
    async getMonths() {
      this.avMonth = [];
      for (let i = this.selectedMonth; i <= 12; i++) {
        this.avMonth.push(i);

      }


    },
    async checkDay() {
      // dai in input al backend anno-mese e in output riceverai tutti i giorni assieme alla disponibilita in booleano   
      this.availableDays = [];
      try {

        const response = await axios.get(`/api/booking/checkDayAvailable/${this.selectedYear}-${this.selectedMonth}`);

        this.availableDays = response.data.daysAvailable.filter((d: any) => d.available === true);
        console.log(this.availableDays);
      } catch (error) {
        console.error("Errore nel recupero dei servizi:", error);
      }


    },
    async checkTime() {
      // GET: ?date=aaaa-mm-gg&services=1,2,3,..., gli do questo in richiesta get, e ricevo JSON ({timeSlot : hh:mm, available : true/false})
      this.availableTimes = [];

      const response = await axios.get('/api/booking/checkTimeAvailable', {
        params: {
          date: `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`,
          services: this.serviceIds
        }
      });
      this.availableTimes = response.data.filter((t: any) => t.available === true);




    },
    async submit() {
      // salva le variabili nel form bookingForm 
      // e io devo darli come input POST JSON {Model, Vehicle_Type, License_Plate, Date_Time, Customer_ID, ServicesArray,}
      // in output compare il messaggio di conferma (va tutto bene)



    },
    async goBack() {
      // tasto per tornare nella pagina precedente , senza salvare le cose
      this.$router.back();
    }










  }
});




</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Selezionare la data dell’appuntamento</h1>

    <div class="layout-grid">

      <div class="left-column">
        <h2 class="section-title">Riepilogo servizi prenotati</h2>

        <div class="services-list">
          <div v-for="service in serviceData" :key="service.Service_ID" class="summary-card">
            <div class="card-check">✔</div>
            <div class="card-content">
              <h3 class="s-title">{{ service.Title }}</h3>
              <p class="s-desc">{{ service.Description }}</p>
              <div class="s-footer">
                <span class="s-price">{{ service.Price + "€" }}</span>
              </div>
              <div class="service-footer">
                <i class="clock-icon">🕒</i>
                <span>{{ service.Minutes }} min</span>
              </div>
            </div>
          </div>
        </div>

        <button class="btn-back" @click="goBack">
          ← Rivedi scelte
        </button>
      </div>

      <div class="right-column">
        <h2 class="section-title">Prenota l’appuntamento</h2>

        <div class="booking-form-card">

          <div class="form-group">
            <label>Tipo Veicolo</label>
            <input type="text" v-model="bookingForm.vehicleType" placeholder="Es. Moto, Auto, SUV" />
          </div>

          <div class="form-group">
            <label>Targa veicolo</label>
            <input type="text" v-model="bookingForm.vehiclePlate" placeholder="Inserisci targa" />
          </div>
          <div class="form-group">
            <label>modello veicolo</label>
            <input type="text" v-model="bookingForm.vehicleModel" placeholder="Inserisci modello" />
          </div>

          <hr class="divider" />

          <div class="Calendar">
            <label>Anno</label>
            <select v-model ="selectedYear">
              <option :value ="currentYear">{{ currentYear }}</option>
              <option :value ="currentYear +1">{{ currentYear + 1 }}</option>
            </select>

            <label>Mese</label>
            <select v-model ="selectedMonth">
              <option  v-for="(month, index) in avMonth" :key="index" :value ="month">{{ month }} </option>

            </select>

            <label>Giorno</label>
            <select v-model ="selectedDay">
              <option  v-for="days in availableDays" :key="days.day" :value ="days">{{ days.day }}</option>

            </select>

          </div>

          <div class="time-selector">
            <label for="orari">Scegli una fascia oraria:</label>

            <select name="fascia-oraria" id="orari">
              <option v-for="timeSlot in availableTimes" :key="timeSlot.timeSlot">{{ timeSlot.timeSlot }}</option>
            </select>

          </div>


          <button class="btn-submit" @click="submit">
            Conferma prenotazione ✔
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-color: #f0f6fc;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.page-title {
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 40px;
}

.layout-grid {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
}

/* COLONNA SINISTRA */
.left-column {
  flex: 1;
  max-width: 400px;
}

.section-title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.summary-card {
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.card-check {
  background: #ccc;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
}

.s-title {
  font-size: 15px;
  font-weight: bold;
  margin: 0 0 5px 0;
}

.s-desc {
  font-size: 13px;
  color: #666;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.s-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: bold;
  color: #444;
}

.btn-back {
  width: 100%;
  padding: 12px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
}

.btn-back:hover {
  background-color: #006bcf;
}


/* COLONNA DESTRA */
.right-column {
  flex: 2;
}

.booking-form-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.divider {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #eee;
}

/* CALENDARIO */
.calendar-wrapper {
  max-width: 350px;
  margin: 0 auto 30px auto;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
}

.day-name {
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.day-number {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  font-size: 14px;
}

.day-number:hover {
  background-color: #f0f0f0;
}

.day-number.selected {
  background-color: #333;
  color: white;
}

/* TIME SELECTOR */
.time-selector {
  text-align: center;
  margin-bottom: 30px;
}

.time-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #e0dcf5;
  /* Colore viola chiaro tipo immagine */
  padding: 10px;
  border-radius: 12px;
  width: fit-content;
  margin: 10px auto;
}

.time-inputs select {
  background: transparent;
  border: none;
  font-size: 32px;
  font-weight: bold;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #006bcf;
}

/* Responsive */
@media (max-width: 800px) {
  .layout-grid {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    width: 100%;
    max-width: none;
  }
}
</style>