<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { Service } from "../types";

export default defineComponent({
    data() {
        return {
            errorMessage: '',
            vehicleFilter: '',
            services: [] as Service[],
            selectedServices: [] as number[],
        };
    },
    async mounted() {
        await this.getServices()
    },
    methods: {
        async getServices() {
            this.errorMessage = '';
            try {
                this.vehicleFilter = this.$route.params.vehicleType as string
                const response = await axios.get(`/api/service/${this.vehicleFilter}`);
                this.services = response.data;
            } catch (error: any) {
                this.errorMessage = error.response.data.message
            }
        },
        toggleService(id: number) {
            const index = this.selectedServices.indexOf(id);
            if (index > -1) {
                this.selectedServices.splice(index, 1);
            } else {
                this.selectedServices.push(id);
            }
        },
        confirmSelection() {
            this.errorMessage = '';
            if (this.selectedServices.length === 0) {
                this.errorMessage = "Errore: Seleziona almeno un servizio"
                return;
            }
            this.$router.push({
                path: '/booking-confirm',
                query: { services: this.selectedServices.join(','), vehicleType: this.vehicleFilter }
            });
        }
    },
    watch: {
        '$route.params.vehicleType'() {
            this.selectedServices = [];
            this.getServices();
        }
    }
})
</script>

<template>
    <div class="page-container">
        <h1 class="page-title">Selezionare i servizi per {{ vehicleFilter === 'car' ? 'auto' : 'moto' }} da prenotare
        </h1>

        <div class="services-grid">
            <div class="service-column">
                <h2 class="column-title">Manutenzione {{ vehicleFilter === 'car' ? 'auto' : 'moto' }} </h2>
                <div v-for="service in services.filter(s => s.Category === 'maintenance')" :key="service.Service_ID"
                    class="service-card" :class="{ 'selected': selectedServices.includes(service.Service_ID) }"
                    @click="toggleService(service.Service_ID)">
                    <div class="card-header">
                        <div class="checkbox-custom">
                            <span v-if="selectedServices.includes(service.Service_ID)">✔</span>
                        </div>
                        <span class="price-tag">{{ service.Price }} €</span>
                    </div>
                    <h3 class="service-title">{{ service.Title }}</h3>
                    <p class="service-desc">{{ service.Description }}</p>
                    <div class="service-footer">
                        <i class="clock-icon">🕒</i>
                        <span>{{ service.Minutes }} min</span>
                    </div>
                </div>
            </div>

            <div class="service-column">
                <h2 class="column-title">Pneumatici</h2>
                <div v-for="service in services.filter(s => s.Category === 'tyres')" :key="service.Service_ID"
                    class="service-card" :class="{ 'selected': selectedServices.includes(service.Service_ID) }"
                    @click="toggleService(service.Service_ID)">
                    <div class="card-header">
                        <div class="checkbox-custom">
                            <span v-if="selectedServices.includes(service.Service_ID)">✔</span>
                        </div>
                        <span class="price-tag">{{ service.Price }} €</span>
                    </div>
                    <h3 class="service-title">{{ service.Title }}</h3>
                    <p class="service-desc">{{ service.Description }}</p>
                    <div class="service-footer">
                        <span>🕒 {{ service.Minutes }} min</span>
                    </div>
                </div>
            </div>

            <div class="service-column">
                <h2 class="column-title">Riparazioni / Cura</h2>
                <div v-for="service in services.filter(s => s.Category === 'repair')" :key="service.Service_ID"
                    class="service-card" :class="{ 'selected': selectedServices.includes(service.Service_ID) }"
                    @click="toggleService(service.Service_ID)">
                    <div class="card-header">
                        <div class="checkbox-custom">
                            <span v-if="selectedServices.includes(service.Service_ID)">✔</span>
                        </div>
                        <span class="price-tag">{{ service.Price }} €</span>
                    </div>
                    <h3 class="service-title">{{ service.Title }}</h3>
                    <p class="service-desc">{{ service.Description }}</p>
                    <div class="service-footer">
                        <span>🕒 {{ service.Minutes }} min</span>
                    </div>
                </div>
            </div>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <div class="action-bar">
            <button class="btn-confirm" @click="confirmSelection">
                Conferma servizi e scegli data
            </button>
        </div>
    </div>
</template>
