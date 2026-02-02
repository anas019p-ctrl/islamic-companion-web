import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QiblaData {
  direction: number;
  distance: number;
  kaaba: { latitude: number; longitude: number };
  userLocation: { latitude: number; longitude: number };
}

export function useQibla() {
  const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQiblaDirection = useCallback(async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('qibla-direction', {
        body: { latitude, longitude },
      });

      if (fnError) throw fnError;
      setQiblaData(data);
    } catch (e) {
      console.error('Qibla direction error:', e);
      setError(e instanceof Error ? e.message : 'Failed to calculate Qibla direction');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const requestQibla = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchQiblaDirection(latitude, longitude);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to get your location. Please enable location services.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [fetchQiblaDirection]);

  const startCompass = useCallback(() => {
    if (!window.DeviceOrientationEvent) {
      setError('Device orientation not supported');
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent | any) => {
      let heading: number | null = null;

      if (event.webkitCompassHeading) {
        // iOS devices
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        // Android / Standard
        // Convert to compass heading (0 = North, 90 = East, etc.)
        heading = 360 - event.alpha;
      }

      if (heading !== null) {
        setCompassHeading(heading);
      }
    };

    const isIOS = typeof (DeviceOrientationEvent as any).requestPermission === 'function';

    if (isIOS) {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setError('Permission denied for compass');
          }
        })
        .catch((err: any) => {
          console.error(err);
          setError('Error requesting compass permission');
        });
    } else {
      // Android / Desktop - try absolute first
      if ('ondeviceorientationabsolute' in window) {
        window.addEventListener('deviceorientationabsolute', handleOrientation as any);
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      if ('ondeviceorientationabsolute' in window) {
        window.removeEventListener('deviceorientationabsolute', handleOrientation as any);
      }
    };
  }, []);

  return {
    qiblaData,
    compassHeading,
    isLoading,
    error,
    requestQibla,
    startCompass,
  };
}
