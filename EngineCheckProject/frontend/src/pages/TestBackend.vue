<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { Testing } from "../types";

// Definisci l'interfaccia qui fuori o importala
// interface TestBackend {
//     id: number;
//     // ...
// }
 
export default defineComponent({
    data() {
        return {
          
            testBackend: [] as Testing[]
        }
    },
    methods: {
        getTestBackend() {
            axios.get("/api/testing")
                .then(response => {
                    // Salva i dati nella variabile
                    this.testBackend = response.data;
                    alert(response.data);
                })
                .catch(error => {
                    console.error(error);
                    alert(error);
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
    <h1>{{ testBackend.length }}</h1>
    <router-link to="/" class="text-blue-500 underline mt-4 block">Torna alla Home</router-link>
  </div> 
</template>