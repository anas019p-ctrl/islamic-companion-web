import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Prayer time calculation methods
const METHODS = {
  MWL: { fajr: 18, isha: 17 }, // Muslim World League
  ISNA: { fajr: 15, isha: 15 }, // Islamic Society of North America
  Egypt: { fajr: 19.5, isha: 17.5 },
  Makkah: { fajr: 18.5, isha: 90 }, // Umm al-Qura, Makkah
  Karachi: { fajr: 18, isha: 18 },
  Tehran: { fajr: 17.7, isha: 14 },
};

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function calculatePrayerTimes(date: Date, latitude: number, longitude: number, method: string = 'MWL') {
  const methodParams = METHODS[method as keyof typeof METHODS] || METHODS.MWL;
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Julian date calculation
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  const d = jd - 2451545.0;
  const g = 357.529 + 0.98560028 * d;
  const q = 280.459 + 0.98564736 * d;
  const L = q + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g));
  const e = 23.439 - 0.00000036 * d;
  const RA = toDegrees(Math.atan2(Math.cos(toRadians(e)) * Math.sin(toRadians(L)), Math.cos(toRadians(L)))) / 15;
  const D = toDegrees(Math.asin(Math.sin(toRadians(e)) * Math.sin(toRadians(L))));
  const EqT = q / 15 - RA;
  
  const Dhuhr = 12 + (-longitude / 15) - EqT;
  
  function sunAngle(angle: number): number {
    return -toDegrees(Math.acos(
      (-Math.sin(toRadians(angle)) - Math.sin(toRadians(latitude)) * Math.sin(toRadians(D))) /
      (Math.cos(toRadians(latitude)) * Math.cos(toRadians(D)))
    )) / 15;
  }
  
  const Fajr = Dhuhr + sunAngle(methodParams.fajr);
  const Sunrise = Dhuhr + sunAngle(0.833);
  const Asr = Dhuhr - sunAngle(-toDegrees(Math.atan(1 / (1 + Math.tan(toRadians(Math.abs(latitude - D)))))));
  const Maghrib = Dhuhr - sunAngle(0.833);
  const Isha = typeof methodParams.isha === 'number' && methodParams.isha > 30 
    ? Maghrib + methodParams.isha / 60 
    : Dhuhr - sunAngle(methodParams.isha);
  
  function formatTime(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
  
  return {
    fajr: formatTime(Fajr),
    sunrise: formatTime(Sunrise),
    dhuhr: formatTime(Dhuhr),
    asr: formatTime(Asr),
    maghrib: formatTime(Maghrib),
    isha: formatTime(Isha),
    date: date.toISOString().split('T')[0],
    method,
    location: { latitude, longitude }
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude, method = 'MWL', date } = await req.json();
    
    if (!latitude || !longitude) {
      return new Response(JSON.stringify({ error: "Latitude and longitude are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const targetDate = date ? new Date(date) : new Date();
    const prayerTimes = calculatePrayerTimes(targetDate, latitude, longitude, method);
    
    console.log("Prayer times calculated for:", latitude, longitude);
    
    return new Response(JSON.stringify(prayerTimes), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Prayer times error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
