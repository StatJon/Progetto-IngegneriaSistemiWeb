# TODO principali

### Convertire tutte le pagine in Options API e completare tutte le pagine

### Controllare coerenza e funzionamento delle route in main.ts

### Debug/controllo

---
# TODO migliorativi importanti

### `/booking/car || /booking/motorcycle`
- Usare singola pagina "Booking"
- in main.ts cambiare le due route nella stessa singola "Booking"
- creare funzione in `mounted()` che legge route `/booking-car` o `/booking-motorcycle` e lo salva in variabile 
(`this.vehicleType = this.$route.params.vehicleType`)
- Il resto del Component utilizza la variabile per decidere cosa mostrare tra car e motorcycle

### Uniformare gli style, creare mini-file style per tipi simili di pagina

### Ove utile, creare cartella components ed usare import di components

