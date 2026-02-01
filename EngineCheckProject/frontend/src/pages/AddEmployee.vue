<template>
  <div class="page-container">
    <main class="main-content">
      <div class="Info-card">
        
        <div class="form-group">
          <label>Nome del dipendente</label>
          <input type="text" placeholder="Inserisci il nome" />
        </div>
        
        <div class="form-group">
          <label>Cognome  del dipendente</label>
          <input type="text" placeholder="Inserisci il cognome" />
        </div>

        <div class="form-group">
          <label>Password </label>
          <input type="password" placeholder="Digitare la password" />
        </div>

        <div class="form-group">
          <label>Ruolo</label>
        <select name="fascia-oraria" id="orari">
            <optgroup label="Ruoli">
                <option value="Worker">Worker</option>
                <option value="Admin">Admin</option>
            </optgroup> 
        </select>  
        </div>
        
        
        
      </div>
     
      
      <button class="btn-signin" @click="">Aggiungi Dipendente </button>
    </main>

    <footer class="footer">
      <p>Hiba - Jonathan</p>
      <p>2025/2026</p>
    </footer>
  </div>
</template>

<style scoped>


.form-group label {
  display: block;
  margin-bottom: 0.8rem; /* Aumentato lo spazio sotto la label */
  font-weight: 600;
  color: #000000;
  
  /* --- MODIFICHE PER RENDERE LE LABEL PIÙ "LUNGHE" E VISIBILI --- */
  letter-spacing: 0.5px;      /* Distanzia leggermente le lettere */
  text-transform: uppercase;  /* Opzionale: rende il testo più imponente */
  font-size: 0.85rem;         /* Leggermente più piccolo se maiuscolo, bilancia la lunghezza */
  width: 100%;                /* Assicura che occupi tutta la riga */
}

.Info-card {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* Ho allargato leggermente la card (da 450 a 500) per far stare le label lunghe su una riga */
  border: 1px solid #e2e8f0;
}

/* Altri stili invariati dal tuo codice originale */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
}

.main-content {
  flex-grow: 1;
  background-color: #f0f7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
}

.btn-signin {
 
  padding: 0.8rem;
  background-color: #2d3748;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.footer {
  text-align: center;
  padding: 2rem;
  background-color: #ffffff;
  color: #718096;
  font-size: 0.85rem;
}
</style>