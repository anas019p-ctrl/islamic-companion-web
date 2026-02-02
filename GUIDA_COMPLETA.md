
# GUIDA COMPLETA: App Muslim su Cloudflare

Questa guida fornisce tutte le istruzioni necessarie per la gestione, il deploy e il monitoraggio dell'applicazione "App Muslim" ospitata su Cloudflare Pages.

---

## INDICE
1. [Setup Iniziale](#1-setup-iniziale)
2. [Configurazione Completa](#2-configurazione-completa)
3. [Deploy e Automazione](#3-deploy-e-automazione)
4. [Monitoraggio 24/7](#4-monitoraggio-247)
5. [Manutenzione e Aggiornamenti](#5-manutenzione-e-aggiornamenti)
6. [Troubleshooting](#6-troubleshooting)
7. [Sicurezza](#7-sicurezza)
8. [Performance](#8-performance)
9. [Comandi Utili](#9-comandi-utili)
10. [Checklist Operativo](#10-checklist-operativo)

---

## 1. SETUP INIZIALE

### Prerequisiti
- Node.js v20 o superiore.
- Account Cloudflare con accesso a Pages.
- Git configurato localmente.

### Installazione dipendenze
Eseguire il comando nella root del progetto:
```bash
npm install
```

### Configurazione Cloudflare
Il progetto è configurato per utilizzare **Cloudflare Pages**.
1. Collegare il repository GitHub a Cloudflare Pages.
2. Impostare la directory di output su `dist`.
3. Impostare il comando di build su `npm run build`.

---

## 2. CONFIGURAZIONE COMPLETA

### Variabili d'ambiente
Le seguenti variabili devono essere impostate nel pannello Cloudflare Pages (Settings > Environment Variables):
- `VITE_SUPABASE_URL`: Endpoint del database Supabase.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Chiave pubblica di Supabase.
- `VITE_GOOGLE_AI_API_KEY`: Chiave API per Gemini AI.
- `VITE_ELEVENLABS_API_KEY`: Chiave API per la sintesi vocale.

### wrangler.toml spiegato
Il file `wrangler.toml` gestisce la configurazione del deploy:
- `name`: Nome del progetto su Cloudflare.
- `compatibility_date`: Data di compatibilità per le API di Cloudflare.
- `pages_build_output_dir`: Cartella contenente i file pronti per il web.

---

## 3. DEPLOY E AUTOMAZIONE

### Deploy Manuale
Per caricare manualmente l'ultima versione:
```bash
npm run deploy
```

### GitHub Actions Setup
Il file `.github/workflows/deploy.yml` gestisce il deploy automatico. Ogni volta che viene fatto un `push` sul ramo `main`, GitHub:
1. Scarica il codice.
2. Installa le dipendenze.
3. Esegue la build.
4. Carica i file su Cloudflare.
5. Verifica lo stato tramite l'endpoint `/health`.

---

## 4. MONITORAGGIO 24/7

### Health Checks
L'applicazione espone un endpoint `/health` (gestito in `functions/health.ts`) che restituisce lo stato del sistema in tempo reale.

### Script di Monitoraggio
Il file `scripts/monitor.js` può essere eseguito su un server esterno o localmente per controllare lo stato dell'app ogni 5 minuti:
```bash
node scripts/monitor.js
```

---

## 5. MANUTENZIONE E AGGIORNAMENTI

- **Schedule**: Si consiglia di controllare gli aggiornamenti delle dipendenze ogni mese.
- **Downtime**: Il sistema di deploy di Cloudflare garantisce **Zero Downtime**. La vecchia versione resta attiva finché la nuova non è pronta.
- **Rollback**: Se una nuova versione causa problemi, è possibile tornare alla versione precedente istantaneamente dal pannello di Cloudflare Pages.

---

## 6. TROUBLESHOOTING

- **Errore 404 su Refresh**: Risolto tramite il file `public/_redirects`.
- **Audio non funzionante**: Verificare la connessione a ElevenLabs e la validità della chiave API.
- **Hadith non caricati**: Il sistema ora utilizza un database locale (`src/data/hadith-database.ts`) come backup se l'API fallisce.

---

## 7. SICUREZZA

- **Secrets Management**: Non caricare mai chiavi API nel codice. Usare sempre le variabili d'ambiente.
- **CORS**: Configurato per permettere l'accesso solo dai domini autorizzati.
- **Rate Limiting**: Si consiglia di attivare il Rate Limiting dal pannello Cloudflare per proteggere l'API.

---

## 8. PERFORMANCE

- **Caching**: Cloudflare gestisce automaticamente il caching degli asset statici.
- **Optimization**: Le immagini e gli script sono minificati durante la build (`npm run build`).

---

## 9. COMANDI UTILI

- **Sviluppo Locale**: `npm run dev`
- **Build di Produzione**: `npm run build`
- **Deploy**: `npm run deploy`
- **Test di Robustezza**: `npm test`
- **Monitoraggio**: `node scripts/monitor.js`

---

## 10. CHECKLIST OPERATIVO

### Settimanale
- [ ] Verificare i log di Cloudflare.
- [ ] Controllare lo stato dei backup di Supabase.

### Mensile
- [ ] Aggiornare le dipendenze critiche.
- [ ] Revisione della sicurezza delle chiavi API.

---
*Fatto con dedizione per la Ummah.*
