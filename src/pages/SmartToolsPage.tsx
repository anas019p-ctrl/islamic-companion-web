import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrayerTimes, PrayerTimes } from '@/hooks/usePrayerTimes';
import { useQibla } from '@/hooks/useQibla';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Clock, Compass, MapPin, Bell, Sun, Sunrise, Moon,
  Navigation, RefreshCw, Volume2, VolumeX, Play, Pause, Square,
  Settings, Mountain, Info, AlertTriangle, BookOpen, Languages
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { VoiceService } from '@/lib/VoiceService';
import { useToast } from '@/hooks/use-toast';

import { ADHAN_LIBRARY } from '@/lib/AdhanLibrary';

const prayerIconMap = {
  fajr: Sunrise,
  sunrise: Sun,
  dhuhr: Sun,
  asr: Sun,
  maghrib: Moon,
  isha: Moon,
};

const SmartToolsPage = () => {
  const {
    prayerTimes,
    location: userLocation,
    isLoading: prayerLoading,
    error: prayerError,
    requestLocation,
    setManualLocation,
    searchCity,
    use12Hour
  } = usePrayerTimes();

  const { language, t, isRTL } = useLanguage();

  const { qiblaData, compassHeading, isLoading: qiblaLoading, error: qiblaError, requestQibla, startCompass } = useQibla();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('adhan_notifications');
    return saved ? JSON.parse(saved) : { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true };
  });
  const [adhanEnabled, setAdhanEnabled] = useState(() => {
    const saved = localStorage.getItem('adhan_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [selectedAdhans, setSelectedAdhans] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('adhan_selections');
    return saved ? JSON.parse(saved) : {
      fajr: ADHAN_LIBRARY[2].id, // Default Fajr 
      dhuhr: ADHAN_LIBRARY[0].id,
      asr: ADHAN_LIBRARY[0].id,
      maghrib: ADHAN_LIBRARY[0].id,
      isha: ADHAN_LIBRARY[0].id
    };
  });
  const [activePrayerTab, setActivePrayerTab] = useState<string>('fajr');
  const [altitude, setAltitude] = useState(0);
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState<string>('--:--:--');
  const [nextPrayerName, setNextPrayerName] = useState<string>('');
  const [audioStatus, setAudioStatus] = useState(VoiceService.getStatus());

  const statusInterval = useRef<any>(null);

  useEffect(() => {
    const cleanup = startCompass();
    statusInterval.current = setInterval(() => {
      setAudioStatus(VoiceService.getStatus());
    }, 500);

    return () => {
      cleanup();
      if (statusInterval.current) clearInterval(statusInterval.current);
    };
  }, [startCompass]);

  // Countdown & Auto Adhan Logic
  useEffect(() => {
    if (!prayerTimes) return;

    const timer = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentS = now.getSeconds();

      let nextP: any = null;
      let minDiff = Infinity;

      const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

      prayers.forEach(p => {
        const timeStr = prayerTimes[p as keyof PrayerTimes] as string;
        if (!timeStr) return;

        // Parse time (handle 12h or 24h formats)
        let h, m;
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
          const [rawTime, period] = timeStr.split(' ');
          [h, m] = rawTime.split(':').map(Number);
          if (period === 'PM' && h < 12) h += 12;
          if (period === 'AM' && h === 12) h = 0;
        } else {
          [h, m] = timeStr.split(':').map(Number);
        }

        const pTime = new Date();
        pTime.setHours(h, m, 0);

        // If prayer has passed today, move to tomorrow
        if (pTime < now) {
          pTime.setDate(pTime.getDate() + 1);
        }

        const diff = pTime.getTime() - now.getTime();
        if (diff < minDiff) {
          minDiff = diff;
          nextP = { name: p, time: pTime };
        }

        // Check for exact match for AUTO ADHAN (within 1 second)
        if (adhanEnabled && notifications[p as keyof typeof notifications] && h === currentH && m === currentM && currentS === 0) {
          handleAutoAdhan(p);
        }
      });

      if (nextP) {
        setNextPrayerName(nextP.name);
        const h = Math.floor(minDiff / 3600000);
        const m = Math.floor((minDiff % 3600000) / 60000);
        const s = Math.floor((minDiff % 60000) / 1000);
        setCountdown(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes, adhanEnabled, notifications]);

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem('adhan_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('adhan_enabled', JSON.stringify(adhanEnabled));
  }, [adhanEnabled]);

  useEffect(() => {
    localStorage.setItem('adhan_selections', JSON.stringify(selectedAdhans));
  }, [selectedAdhans]);

  const handleAutoAdhan = (prayerName: string) => {
    const adhanId = selectedAdhans[prayerName] || ADHAN_LIBRARY[0].id;
    const adhan = ADHAN_LIBRARY.find(a => a.id === adhanId) || ADHAN_LIBRARY[0];
    VoiceService.playExternal(adhan.url);
    toast({
      title: `Adhan Time: ${getPrayerName(prayerName)}`,
      description: `Playing ${adhan.name}`,
      duration: 10000
    });
  };

  const getPrayerName = (key: string): string => {
    return t(key) || key;
  };

  useEffect(() => {
    if (userLocation) {
      setManualLat(userLocation.latitude.toString());
      setManualLng(userLocation.longitude.toString());
      setAltitude(userLocation.altitude || 0);
    }
  }, [userLocation]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    toast({ title: "In ricerca...", description: `Ricerca coordinate per ${searchQuery}` });
    const result: any = await searchCity(searchQuery);

    if (result.success) {
      toast({
        title: "Posizione Trovata",
        description: `Impostato su ${result.name}, ${result.country || ''}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Città non trovata",
        description: "Controlla il nome o prova solo il nome della città.",
        variant: "destructive"
      });
    }
  };

  const handleManualLocationSubmit = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng)) {
      toast({ title: "Error", description: "Invalid coordinates", variant: "destructive" });
      return;
    }
    setManualLocation(lat, lng, altitude);
    toast({ title: "Location Updated", description: "Calculating with precision coordinates." });
  };

  const handleAdhanPreview = (id?: string) => {
    const adhanId = id || selectedAdhans[activePrayerTab] || ADHAN_LIBRARY[0].id;
    const adhan = ADHAN_LIBRARY.find(a => a.id === adhanId) || ADHAN_LIBRARY[0];
    VoiceService.playExternal(adhan.url);
  };

  const getRotation = () => {
    if (!qiblaData) return 0;
    return qiblaData.direction - (compassHeading || 0);
  };

  return (
    <div className={`min-h-screen bg-transparent text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{t('tools')} | {t('highPrecision')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
            {t('sacredPrecision')}
          </h1>

          {/* Countdown Banner */}
          <div className="max-w-xl mx-auto glass p-6 rounded-[2.5rem] border border-primary/20 mt-8 mb-4 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
              <Clock className="w-16 h-16 text-primary" />
            </div>
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-bold mb-2">{t('nextPrayerLabel')} {nextPrayerName ? getPrayerName(nextPrayerName) : '...'}</p>
              <h2 className="text-6xl font-mono font-bold tracking-tighter text-foreground tabular-nums">
                {countdown}
              </h2>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="prayer-times" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 h-16 rounded-2xl glass mb-12 p-2">
            <TabsTrigger value="prayer-times" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Clock className="w-4 h-4" />
              <span className="hidden md:inline">{t('prayer')}</span>
            </TabsTrigger>
            <TabsTrigger value="qibla" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">Qibla</span>
            </TabsTrigger>
            <TabsTrigger value="adhan" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Adhan</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">{t('settings') || 'Settings'}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prayer-times" className="space-y-6">
            <Card className="glass border-none shadow-none bg-transparent">
              <CardContent className="p-0 space-y-8">
                {!prayerTimes && !prayerLoading && (
                  <div className="text-center py-20 glass rounded-[3rem] border border-white/5">
                    <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-6" />
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                      {t('enableLocationDesc')}
                    </p>
                    <Button onClick={() => requestLocation()} size="lg" className="rounded-2xl h-14 px-10 font-bold uppercase tracking-widest">
                      <Navigation className="w-4 h-4 mr-2" />
                      {t('autoDetect')}
                    </Button>
                  </div>
                )}

                {prayerLoading && (
                  <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <RefreshCw className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-50">{t('syncingAtomic')}</p>
                  </div>
                )}

                {prayerTimes && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(prayerTimes)
                      .filter(([p]) => prayerIconMap[p as keyof typeof prayerIconMap])
                      .map(([p, time]) => {
                        const Icon = prayerIconMap[p as keyof typeof prayerIconMap];
                        const isActive = p === nextPrayerName;
                        return (
                          <motion.div
                            key={p}
                            whileHover={{ y: -5 }}
                            className={`relative overflow-hidden p-8 rounded-[2.5rem] border ${isActive ? 'bg-primary/20 border-primary shadow-[0_0_40px_rgba(201,164,74,0.15)]' : 'bg-card glass border-white/5'} transition-all`}
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-30 hover:opacity-100 hover:bg-primary/20 rounded-lg"
                                onClick={() => VoiceService.speak(`${getPrayerName(p)} time is ${time}`, language)}
                              >
                                <Volume2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mb-1">{getPrayerName(p)}</p>
                            <h3 className="text-4xl font-bold font-mono tracking-tight">{time as string}</h3>

                            {isActive && (
                              <div className="mt-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                <span className="text-[9px] uppercase font-black text-primary tracking-widest">{t('activeWaiting')}</span>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qibla">
            <Card className="glass-premium border-white/5 rounded-[3rem] p-10">
              <CardContent className="p-0">
                {!qiblaData && !qiblaLoading && (
                  <div className="text-center py-10">
                    <Compass className="w-20 h-20 text-primary/20 mx-auto mb-6" />
                    <Button onClick={requestQibla} size="lg" className="rounded-2xl h-14">{t('findQibla')}</Button>
                  </div>
                )}

                {qiblaData && (
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative w-80 h-80 mx-auto">
                      <div className="absolute inset-0 rounded-full border-[12px] border-primary/5 shadow-2xl" />
                      <motion.div
                        className="absolute inset-0 rounded-full compass-dial"
                        animate={{ rotate: -(compassHeading || 0) }}
                        transition={{ type: 'spring', stiffness: 40 }}
                      >
                        {[0, 90, 180, 270].map(deg => (
                          <div key={deg} className="absolute inset-0 flex items-start justify-center" style={{ transform: `rotate(${deg}deg)` }}>
                            <span className="mt-6 text-[10px] font-black text-primary/40">{deg === 0 ? 'N' : deg === 90 ? 'E' : deg === 180 ? 'S' : 'W'}</span>
                          </div>
                        ))}
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 flex items-center justify-center z-10"
                        animate={{ rotate: getRotation() }}
                        transition={{ type: 'spring', stiffness: 45 }}
                      >
                        <div className="relative h-full w-full flex items-center justify-center">
                          <div className="w-1.5 h-32 bg-gradient-to-t from-transparent to-primary shadow-[0_0_20px_rgba(201,164,74,0.5)] rounded-full" />
                          <div className="absolute top-8 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl">🕋</div>
                            <div className="w-[2px] h-6 bg-primary" />
                          </div>
                        </div>
                      </motion.div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-3xl border border-white/10 flex flex-col items-center justify-center">
                          <span className="text-[10px] font-black text-primary/40 leading-none mb-1">QIBLA</span>
                          <span className="text-sm font-bold leading-none">{qiblaData.direction}°</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold">{t('orientationDetail')}</h3>
                        <p className="text-muted-foreground text-sm">{t('facingKaaba')}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass p-6 rounded-3xl border border-white/5">
                          <p className="text-[8px] uppercase tracking-widest font-black text-primary mb-1">{t('distance')}</p>
                          <p className="text-2xl font-bold font-mono">{Math.round(qiblaData.distance)} <span className="text-xs">KM</span></p>
                        </div>
                        <div className="glass p-6 rounded-3xl border border-white/5">
                          <p className="text-[8px] uppercase tracking-widest font-black text-primary mb-1">{t('coordinates')}</p>
                          <p className="text-2xl font-bold font-mono">{qiblaData.direction}°</p>
                        </div>
                      </div>

                      <Button onClick={startCompass} variant="outline" className="w-full h-14 rounded-2xl border-primary/20 hover:bg-primary/10 uppercase tracking-[0.2em] font-bold text-xs">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {t('calibrateSensors')}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adhan">
            <Card className="glass-premium border-none rounded-[3.5rem] p-10">
              <CardHeader className="text-center px-0">
                <CardTitle className="text-3xl font-amiri text-gradient-gold">{t('sacredCallLibrary')}</CardTitle>
                <p className="text-muted-foreground text-sm mb-6">{t('selectAdhanDesc')}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map(p => (
                    <Button
                      key={p}
                      variant={activePrayerTab === p ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full px-6 h-10 text-[10px] uppercase tracking-widest font-bold transition-all ${activePrayerTab === p ? 'shadow-lg shadow-primary/20' : 'border-primary/20 opacity-70'}`}
                      onClick={() => setActivePrayerTab(p)}
                    >
                      {getPrayerName(p)}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    {ADHAN_LIBRARY.map((a) => {
                      const isSelectedForThisPrayer = selectedAdhans[activePrayerTab] === a.id;
                      return (
                        <div
                          key={a.id}
                          onClick={() => setSelectedAdhans(prev => ({ ...prev, [activePrayerTab]: a.id }))}
                          className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group ${isSelectedForThisPrayer ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 border-white/5 hover:border-primary/40'}`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isSelectedForThisPrayer ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                              <Volume2 className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm tracking-tight">{a.name}</p>
                              <p className={`text-[10px] opacity-60 ${isSelectedForThisPrayer ? 'text-white' : 'text-primary'}`}>{t('universalLibrary')}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdhanPreview(a.id);
                            }}
                            className={`${isSelectedForThisPrayer ? 'text-white hover:bg-white/10' : 'text-primary'}`}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glass border-white/5 rounded-[3rem] p-10">
              <CardContent className="space-y-12">
                <section className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                    <MapPin className="w-4 h-4" /> {t('atomicPositioning')}
                  </h4>

                  {/* City Search */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search City (e.g. Rome, Dubai)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border-white/10 rounded-2xl h-12"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                    />
                    <Button
                      variant="outline"
                      className="h-12 rounded-2xl px-6 font-bold uppercase tracking-widest bg-primary/5 border-primary/20 hover:bg-primary/10"
                      onClick={handleSearch}
                      disabled={prayerLoading}
                    >
                      {prayerLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search'}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase opacity-50 px-2 font-bold">{t('latitude')}</Label>
                      <Input
                        value={manualLat}
                        onChange={(e) => setManualLat(e.target.value)}
                        placeholder="0.000"
                        className="bg-white/5 border-white/10 rounded-2xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase opacity-50 px-2 font-bold">{t('longitude')}</Label>
                      <Input
                        value={manualLng}
                        onChange={(e) => setManualLng(e.target.value)}
                        placeholder="0.000"
                        className="bg-white/5 border-white/10 rounded-2xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase opacity-50 px-2 font-bold">
                        <Mountain className="w-3 h-3 inline mr-1" /> {t('altitude_label')}
                      </Label>
                      <Input
                        type="number"
                        value={altitude}
                        onChange={(e) => setAltitude(parseInt(e.target.value) || 0)}
                        className="bg-white/5 border-white/10 rounded-2xl h-12"
                      />
                    </div>
                  </div>
                  <Button onClick={handleManualLocationSubmit} className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">
                    {t('recalculatePrecision')}
                  </Button>
                </section>

                <section className="space-y-6">
                  <h4 className="flex items-center gap-2 text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                    <Bell className="w-4 h-4" /> {t('globalNotifications')}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 glass rounded-full border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <Label className="font-bold">{t('autoCallAdhan')}</Label>
                      </div>
                      <Switch checked={adhanEnabled} onCheckedChange={setAdhanEnabled} />
                    </div>

                    <div className="p-6 glass rounded-[2.5rem] border-white/5 space-y-4">
                      <p className="text-[10px] uppercase opacity-40 font-bold px-2">{t('selectiveAlerts')}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map(p => (
                          <div key={p} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                            <span className="text-xs font-medium">{getPrayerName(p)}</span>
                            <Switch
                              checked={notifications[p]}
                              onCheckedChange={(c) => setNotifications(prev => ({ ...prev, [p]: c }))}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

const ScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`overflow-y-auto scrollbar-hide ${className}`}>
    {children}
  </div>
);

export default SmartToolsPage;
