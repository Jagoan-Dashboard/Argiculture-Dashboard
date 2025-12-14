import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Report } from '../types/reports-types';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { MapPin, Calendar, Users, Sprout, AlertTriangle, CloudRain, Droplets, Lightbulb, User, LucideIcon } from 'lucide-react';

interface ReportDetailModalProps {
    report: Report | null;
    open: boolean;
    onClose: () => void;
}

export function ReportDetailModal({ report, open, onClose }: ReportDetailModalProps) {
    if (!report) return null;

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        try {
            return format(new Date(dateString), 'dd MMMM yyyy', { locale: idLocale });
        } catch {
            return dateString;
        }
    };

    const InfoItem = ({ label, value, icon: Icon }: { label: string; value?: string | number | null, icon?: LucideIcon }) => (
        <div className="flex flex-col gap-1 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                {Icon && <Icon className="w-3 h-3" />}
                {label}
            </span>
            <span className="text-sm font-semibold text-gray-900 break-words">{value || '-'}</span>
        </div>
    );

    const formatTitle = (text: string | null | undefined): string => {
        if (!text) return '-';
        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-green-50 to-white border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-bold text-green-900 flex items-center gap-2">
                                <User className="w-6 h-6 text-green-600" />
                                Laporan Penyuluh
                            </DialogTitle>
                            <p className="text-sm text-green-700 mt-1 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {report.village}, {report.district}
                                <span className="mx-2">•</span>
                                <Calendar className="w-4 h-4" /> {formatDate(report.visit_date)}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <ScrollArea className="h-full max-h-[calc(90vh-100px)]">
                    <div className="p-6">
                        <Tabs defaultValue="main" className="w-full">
                            <TabsList className="w-full justify-start mb-6 bg-gray-100/50 p-1">
                                <TabsTrigger value="main" className="flex-1 max-w-[200px]">Info Utama</TabsTrigger>
                                <TabsTrigger value="commodity" className="flex-1 max-w-[200px]">Komoditas</TabsTrigger>
                                <TabsTrigger value="issues" className="flex-1 max-w-[200px]">Masalah & Solusi</TabsTrigger>
                            </TabsList>

                            <TabsContent value="main" className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-blue-600" />
                                        Informasi Petani & Lokasi
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <InfoItem label="Nama Petani" value={report.farmer_name} />
                                        <InfoItem label="Kelompok Tani" value={`${report.farmer_group} (${report.farmer_group_type})`} />
                                        <InfoItem label="Penyuluh" value={report.extension_officer} />
                                        <InfoItem label="Desa" value={report.village} />
                                        <InfoItem label="Kecamatan" value={report.district} />
                                        <InfoItem label="Koordinat" value={`${report.latitude}, ${report.longitude}`} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="commodity" className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                                {/* Food Crop */}
                                {report.food_commodity && (
                                    <div className="space-y-4 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                        <h3 className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
                                            <Sprout className="w-5 h-5" /> Tanaman Pangan
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <InfoItem label="Komoditas" value={formatTitle(report.food_commodity)} />
                                            <InfoItem label="Luas Lahan" value={`${report.food_land_area} Ha`} />
                                            <InfoItem label="Status Lahan" value={formatTitle(report.food_land_status)} />
                                            <InfoItem label="Fase Pertumbuhan" value={formatTitle(report.food_growth_phase)} />
                                            <InfoItem label="Umur Tanaman" value={`${report.food_plant_age} Hari`} />
                                            <InfoItem label="Tanggal Tanam" value={formatDate(report.food_planting_date)} />
                                            <InfoItem label="Estimasi Panen" value={formatDate(report.food_harvest_date)} />
                                            <InfoItem label="Teknologi" value={formatTitle(report.food_technology)} />
                                        </div>
                                    </div>
                                )}

                                {/* Horticulture */}
                                {report.horti_commodity && (
                                    <div className="space-y-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                        <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                                            <Sprout className="w-5 h-5" /> Hortikultura
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <InfoItem label="Komoditas" value={formatTitle(report.horti_commodity)} />
                                            <InfoItem label="Sub Komoditas" value={formatTitle(report.horti_sub_commodity)} />
                                            <InfoItem label="Luas Lahan" value={`${report.horti_land_area} Ha`} />
                                            <InfoItem label="Status Lahan" value={formatTitle(report.horti_land_status)} />
                                            <InfoItem label="Fase Pertumbuhan" value={formatTitle(report.horti_growth_phase)} />
                                            <InfoItem label="Umur Tanaman" value={`${report.horti_plant_age} Hari`} />
                                            <InfoItem label="Tanggal Tanam" value={formatDate(report.horti_planting_date)} />
                                            <InfoItem label="Estimasi Panen" value={formatDate(report.horti_harvest_date)} />
                                            <InfoItem label="Teknologi" value={formatTitle(report.horti_technology)} />
                                        </div>
                                    </div>
                                )}

                                {/* Plantation */}
                                {report.plantation_commodity && (
                                    <div className="space-y-4 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                                        <h3 className="text-lg font-semibold text-amber-800 flex items-center gap-2">
                                            <Sprout className="w-5 h-5" /> Perkebunan
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <InfoItem label="Komoditas" value={formatTitle(report.plantation_commodity)} />
                                            <InfoItem label="Luas Lahan" value={`${report.plantation_land_area} Ha`} />
                                            <InfoItem label="Status Lahan" value={formatTitle(report.plantation_land_status)} />
                                            <InfoItem label="Fase Pertumbuhan" value={formatTitle(report.plantation_growth_phase)} />
                                            <InfoItem label="Umur Tanaman" value={`${report.plantation_plant_age} Hari`} />
                                            <InfoItem label="Tanggal Tanam" value={formatDate(report.plantation_planting_date)} />
                                            <InfoItem label="Estimasi Panen" value={formatDate(report.plantation_harvest_date)} />
                                            <InfoItem label="Teknologi" value={formatTitle(report.plantation_technology)} />
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="issues" className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <AlertTriangle className="w-5 h-5 text-red-500" />
                                            Masalah & Kendala
                                        </h3>
                                        <div className="space-y-3">
                                            {report.has_pest_disease && (
                                                <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-sm">
                                                    <p className="font-semibold text-red-800">Serangan Hama/Penyakit:</p>
                                                    <p className="text-gray-700">{formatTitle(report.pest_disease_type)} pada {formatTitle(report.pest_disease_commodity)}</p>
                                                    <p className="text-gray-500 mt-1">Luas: {formatTitle(report.affected_area)}</p>
                                                    <p className="text-gray-500">Pengendalian: {formatTitle(report.control_action)}</p>
                                                </div>
                                            )}
                                            <InfoItem label="Kendala Utama" value={formatTitle(report.main_constraint)} />
                                            <InfoItem label="Masalah Produksi" value={formatTitle(report.production_problems)} />
                                            <InfoItem label="Masalah Pasca Panen" value={formatTitle(report.post_harvest_problems)} />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <CloudRain className="w-5 h-5 text-sky-500" />
                                            Kondisi Alam & Kebutuhan
                                        </h3>
                                        <div className="space-y-3">
                                            <InfoItem label="Kondisi Cuaca" value={formatTitle(report.weather_condition)} />
                                            <InfoItem label="Akses Air" value={formatTitle(report.water_access)} icon={Droplets} />
                                            <InfoItem label="Saran / Catatan" value={formatTitle(report.suggestions)} />
                                            <InfoItem label="Kebutuhan Mendesak" value={formatTitle(report.urgent_needs)} icon={AlertTriangle} />
                                            <InfoItem label="Pelatihan Dibutuhkan" value={formatTitle(report.training_needed)} icon={Lightbulb} />
                                            <InfoItem label="Harapan Petani" value={formatTitle(report.farmer_hope)} />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
