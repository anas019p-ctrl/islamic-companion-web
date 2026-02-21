import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Navigation, MapPin, Phone, Globe, Clock, Building2 as MosqueIcon } from 'lucide-react';
import { IslamicAPIService } from '@/lib/IslamicAPIService';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet marker icon issue
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const mosqueIcon = L.divIcon({
  html: `<div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 22v-8a10 10 0 0 0-20 0v8"/><path d="M18 22V12a8 8 0 0 0-16 0v10"/><path d="M2 22h20"/><path d="M7 22v-5a3 3 0 0 1 6 0v5"/><circle cx="12" cy="5" r="1"/></svg>
         </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Component to handle map center updates
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

const MosqueMapPage = () => {
  const [mosques, setMosques] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([41.9028, 12.4964]); // Rome default
  const [selectedMosque, setSelectedMosque] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // If search query is empty, use current map center
      // In a real app, we might geocode the search query
      const results = await IslamicAPIService.getNearbyMosques(mapCenter[0], mapCenter[1], 50000);
      setMosques(results);
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile recuperare le moschee vicine.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter: [number, number] = [position.coords.latitude, position.coords.longitude];
          setMapCenter(newCenter);
          handleSearch();
          toast({ title: 'Posizione aggiornata', description: 'Mostrando moschee vicino a te.' });
        },
        () => {
          toast({ title: 'Errore', description: 'Permessi di localizzazione negati.', variant: 'destructive' });
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col text-white">
      <Header />

      <main className="flex-grow pt-24 pb-12 container mx-auto px-4 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gradient-gold flex items-center gap-3">
              <MosqueIcon className="w-8 h-8" />
              Bussola delle Moschee
            </h1>
            <p className="text-muted-foreground mt-1 text-sm tracking-wide">
              Trova luoghi di culto e centri islamici vicino a te in tutta Italia.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cerca per città..."
                className="pl-10 glass border-white/10 w-full md:min-w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleCurrentLocation} variant="outline" className="glass border-primary/30 text-primary">
              <Navigation className="w-4 h-4 mr-2" />
              Vicino a me
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          {/* Sidebar - List of Mosques */}
          <div className="col-span-1 glass-premium rounded-2xl border-white/5 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5 bg-primary/5">
              <h2 className="font-bold flex items-center justify-between">
                Risultati
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  {mosques.length} trovati
                </Badge>
              </h2>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <AnimatePresence>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
                  ))
                ) : mosques.length > 0 ? (
                  mosques.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => {
                        setMapCenter([m.lat, m.lon || m.lng]);
                        setSelectedMosque(m);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer group ${selectedMosque?.name === m.name
                        ? 'bg-primary/20 border-primary/50 ring-1 ring-primary/20'
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                    >
                      <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{m.name || 'Masjid'}</h3>
                      <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {m.address || 'Indirizzo non disponibile'}
                      </p>
                      <div className="flex gap-2">
                        {m.phone && (
                          <Badge variant="outline" className="text-[8px] flex items-center gap-1 border-white/10">
                            <Phone className="w-2 h-2" /> Chiama
                          </Badge>
                        )}
                        {m.website && (
                          <Badge variant="outline" className="text-[8px] flex items-center gap-1 border-white/10">
                            <Globe className="w-2 h-2" /> Sito Web
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-muted-foreground opacity-20 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm italic">Nessuna moschea trovata in questa zona.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10 glass">
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
              zoomControl={false}
            >
              <ChangeView center={mapCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {mosques.map((m, idx) => (
                <Marker
                  key={idx}
                  position={[m.lat, m.lon || m.lng]}
                  icon={mosqueIcon}
                  eventHandlers={{
                    click: () => setSelectedMosque(m),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[150px]">
                      <h4 className="font-bold text-primary mb-1">{m.name}</h4>
                      <p className="text-[10px] text-gray-400 mb-2">{m.address}</p>
                      <Button variant="link" className="p-0 h-auto text-[10px] text-emerald-400" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lon || m.lng}`)}>
                        Ottieni Indicazioni
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Float Info Card */}
            {selectedMosque && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute bottom-6 right-6 z-20 w-72 glass-premium p-4 rounded-2xl border-primary/20 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gradient-gold">{selectedMosque.name}</h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedMosque(null)}>
                    ×
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{selectedMosque.address}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="glass h-8 text-[10px]" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedMosque.lat},${selectedMosque.lon || selectedMosque.lng}`)}>
                    <Navigation className="w-3 h-3 mr-1" /> Percorso
                  </Button>
                  {selectedMosque.website && (
                    <Button variant="outline" size="sm" className="glass h-8 text-[10px]" onClick={() => window.open(selectedMosque.website)}>
                      <Globe className="w-3 h-3 mr-1" /> Sito
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MosqueMapPage;
