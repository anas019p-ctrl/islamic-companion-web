import { useEffect, useState } from 'react';
import { usePrayerTimes, PrayerTimes } from '@/hooks/usePrayerTimes';
import { VoiceService } from '@/lib/VoiceService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

import { ADHAN_LIBRARY } from '@/lib/AdhanLibrary';

export const AdhanManager = () => {
    const { prayerTimes, location, requestLocation } = usePrayerTimes();
    const { toast } = useToast();
    const { t } = useLanguage();
    const [lastPlayedPrayer, setLastPlayedPrayer] = useState<string | null>(null);

    // Initial location request if not set
    useEffect(() => {
        if (!location) {
            requestLocation();
        }
    }, [location, requestLocation]);

    useEffect(() => {
        if (!prayerTimes) return;

        // Check if Adhan is enabled
        const adhanEnabled = localStorage.getItem('adhan_enabled');
        if (adhanEnabled === 'false') return;

        const checkTime = () => {
            const now = new Date();
            const currentH = now.getHours();
            const currentM = now.getMinutes();
            const currentS = now.getSeconds();

            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

            prayers.forEach(p => {
                // Check if this prayer notification is enabled
                const notifications = localStorage.getItem('adhan_notifications');
                if (notifications) {
                    const notifSettings = JSON.parse(notifications);
                    if (!notifSettings[p]) return;
                }

                const timeStr = prayerTimes[p as keyof PrayerTimes];
                if (typeof timeStr !== 'string') return;

                // Parse prayer time robustly
                let h, m;
                const cleanTime = timeStr.replace(/[^0-9:APM ]/g, '');

                if (cleanTime.includes('AM') || cleanTime.includes('PM')) {
                    const [rawTime, period] = cleanTime.split(' ');
                    const [rawH, rawM] = rawTime.split(':').map(Number);
                    h = rawH;
                    m = rawM;
                    if (period === 'PM' && h < 12) h += 12;
                    if (period === 'AM' && h === 12) h = 0;
                } else {
                    [h, m] = cleanTime.split(':').map(Number);
                }

                // Match within the same minute and first 5 seconds for reliability
                if (h === currentH && m === currentM && currentS < 5) {
                    if (lastPlayedPrayer !== p) {
                        console.log(`🕌 Triggering Adhan for ${p} at ${currentH}:${currentM}`);
                        playAdhan(p);
                        setLastPlayedPrayer(p);
                    }
                }
            });
        };

        const timer = setInterval(checkTime, 1000); // Check every second
        checkTime();

        return () => clearInterval(timer);
    }, [prayerTimes, lastPlayedPrayer, t]);

    const playAdhan = (prayerName: string) => {
        // Get per-prayer selection from localStorage
        const savedSelections = localStorage.getItem('adhan_selections');
        const selections = savedSelections ? JSON.parse(savedSelections) : {};
        const adhanId = selections[prayerName] || selections['default'] || ADHAN_LIBRARY[0].id;
        const adhan = ADHAN_LIBRARY.find(a => a.id === adhanId) || ADHAN_LIBRARY[0];

        console.log(`🕌 Playing Adhan for ${prayerName}: ${adhan.name}`);

        // Use VoiceService for consistent audio playback
        VoiceService.playExternal(adhan.url);

        toast({
            title: t('timeForPrayer') || "Time for Prayer",
            description: `${t('itIsTimeFor') || 'It is now time for'} ${t(prayerName) || prayerName}`,
            duration: 10000
        });
    };

    return null; // This component handles logic only
};
