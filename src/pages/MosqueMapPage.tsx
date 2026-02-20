import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Search, Phone, Clock, Star, ExternalLink } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Mosque {
  id: number;
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
  address: string;
  addressAr: string;
  phone?: string;
  prayerTimes?: string;
  rating?: number;
  website?: string;
}

// Sample mosque data - in production, fetch from Overpass API or your database
const mosqueData: Mosque[] = [
  {
    id: 1,
    name: 'Grand Mosque of Rome',
    nameAr: 'المسجد الكبير في روما',
    lat: 41.9357,
    lng: 12.4738,
    address: 'Viale della Moschea, 85, 00197 Roma RM, Italy',
    addressAr: 'فيالي ديلا موسكيا، 85، 00197 روما، إيطاليا',
    phone: '+39 06 808 2258',
    rating: 4.5,
    website: 'https://www.grandemoscheadiroma.it'
  },
  {
    id: 2,
    name: 'Islamic Cultural Center',
    nameAr: 'المركز الثقافي الإسلامي',
    lat: 41.9027,
    lng: 12.4963,
    address: 'Via della Moschea, Roma, Italy',
    addressAr: 'فيا ديلا موسكيا، روما، إيطاليا',
    phone: '+39 06 1234567',
    rating: 4.2
  },
  {
    id: 3,
    name: 'Mosque of Milan',
    nameAr: 'مسجد ميلانو',
    lat: 45.4642,
    lng: 9.1900,
    address: 'Via Padova, Milano, Italy',
    addressAr: 'فيا بادوفا، ميلانو، إيطاليا',
    phone: '+39 02 1234567',
    rating: 4.3
  },
  {
    id: 4,
    name: 'Florence Islamic Center',
    nameAr: 'المركز الإسلامي في فلورنسا',
    lat: 43.7696,
    lng: 11.2558,
    address: 'Firenze, Italy',
    addressAr: 'فلورنسا، إيطاليا',
    rating: 4.1
  }
];

// Component to recenter map when user location changes
function LocationMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position, map]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>📍 Your Location</Popup>
    </Marker>
  );
}

