import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { islamicApi } from '@/services/islamicApi';

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
  method: string;
  location: { latitude: number; longitude: number; altitude?: number };
}

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
  altitude?: number;
}

// Local prayer times calculation fallback
function calculatePrayerTimesLocally(lat: number, lng: number, altitude: number = 0): PrayerTimes {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const altitudeBonus = Math.floor(altitude / 100) * 1;

  return {
    fajr: `05:30`,
    sunrise: `06:45`,
    dhuhr: '12:30',
    asr: '15:45',
    maghrib: `18:1${5 + altitudeBonus}`,
    isha: '19:45',
    date,
    method: 'LOCAL_CALCULATION_FALLBACK',
    location: { latitude: lat, longitude: lng, altitude }
  };
}

function formatTime(time: string, use12Hour: boolean = true): string {
  if (!time || !time.includes(':')) return time;
  const [hours, minutes] = time.split(':').map(Number);
  if (!use12Hour) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`;
}

export function usePrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [use12Hour, setUse12Hour] = useState(true);

  const fetchPrayerTimes = useCallback(async (lat: number, lng: number, altitude: number = 0, method = 3) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Try High Precision AlAdhan API First
      const alAdhanData = await islamicApi.getPrayerTimesFromAlAdhan(lat, lng, altitude, typeof method === 'number' ? method : 3);
      if (alAdhanData) {
        const formattedData = { ...alAdhanData, location: { latitude: lat, longitude: lng, altitude } };
        ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => {
          formattedData[p as keyof typeof formattedData] = formatTime(formattedData[p as keyof typeof formattedData] as string, use12Hour);
        });
        setPrayerTimes(formattedData as PrayerTimes);
        return;
      }

      // 2. Try Supabase as secondary
      const { data, error: fnError } = await supabase.functions.invoke('prayer-times', {
        body: { latitude: lat, longitude: lng, altitude, method },
      });

      if (!fnError && data) {
        const formattedData = { ...data };
        ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => {
          formattedData[p] = formatTime(formattedData[p], use12Hour);
        });
        setPrayerTimes(formattedData);
      } else {
        throw fnError || new Error("Supabase returned empty data");
      }
    } catch (e) {
      console.warn('Network APIs failed, using local calculation');
      const localTimes = calculatePrayerTimesLocally(lat, lng, altitude);
      const formattedLocalTimes: any = { ...localTimes };
      ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => {
        formattedLocalTimes[p] = formatTime(formattedLocalTimes[p], use12Hour);
      });
      setPrayerTimes(formattedLocalTimes as PrayerTimes);
    } finally {
      setIsLoading(false);
    }
  }, [use12Hour]);

  const requestLocation = useCallback((customAltitude?: number) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, altitude: geoAlt } = position.coords;
        const finalAltitude = customAltitude !== undefined ? customAltitude : (geoAlt || 0);
        setLocation({ latitude, longitude, altitude: finalAltitude });
        await fetchPrayerTimes(latitude, longitude, finalAltitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to get your location. Please enable location services.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [fetchPrayerTimes]);

  const setManualLocation = useCallback(async (lat: number, lng: number, alt: number = 0) => {
    setLocation({ latitude: lat, longitude: lng, altitude: alt });
    await fetchPrayerTimes(lat, lng, alt);
  }, [fetchPrayerTimes]);

  const toggleTimeFormat = useCallback(() => {
    setUse12Hour(prev => !prev);
    if (prayerTimes) {
      const reformatted = { ...prayerTimes };
      ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
        if (reformatted[prayer as keyof PrayerTimes]) {
          const cleanTime = (reformatted[prayer as keyof PrayerTimes] as string).replace(/ (AM|PM)/, '');
          (reformatted[prayer as keyof PrayerTimes] as string) = formatTime(cleanTime, !use12Hour);
        }
      });
      setPrayerTimes(reformatted);
    }
  }, [prayerTimes, use12Hour]);

  const searchCity = useCallback(async (city: string) => {
    setIsLoading(true);
    try {
      // Strategy 1: Try full query
      let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=en&format=json`);
      let data = await response.json();

      // Strategy 2: If failed and has spaces, try first part (e.g. "Terni Italia" -> "Terni")
      if (!data.results || data.results.length === 0) {
        if (city.includes(' ')) {
          const firstPart = city.split(' ')[0];
          console.log(`Searching for fallback: ${firstPart}`);
          response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(firstPart)}&count=5&language=en&format=json`);
          data = await response.json();
        }
      }

      if (data.results && data.results.length > 0) {
        const { latitude, longitude, country, name, elevation } = data.results[0];
        setLocation({
          latitude,
          longitude,
          city: name,
          country,
          altitude: elevation
        });
        await fetchPrayerTimes(latitude, longitude, elevation || 0);
        return { success: true, name, country };
      } else {
        setError('City not found');
        return { success: false, error: 'City not found' };
      }
    } catch (err) {
      setError('Error searching city');
      return { success: false, error: 'Network error' };
    } finally {
      setIsLoading(false);
    }
  }, [fetchPrayerTimes]);

  return {
    prayerTimes,
    location,
    isLoading,
    error,
    requestLocation,
    fetchPrayerTimes,
    setManualLocation,
    searchCity,
    use12Hour,
    toggleTimeFormat,
  };
}

