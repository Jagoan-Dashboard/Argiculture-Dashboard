'use client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, ChevronLeft, ChevronRight, Search, FileText, Loader2, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useReports } from './hooks/useReports';
import { Report } from './types/reports-types';
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { ReportDetailModal } from "./components/ReportDetailModal";

export default function ReportsPage() {
    const { reports, loading } = useReports();

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filtered = useMemo(() => {
        let arr = reports || []; // Ensure arr is an array
        const q = searchQuery.trim().toLowerCase();

        if (q) {
            arr = arr.filter((r) =>
                r.farmer_name?.toLowerCase().includes(q) ||
                r.extension_officer?.toLowerCase().includes(q) ||
                r.village?.toLowerCase().includes(q)
            );
        }

        return arr;
    }, [reports, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const startIdx = (safePage - 1) * rowsPerPage;
    const pageItems = filtered.slice(startIdx, startIdx + rowsPerPage);

    const formatTitle = (text: string): string => {
        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const getCommodityBadge = (report: Report) => {
        if (report.food_commodity) {
            return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">Pangan: {formatTitle(report.food_commodity)}</Badge>;
        }
        if (report.horti_commodity) {
            return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Horti: {formatTitle(report.horti_sub_commodity || report.horti_commodity || '')}</Badge>;
        }
        if (report.plantation_commodity) {
            return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Perkebunan: {formatTitle(report.plantation_commodity)}</Badge>;
        }
        return <Badge variant="outline">Unknown</Badge>;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 p-4 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="space-y-6">
                    {/* Breadcrumb */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard-admin" className="flex items-center gap-1 hover:text-green-600 transition-colors">
                                    <Home className="w-4 h-4" />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-gray-700 font-medium">Data Laporan</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <p className="text-sm text-gray-600">Kabupaten Ngawi</p>
                            <h1 className="text-xl lg:text-2xl font-bold text-green-600">Laporan Penyuluh</h1>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari petani, penyuluh, desa..."
                                className="pl-9 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Section */}
                    <Card className="border-none shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                                        <p className="ml-3 text-gray-600">Memuat data laporan...</p>
                                    </div>
                                ) : (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b bg-gray-50/50">
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Tanggal / Lokasi</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Petani / Poktan</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Komoditas</th>
                                                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Penyuluh</th>
                                                <th className="text-right py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pageItems.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-12">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FileText className="w-12 h-12 text-gray-300" />
                                                            <p className="text-gray-500">Tidak ada data laporan ditemukan</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                pageItems.map((r) => (
                                                    <tr key={r.id} className="border-b border-gray-50 hover:bg-green-50/30 transition-colors">
                                                        <td className="py-4 px-6">
                                                            <div className="flex flex-col gap-1">
                                                                <div className="flex items-center gap-2 text-gray-700 font-medium">
                                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                                    <span className="text-sm">
                                                                        {r.visit_date ? format(new Date(r.visit_date), 'dd MMM yyyy', { locale: idLocale }) : '-'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                                                    <MapPin className="w-3.5 h-3.5" />
                                                                    {r.village}, {r.district}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-gray-900">{r.farmer_name}</span>
                                                                <span className="text-xs text-gray-500">{r.farmer_group} ({r.farmer_group_type})</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            {getCommodityBadge(r)}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-gray-600">
                                                            {r.extension_officer}
                                                        </td>
                                                        <td className="py-4 px-6 text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                                onClick={() => setSelectedReport(r)}
                                                            >
                                                                Detail
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </CardContent>

                        {/* Pagination */}
                        <CardContent className="p-4 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="text-sm text-gray-600">
                                    Menampilkan <span className="font-medium text-gray-900">{startIdx + 1}-{Math.min(startIdx + rowsPerPage, filtered.length)}</span> dari <span className="font-medium text-gray-900">{filtered.length}</span> laporan
                                </div>

                                <div className="flex items-center gap-3">
                                    <Select
                                        value={String(rowsPerPage)}
                                        onValueChange={(v) => {
                                            const n = Number(v);
                                            if (!Number.isNaN(n)) {
                                                setRowsPerPage(n);
                                                setCurrentPage(1);
                                            }
                                        }}
                                    >
                                        <SelectTrigger className="w-[130px] h-9 border-gray-200 text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5 / halaman</SelectItem>
                                            <SelectItem value="10">10 / halaman</SelectItem>
                                            <SelectItem value="20">20 / halaman</SelectItem>
                                            <SelectItem value="50">50 / halaman</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={safePage === 1}
                                            className="h-9 w-9 border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200 disabled:opacity-50"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>

                                        <div className="flex items-center px-3 text-sm font-medium text-gray-700 min-w-[3rem] justify-center">
                                            {safePage} / {totalPages}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={safePage === totalPages}
                                            className="h-9 w-9 border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200 disabled:opacity-50"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ReportDetailModal
                report={selectedReport}
                open={!!selectedReport}
                onClose={() => setSelectedReport(null)}
            />
        </div>
    );
}