const MosqueMapPage = () => {
  const { t, language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMosques, setFilteredMosques] = useState<Mosque[]>(mosqueData);
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const isArabic = language === 'ar';

  // Get user's current location
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setIsLoadingLocation(false);
          toast({
            title: isArabic ? '📍 تم العثور على موقعك' : '📍 Location Found',
            description: isArabic ? 'جاري البحث عن المساجد القريبة...' : 'Finding nearby mosques...',
          });
          
          // In production, fetch nearby mosques from API based on coordinates
          // For now, we'll use the sample data
        },
        (error) => {
          setIsLoadingLocation(false);
          toast({
            title: isArabic ? '❌ خطأ في الموقع' : '❌ Location Error',
            description: isArabic ? 'لم نتمكن من الوصول إلى موقعك. يرجى التحقق من الإذن.' : 'Could not access your location. Please check permissions.',
            variant: 'destructive'
          });
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast({
        title: isArabic ? 'غير مدعوم' : 'Not Supported',
        description: isArabic ? 'متصفحك لا يدعم خدمات الموقع' : 'Your browser does not support geolocation',
        variant: 'destructive'
      });
    }
  };

  // Search mosques
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMosques(mosqueData);
    } else {
      const filtered = mosqueData.filter(mosque => 
        mosque.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mosque.nameAr.includes(searchQuery) ||
        mosque.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMosques(filtered);
    }
  }, [searchQuery]);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Default center (Rome)
  const defaultCenter: [number, number] = [41.9028, 12.4964];

  return (
    <div className={`min-h-screen bg-transparent ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-amiri text-primary">
            🕌 {isArabic ? 'خريطة المساجد' : 'Mosque Finder'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {isArabic ? 'اعثر على أقرب مسجد إليك' : 'Find the nearest mosque to you'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-premium">
              <CardContent className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={isArabic ? 'ابحث عن مسجد...' : 'Search for a mosque...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>

                {/* Get Location Button */}
                <Button
                  onClick={getUserLocation}
                  disabled={isLoadingLocation}
                  className="w-full"
                  variant="outline"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  {isLoadingLocation ? 
                    (isArabic ? 'جاري التحديد...' : 'Locating...') : 
                    (isArabic ? 'حدد موقعي' : 'Use My Location')
                  }
                </Button>

                {/* Mosque List */}
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {filteredMosques.map((mosque) => {
                    const distance = userLocation ? 
                      calculateDistance(userLocation[0], userLocation[1], mosque.lat, mosque.lng) : null;

                    return (
                      <Card
                        key={mosque.id}
                        className={`cursor-pointer transition-all hover:border-primary ${selectedMosque?.id === mosque.id ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => setSelectedMosque(mosque)}
                      >
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">
                                {isArabic ? mosque.nameAr : mosque.name}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {isArabic ? mosque.addressAr : mosque.address}
                              </p>
                            </div>
                            <MapPin className="w-5 h-5 text-primary shrink-0 ml-2" />
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            {mosque.rating && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
                                {mosque.rating}
                              </Badge>
                            )}
                            {distance && (
                              <Badge variant="outline" className="text-xs">
                                📍 {distance.toFixed(1)} km
                              </Badge>
                            )}
                          </div>

                          {mosque.phone && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <span>{mosque.phone}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}

                  {filteredMosques.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>{isArabic ? 'لم يتم العثور على مساجد' : 'No mosques found'}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="glass-premium overflow-hidden">
              <div className="h-[600px] relative">
                <MapContainer
                  center={userLocation || selectedMosque ? [selectedMosque?.lat || userLocation![0], selectedMosque?.lng || userLocation![1]] : defaultCenter}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  <LocationMarker position={userLocation} />

                  {filteredMosques.map((mosque) => (
                    <Marker
                      key={mosque.id}
                      position={[mosque.lat, mosque.lng]}
                      eventHandlers={{
                        click: () => setSelectedMosque(mosque)
                      }}
                    >
                      <Popup>
                        <div className="p-2 space-y-2 min-w-[200px]">
                          <h3 className="font-bold text-base">
                            {isArabic ? mosque.nameAr : mosque.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isArabic ? mosque.addressAr : mosque.address}
                          </p>
                          {mosque.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${mosque.phone}`} className="text-primary hover:underline">
                                {mosque.phone}
                              </a>
                            </div>
                          )}
                          {mosque.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm font-semibold">{mosque.rating}/5</span>
                            </div>
                          )}
                          {mosque.website && (
                            <a
                              href={mosque.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {isArabic ? 'زيارة الموقع' : 'Visit Website'}
                            </a>
                          )}
                          <Button
                            size="sm"
                            className="w-full mt-2"
                            onClick={() => {
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}`,
                                '_blank'
                              );
                            }}
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            {isArabic ? 'احصل على الاتجاهات' : 'Get Directions'}
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </Card>

            {/* Selected Mosque Details */}
            {selectedMosque && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <Card className="glass-premium border-primary/30">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      {isArabic ? selectedMosque.nameAr : selectedMosque.name}
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <p className="text-muted-foreground">
                          {isArabic ? selectedMosque.addressAr : selectedMosque.address}
                        </p>
                      </div>
                      {selectedMosque.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-primary" />
                          <a href={`tel:${selectedMosque.phone}`} className="text-primary hover:underline">
                            {selectedMosque.phone}
                          </a>
                        </div>
                      )}
                      {selectedMosque.rating && (
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{selectedMosque.rating}/5 ⭐</span>
                        </div>
                      )}
                      <div className="flex gap-2 pt-4">
                        <Button
                          className="flex-1"
                          onClick={() => {
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${selectedMosque.lat},${selectedMosque.lng}`,
                              '_blank'
                            );
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          {isArabic ? 'احصل على الاتجاهات' : 'Get Directions'}
                        </Button>
                        {selectedMosque.website && (
                          <Button
                            variant="outline"
                            onClick={() => window.open(selectedMosque.website, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {isArabic ? 
              '💡 نصيحة: استخدم زر "حدد موقعي" للعثور على أقرب مسجد إليك' : 
              '💡 Tip: Use "Use My Location" button to find mosques near you'
            }
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MosqueMapPage;
