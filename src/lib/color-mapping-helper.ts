// 2. Helper random warna (hsl agar tetap soft)
export const randomHsl = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const h = Math.abs(hash % 360);
  return `hsl(${h}, 70%, 50%)`;
};

// 3. Fungsi label komoditas (sudah pakai mapping)
// utils/commodity.ts
export const createCommodityLabelGetter =
  <T extends Record<string, string>>(mapping: T) =>
    (commodity: string): string =>
      mapping[commodity] || commodity;

// 4. Fungsi warna marker (acak bila tidak ada di switch)
export const getMarkerColor = (commodity: string) => {
  const comp = commodity?.toUpperCase();
  return randomHsl(comp);

};


// utils/color.ts
export const getSoftBgColor = (commodity: string) => {
  // ambil hue yang sama persis seperti marker
  const markerColor = getMarkerColor(commodity);        // hsl(h, 70%, 50%)
  const match = markerColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  if (!match) return '#f9fafb';                         // fallback gray-50
  const [, h, s] = match;
  return `hsl(${h}, ${s}%, 96%)`;                       // lightness 90 %
};