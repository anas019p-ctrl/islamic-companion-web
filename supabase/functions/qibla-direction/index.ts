import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function calculateQiblaDirection(latitude: number, longitude: number): number {
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(KAABA_LAT);
  const diffLng = toRadians(KAABA_LNG - longitude);
  
  const y = Math.sin(diffLng);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(diffLng);
  
  let qibla = toDegrees(Math.atan2(y, x));
  
  // Normalize to 0-360
  qibla = (qibla + 360) % 360;
  
  return Math.round(qibla * 100) / 100;
}

function calculateDistance(latitude: number, longitude: number): number {
  const R = 6371; // Earth's radius in km
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(KAABA_LAT);
  const diffLat = toRadians(KAABA_LAT - latitude);
  const diffLng = toRadians(KAABA_LNG - longitude);
  
  const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return Math.round(R * c);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude } = await req.json();
    
    if (!latitude || !longitude) {
      return new Response(JSON.stringify({ error: "Latitude and longitude are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const direction = calculateQiblaDirection(latitude, longitude);
    const distance = calculateDistance(latitude, longitude);
    
    console.log("Qibla direction calculated:", direction, "degrees from", latitude, longitude);
    
    return new Response(JSON.stringify({
      direction,
      distance,
      kaaba: { latitude: KAABA_LAT, longitude: KAABA_LNG },
      userLocation: { latitude, longitude }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Qibla direction error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
