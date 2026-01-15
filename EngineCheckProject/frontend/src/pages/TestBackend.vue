<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

// Definisci l'interfaccia qui fuori o importala
interface TestBackend {
    id: number;
    // ...
}

export default defineComponent({
    data() {
        return {
            // CORRETTO: rimuovi 'this.', usa solo il nome della variabile
            testBackend: null as TestBackend | null
        }
    },
    methods: {
        getTestBackend() {
            axios.get("/api/testing")
                .then(response => {
                    // Salva i dati nella variabile
                    this.testBackend = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        // CORRETTO: Devi chiamare la funzione con le parentesi
        this.getTestBackend();
    }
})
</script>
<template>
  <div class="p-10 text-center">
    <h1 class="text-3xl font-bold text-blue-600">Pagina in Costruzione</h1>
    <p class="mt-4 text-gray-600">Questa è una pagina placeholder.</p>
    <router-link to="/" class="text-blue-500 underline mt-4 block">Torna alla Home</router-link>
  </div>
</template>