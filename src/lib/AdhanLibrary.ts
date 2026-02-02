export interface AdhanStyle {
    id: string;
    name: string;
    url: string;
}

export const ADHAN_LIBRARY: AdhanStyle[] = [
    { id: 'makkah', name: 'Makkah - Masjid Al-Haram', url: 'https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Makkah.mp3' },
    { id: 'madinah', name: 'Madinah - An-Nabawi', url: 'https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Madinah.mp3' },
    { id: 'makkah_fajr', name: 'Makkah - Fajr Style', url: 'https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-fajr.mp3' },
    { id: 'turkish', name: 'Turkey - Ottoman Style', url: 'https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Turkish.mp3' },
    { id: 'makkah2', name: 'Makkah - Alternative', url: 'https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Makkah2.mp3' },
    { id: 'makkah_dua', name: 'Makkah - With Dua', url: 'https://raw.githubusercontent.com/achaudhry/adhan/master/Adhan-Makkah-Dua.mp3' },
];
