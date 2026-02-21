export class IslamicAPIService {
  private static CACHE_KEY_PREFIX = 'islamic_api_cache_';
  private static CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private static QURAN_API = 'https://api.quran.com/api/v4';
  private static ALADHAN_API = 'https://api.aladhan.com/v1';

  /**
   * 🏗️ CACHING SYSTEM - LocalStorage with Expiry
   */
  private static getFromCache<T>(key: string): T | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY_PREFIX + key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > this.CACHE_DURATION) {
        localStorage.removeItem(this.CACHE_KEY_PREFIX + key);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  private static saveToCache(key: string, data: any): void {
    try {
      localStorage.setItem(this.CACHE_KEY_PREFIX + key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Cache save failed (Storage full?)');
    }
  }

  /**
   * 📜 HADITH API - fawazahmed0/hadith-api (CDN)
   */
  static async getHadithCollection(collection: string, book: number = 1, limit: number = 50): Promise<any[]> {
    const cacheKey = `hadith_${collection}_${book}`;
    const cached = this.getFromCache<any[]>(cacheKey);
    if (cached) return cached.slice(0, limit);

    try {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/${book}.json`);
      if (!response.ok) throw new Error('CDN Hadith API failed');

      const data = await response.json();
      const hadiths = data.hadiths || [];

      this.saveToCache(cacheKey, hadiths);
      return hadiths.slice(0, limit);
    } catch (error) {
      console.error('Hadith Sync Error:', error);
      return [];
    }
  }

  /**
   * 📚 Get All Hadith Collections info
   */
  static getHadithCollections() {
    return [
      { id: 'ara-bukhari', name: 'Sahih al-Bukhari', books: 97 },
      { id: 'ara-muslim', name: 'Sahih Muslim', books: 56 },
      { id: 'ara-abudawud', name: 'Sunan Abi Dawud', books: 43 },
      { id: 'ara-tirmidhi', name: 'Jami` at-Tirmidhi', books: 49 },
      { id: 'ara-nasai', name: 'Sunan an-Nasa\'i', books: 57 },
      { id: 'ara-ibnmajah', name: 'Sunan Ibn Majah', books: 37 }
    ];
  }

  /**
   * 🕌 MOSQUES SEARCH - OpenStreetMap (Overpass API)
   */
  static async getNearbyMosques(lat: number, lng: number, radius: number = 5000): Promise<any[]> {
    const cacheKey = `mosques_${lat}_${lng}_${radius}`;
    const cached = this.getFromCache<any[]>(cacheKey);
    if (cached) return cached;

    const query = `
      [out:json];
      (
        node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
        way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
      );
      out center;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) throw new Error('Overpass API failed');

      const data = await response.json();
      const mosques = data.elements.map((el: any) => ({
        id: el.id,
        name: el.tags.name || el.tags['name:en'] || 'Mosque',
        nameAr: el.tags['name:ar'] || el.tags.name,
        lat: el.lat || el.center?.lat,
        lng: el.lon || el.center?.lon,
        address: el.tags['addr:street'] ? `${el.tags['addr:street']} ${el.tags['addr:housenumber'] || ''}` : '',
        phone: el.tags.phone || el.tags['contact:phone'],
        website: el.tags.website || el.tags['contact:website']
      }));

      this.saveToCache(cacheKey, mosques);
      return mosques;
    } catch (error) {
      console.error('Mosque Discovery Error:', error);
      return [];
    }
  }

  /**
   * 📅 PRAYER TIMES - AlAdhan API
   */
  static async getPrayerTimes(city: string, country: string, method: number = 3): Promise<any> {
    const cacheKey = `prayer_${city}_${country}_${method}`;
    const cached = this.getFromCache<any>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.ALADHAN_API}/timingsByCity?city=${city}&country=${country}&method=${method}`);
      const data = await response.json();

      if (data.code === 200) {
        this.saveToCache(cacheKey, data.data.timings);
        return data.data.timings;
      }
      throw new Error('Prayer times fetch failed');
    } catch (error) {
      console.error('Prayer Times Error:', error);
      return null;
    }
  }

  /**
   * 🌙 HIJRI CALENDAR
   */
  static async getHijriDate(date: string = new Date().toISOString().split('T')[0]): Promise<any> {
    const cacheKey = `hijri_${date}`;
    const cached = this.getFromCache<any>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.ALADHAN_API}/gToH?date=${date}`);
      const data = await response.json();
      if (data.code === 200) {
        this.saveToCache(cacheKey, data.data.hijri);
        return data.data.hijri;
      }
      return null;
    } catch (error) {
      console.error('Hijri Date Error:', error);
      return null;
    }
  }

  /**
   * 📖 QURAN API - Chapters
   */
  static async getSurah(id: number): Promise<any> {
    const cacheKey = `surah_${id}`;
    const cached = this.getFromCache<any>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.QURAN_API}/chapters/${id}`);
      const data = await response.json();
      this.saveToCache(cacheKey, data.chapter);
      return data.chapter;
    } catch (error) {
      console.error('Quran API Error:', error);
      return null;
    }
  }

  /**
   * 📖 QURAN API - Verses
   */
  static async getVerses(chapterId: number, page: number = 1): Promise<any[]> {
    const cacheKey = `verses_${chapterId}_${page}`;
    const cached = this.getFromCache<any[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${this.QURAN_API}/verses/by_chapter/${chapterId}?language=it&words=true&per_page=10&page=${page}`);
      const data = await response.json();
      this.saveToCache(cacheKey, data.verses);
      return data.verses;
    } catch (error) {
      console.error('Verses Error:', error);
      return [];
    }
  }

  /**
   * 🧭 QIBLA DIRECTION
   */
  static async getQiblaDirection(latitude: number, longitude: number): Promise<number> {
    try {
      const response = await fetch(`${this.ALADHAN_API}/qibla/${latitude}/${longitude}`);
      const data = await response.json();
      return data.data?.direction || 0;
    } catch (error) {
      console.error('Qibla Error:', error);
      return 0;
    }
  }

  /**
   * 🧹 CACHE UTILITIES
   */
  static clearCache(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  static getCacheStats(): any {
    const keys = Object.keys(localStorage);
    const apiKeys = keys.filter(key => key.startsWith(this.CACHE_KEY_PREFIX));

    return {
      size: apiKeys.length,
      keys: apiKeys
    };
  }
}

export default IslamicAPIService;
