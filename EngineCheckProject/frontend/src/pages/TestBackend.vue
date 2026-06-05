<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { Testing } from "../types";
 
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