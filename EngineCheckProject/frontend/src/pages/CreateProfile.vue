<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; 

// Stati del form
const name = ref('');
const Last_name = ref('');
const email = ref('');
const password = ref('');
const Numero= ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

// Funzione di Registrazione
const handleRegister = async () => {
  errorMessage.value = '';
  
  if (/*!name.value  ||*/  !email.value || !password.value) {
    errorMessage.value = 'Per favore compila tutti i campi.';
    return;
  }

  isLoading.value = true;
   router.push('/user-dashboard'); 
  

  // try {
  //   const response = await axios.post('http://localhost:3000/api/auth/register', {
  //     name: name.value,
  //     email: email.value,
  //     password: password.value
  //   });

  //   if (response.data.success) {
  //     // Registrazione riuscita -> rimanda al login
  //     alert('Account creato con successo! Ora puoi accedere.');
  //     router.push('/login'); 
  //   }
  // } catch (error: any) {
  //   if (error.response && error.response.status === 409) {
  //     errorMessage.value = 'Questa email è già in uso.';
  //   } else {
  //     errorMessage.value = 'Errore durante la registrazione. Riprova.';
  //   }
  // } finally {
  //   isLoading.value = false;
  // }
};
</script>

<template>
  <div class="main-container">
    
    <div class="register-card">
      
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>

       <div class="form-group">
        <label for="Name">Nome</label>
        <input 
          id="Name" 
          type="text" 
          v-model="name" 
          placeholder="Il tuo nome" 
        />
      </div> 

      <div class="form-group">
        <label for="Cognome">Cognome</label>
        <input 
          id="Last_Name" 
          type="text" 
          v-model="Last_name" 
          placeholder="Il tuo Cognome" 
        />
      </div> 

      <div class="form-group">
        <label for="Numero">Numero</label>
        <input 
          id="Number" 
          type="text" 
          v-model="Numero" 
          placeholder="Il tuo numero " 
        />
      </div> 



      <div class="form-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          v-model="email" 
          placeholder="Value" 
        />
      </div>

      <div class="form-group">
        <label for="Password">Password</label>
        <input 
          id="password" 
          type="password" 
          v-model="password" 
          placeholder="Value" 
        />
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button class="btn-primary" @click="handleRegister" :disabled="isLoading">
        {{ isLoading ? 'Creazione in corso...' : 'Crea Profilo' }}
      </button>

    </div>

  </div>
</template>

<style scoped>
/* STILI CONDIVISI (Uguali alle altre pagine per coerenza) */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh; 
  background-color: #f0f6fc;
  padding: 20px;
}

.register-card {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #e1e4e8;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.icon-wrapper {
  margin-bottom: 25px;
  color: #24292f;
  display: flex;
  justify-content: center;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5da;
  border-radius: 6px;
  outline: none;
  background-color: white;
  color: #333;
}

.form-group input::placeholder { color: #bfbfbf; }

.form-group input:focus {
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
}

.error-text {
  color: #cf222e;
  font-size: 13px;
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #24292f;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover { background-color: #000; }
</style>