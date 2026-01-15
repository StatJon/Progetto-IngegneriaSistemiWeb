<template>
  <!-- <div class="p-10 text-center">
    <h1 class="text-3xl font-bold text-blue-600">Pagina in Costruzione</h1>
    <p class="mt-4 text-gray-600">Questa è una pagina placeholder.</p>
    <router-link to="/" class="text-blue-500 underline mt-4 block">Torna alla Home</router-link> 
  
    
  
  </div> -->
 
    <div class="container main-content" style="margin-top: auto">
      
      <section class="card-section">
        <h1>Prenota il Tuo Appuntamento in Officina</h1>
        <p style="max-width: 600px; margin: 0 auto 30px;">
          Prenota online in maniera semplice e veloce. Scegli il servizio, 
          seleziona l'orario e conferma tutto in pochi click!
        </p>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <router-link to="/booking-car" class="btn btn-primary">
            <span class="material-symbols-outlined icon">directions_car</span>
            Prenotazione per Auto
          </router-link>
          <router-link to="/booking-motorcycle" class="btn btn-primary">
            <span class="material-symbols-outlined icon">two_wheeler</span>
            Prenotazione per Moto
          </router-link>
        </div>

        <div style="margin: 40px 0 20px; font-weight: bold; font-size: 14px;">
          Engine Check ti promette:
        </div>

        <div class="features-grid">
          <div class="feature-item">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            </div>
            <h3>Risparmio Di Tempo</h3>
            <p>Prenota online in pochi minuti, senza chiamate o attese al telefono</p>
          </div>

          <div class="feature-item">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h3>Disponibilità in Tempo Reale</h3>
            <p>Visualizza gli orari disponibili e scegli quello più comodo per te</p>
          </div>

          <div class="feature-item">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3>Conferma Immediata</h3>
            <p>Ricevi conferma immediata della tua prenotazione via email</p>
          </div>
        </div>
      </section>

      <section id="dove-siamo" class="card-section">
        <h2>Dove Siamo</h2>
        <div class="map-placeholder">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d610.5237734250081!2d12.407897478744003!3d44.09220010759374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132cbf35ac03168b%3A0x2753bc0063975903!2sAssistenza%20Pneumatici%20Gattei%20Lino%20-%20BestDrive!5e0!3m2!1sit!2sit!4v1768031383494!5m2!1sit!2sit" 
            width="100%" 
            height="100%"
            style="border:0;" 
            allowfullscreen="true" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
      
        </div>
      </section>

      <section id="contatti" class="card-section">
        <h2>Contattaci</h2>
        
        <div class="contact-info">
          <div class="contact-row">
            <strong>Telefono:</strong> +39 21315141
          </div>
          <div class="contact-row">
            <strong>Fisso:</strong> 05 21547896
          </div>
          <div class="contact-row">
            <strong>Mail:</strong> EngineCheck@gmail.it
          </div>
          <div class="contact-row">
            <strong>P. IVA:</strong> 98546587954
          </div>
        </div>
      </section>

    </div>
  
</template>
<style scoped>
.home-container {
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

/* HERO SECTION */
.hero-section {
  background-color: #f0f6fc;
  padding: 60px 20px;
  text-align: center;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 10px;
}

.map-section {
    padding: 0 !important; /* FORZA la rimozione del bordo bianco/grigio interno */
    overflow: hidden;      /* Assicura che la mappa rispetti i bordi arrotondati se ci sono */
    display: flex;
    flex-direction: column;
}

/* 2. Stile per il titolo (dato che abbiamo tolto il padding al contenitore, lo ridiamo al titolo) */
.map-section h2 {
    padding: 20px;
    margin: 0;
    text-align: center;
    background-color: #fff; /* O il colore di sfondo che preferisci per il titolo */
}

/* 3. Il contenitore della mappa deve espandersi */
.map-placeholder {
    width: 100%;
    height: 450px; /* ALTEZZA FISSA: Modifica questo valore per renderla più alta o bassa */
    background-color: #eee; /* Colore di sfondo mentre carica (l'area grigia) */
}

/* 4. L'iframe deve riempire tutto il placeholder */
iframe {
    width: 100%;
    height: 100%;
    display: block; /* Rimuove eventuali spazi bianchi fantasma sotto l'iframe */
}
</style>

<!-- <template>
  <div>
    
    <header class="site-header">
      <div class="container navbar">
        <div class="logo">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7" /> <rect x="2" y="6" width="20" height="12" rx="2" stroke="#333" />
          </svg>
          engine check
        </div>

        <nav class="nav-links">
          <a href="#dove-siamo" class="nav-item">
            📍 Dove siamo
          </a>
          <a href="#contatti" class="nav-item">
            📞 Contatti
          </a>
          
          <router-link to="/booking-motorcycle" class="nav-item">
            🏍️ Prenotazione per Moto
          </router-link>
          
          <router-link to="/booking-car" class="nav-item">
            🚗 Prenotazione per Auto
          </router-link>

          <router-link to="/login-user" class="nav-item" style="font-weight: bold;">
            🔒 Log In
          </router-link>
        </nav>
      </div>
    </header>

    <div class="container main-content" style="margin-top: 30px;">
      
      <section class="card-section">
        <h1>Prenota il Tuo Appuntamento in Officina</h1>
        <p style="max-width: 600px; margin: 0 auto 30px;">
          Prenota online in maniera semplice e veloce. Scegli il servizio, 
          seleziona l'orario e conferma tutto in pochi click!
        </p>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <router-link to="/booking-car" class="btn btn-primary">
            🚗 Prenotazione per Auto
          </router-link>
          <router-link to="/booking-motorcycle" class="btn btn-primary">
            🏍️ Prenotazione per Moto
          </router-link>
        </div>

        <div style="margin: 40px 0 20px; font-weight: bold; font-size: 14px;">
          Engine Check ti promette:
        </div>

        <div class="features-grid">
          <div class="feature-item">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            </div>
            <h3>Risparmio Di Tempo</h3>
            <p>Prenota online in pochi minuti, senza chiamate o attese al telefono</p>
          </div>

          <div class="feature-item">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h3>Disponibilità in Tempo Reale</h3>
            <p>Visualizza gli orari disponibili e scegli quello più comodo per te</p>
          </div>

          <div class="feature-item">
            <div class="icon-circle">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3>Conferma Immediata</h3>
            <p>Ricevi conferma immediata della tua prenotazione via email</p>
          </div>
        </div>
      </section>

      <section id="dove-siamo" class="card-section">
        <h2>Dove Siamo</h2>
        <div class="map-placeholder">
          <p>Mappa Google Maps</p>
        </div>
      </section>

      <section id="contatti" class="card-section">
        <h2>Contattaci</h2>
        
        <div class="contact-info">
          <div class="contact-row">
            <strong>Telefono:</strong> +39 21315141
          </div>
          <div class="contact-row">
            <strong>Fisso:</strong> 05 21547896
          </div>
          <div class="contact-row">
            <strong>Mail:</strong> EngineCheck@gmail.it
          </div>
          <div class="contact-row">
            <strong>P. IVA:</strong> 98546587954
          </div>
        </div>
      </section>

    </div>

    <footer class="site-footer">
      Hiba - Jonathan 2025/2026
    </footer>

  </div>
</template>

<script setup lang="ts">
// Nessuno script particolare necessario per il layout
</script> -->