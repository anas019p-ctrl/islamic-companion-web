
/**
 * Script di monitoraggio per App Muslim
 * Verifica lo stato dell'app e notifica in caso di problemi
 */
const https = require('https');

const APP_URL = 'https://islamic-companion-app.pages.dev/health';
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minuti

function checkHealth() {
    console.log(`[${new Date().toISOString()}] Checking health of ${APP_URL}...`);

    https.get(APP_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('✅ System Healthy');
            } else {
                console.error(`❌ System Error Status: ${res.statusCode}`);
                notifyError(`Status Code: ${res.statusCode}`);
            }
        });
    }).on('error', (err) => {
        console.error(`❌ System Down: ${err.message}`);
        notifyError(err.message);
    });
}

function notifyError(message) {
    // Qui si può integrare una webhook di Discord o Telegram
    console.log(`ALERT: System Issue Detected: ${message}`);
}

console.log('Starting monitoring system...');
setInterval(checkHealth, CHECK_INTERVAL);
checkHealth();
