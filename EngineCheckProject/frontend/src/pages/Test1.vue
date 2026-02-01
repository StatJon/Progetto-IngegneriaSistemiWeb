<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import type { Testing } from "../types";


export default defineComponent({
    data(): { testBackend: Testing } {
        return {
            testBackend: {} as Testing,
        };
    },
methods: {
    async getTest() {
      try {
        const response = await axios.get<Testing>("/api/testing");
        this.testBackend = response.data;
        console.log("Backend response:", response.data);
      } catch (err) {
        console.error("Error fetching /api/testing:", err);
      }
    },
  },
    mounted() {
        this.getTest()
    }
})
</script>


<template>
    <main>
        <pre>{{ JSON.stringify(testBackend, null, 2) }}</pre>
        <p v-if="testBackend.message">{{ testBackend.message }}</p>
    </main>

</template>
<style>
.input {
    padding: 10px 12px;
    margin-top: auto;
}
</style>