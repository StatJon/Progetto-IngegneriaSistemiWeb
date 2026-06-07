<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Service } from '../types';

export default defineComponent({
  data() {
    const today = new Date();
    return {
      errorMessage: '',

      serviceData: [] as Service[],

      serviceIds: [] as number[],

      priceTotal: 0,

      vehicleType: '',
      vehiclePlate: '',
      vehicleModel: '',

      selectedYear: today.getFullYear(),
      selectedMonth: today.getMonth() + 1,
      selectedDay: 0,
      selectedTime: '',

      currentYear: today.getFullYear(),
      availableMonth: [] as number[],
      availableDays: [] as { day: number; available: boolean }[],
      availableTimes: [] as { timeSlot: string; available: boolean }[],
    };
  },

  async mounted() {
    this.serviceIds = (this.$route.query.services as string).split(',').map(Number);
    this.vehicleType = this.$route.query.vehicleType as any;
    await this.getServices();
    this.getTotalPrice();
    await this.getMonths();
    await this.checkDay();
  },

  watch: {
    selectedYear() {
      if (this.selectedYear !== this.currentYear) {
        this.selectedMonth = 1;
      } else {
        this.selectedMonth = new Date().getMonth() + 1;
      }
      this.getMonths();
      this.checkDay();
      this.checkTime();
    },
    selectedMonth() {
      this.checkDay();
      this.checkTime();
    },
    selectedDay() {
      this.checkTime();
    }
  },

  methods: {
    async getServices() {
      this.errorMessage = '';
      try {
        const response = await axios.get("/api/service/select", { params: { id: this.serviceIds.join(',') } });
        this.serviceData = response.data;
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    getTotalPrice() {
      this.priceTotal = 0;
      for (const service of this.serviceData) {
        this.priceTotal += Number(service.Price)
      }
    },
    async getMonths() {
      this.availableMonth = [];
      this.errorMessage = '';
      try {
        for (let i = this.selectedMonth; i <= 12; i++) {
          this.availableMonth.push(i);
        }
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async checkDay() {
      this.availableDays = [];
      this.errorMessage = '';
      try {
        const response = await axios.get(`/api/booking/checkDayAvailable/${this.selectedYear}-${this.selectedMonth}`);
        this.availableDays = response.data.daysAvailable.filter((d: any) => d.available === true);
        //console.log(this.availableDays);
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async checkTime() {
      // GET: ?date=aaaa-mm-gg&services=1,2,3,..., gli do questo in richiesta get, e ricevo JSON ({timeSlot : hh:mm, available : true/false})
      this.availableTimes = [];
      try {
        const response = await axios.get('/api/booking/checkTimeAvailable', {
          params: {
            date: `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`,
            services: this.serviceIds.join(',')
          }
        });
        this.availableTimes = response.data.filter((t: any) => t.available === true);
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async submit() {
      this.errorMessage = '';
      if (!this.vehicleModel || !this.vehiclePlate) {
        this.errorMessage = "Inserire modello e targa del veicolo";
        return;
      }
      if (!this.selectedDay) {
        this.errorMessage = "Selezionare un giorno";
        return;
      }
      if (!this.selectedTime) {
        this.errorMessage = "Selezionare un orario";
        return;
      }
      try {
        const dataSet = `${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-${String(this.selectedDay).padStart(2, '0')} ${this.selectedTime}:00`

        const response = await axios.get('/api/auth/whoamiCustomer');
        const customerId = response.data;

        await axios.post('/api/booking/saveBooking', {
          Model: this.vehicleModel,
          Vehicle_Type: this.vehicleType,
          License_Plate: this.vehiclePlate,
          Date_Time: dataSet,
          Customer_ID: customerId,
          ServicesArray: this.serviceIds
        });
        this.$router.push('/booking-final-confirmation');
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async goBack() {
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

        <div class="s-footer">
          <span class="price-tag">Totale:</span>
          <span class="price-tag">{{ priceTotal.toFixed(2) }}€</span>
        </div>

        <button class="btn-back" @click="goBack">
          ← Rivedi scelte
        </button>
      </div>

      <div class="right-column">
        <h2 class="section-title">Dettagli Appuntamento</h2>

        <div class="booking-form-card">

          <div class="form-group">
            <label for="vehicleModel">Modello veicolo</label>
            <input type="text" id="vehicleModel" v-model="vehicleModel" placeholder="Toyota Supra" />
          </div>
          <div class="form-group">
            <label for="vehiclePlate">Targa veicolo</label>
            <input type="text" id="vehiclePlate" v-model="vehiclePlate" placeholder="AA 123 BB" />
          </div>

          <hr class="divider" />

          <div class="time-selector select">
            <label for="selectYear">Anno</label>
            <select id="selectYear" v-model="selectedYear">
              <option :value="currentYear">{{ currentYear }}</option>
              <option :value="currentYear + 1">{{ currentYear + 1 }}</option>
            </select>

            <label for="selectMonth">Mese</label>
            <select id="selectMonth" v-model="selectedMonth">
              <option v-for="(month, index) in availableMonth" :key="index" :value="month">{{ month }} </option>
            </select>

            <label for="selectDay">Giorno</label>
            <select id="selectDay" v-model="selectedDay">
              <option v-for="days in availableDays" :key="days.day" :value="days.day">{{ days.day }}</option>
            </select>

          </div>

          <div class="time-selector">
            <label for="orari">Scegli una fascia oraria:</label>
            <select v-model="selectedTime" name="fascia-oraria" id="orari">
              <option v-for="timeSlot in availableTimes" :key="timeSlot.timeSlot" :value="timeSlot.timeSlot">{{
                timeSlot.timeSlot }}</option>
            </select>

          </div>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <button class="btn-submit" @click="submit">
            Conferma prenotazione ✔
          </button>

        </div>
      </div>

    </div>
  </div>
</template>
