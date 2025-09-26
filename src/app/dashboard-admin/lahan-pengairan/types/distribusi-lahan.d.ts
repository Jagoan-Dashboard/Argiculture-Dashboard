interface DistribusiLahanData {
  kecamatan: string;      // Nama kecamatan lengkap
  sawah: number;          // Luas lahan sawah (hijau)
  perkebunan: number;     // Luas lahan perkebunan/tegal (orange)
  ladang?: number;        // Luas lahan ladang/hutan (kuning) - opsional
}

export interface DistribusiLahanSectionProps {
  distribusiData?: DistribusiLahanData[];
}