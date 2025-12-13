"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadIcon, X as CloseIcon, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { commodityService } from "../service/commodity-service";

interface ImportCommodityFileProps {
  onSuccess?: () => void;
}

const MAX_FILE_SIZE_MB = 5; // batas ukuran file, bisa diubah sesuai kebutuhan

const ImportCommodityFile: React.FC<ImportCommodityFileProps> = ({ onSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importStats, setImportStats] = useState<{
    total_rows: number;
    success_count: number;
    failed_count: number;
    skipped_count: number;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const resetState = () => {
    setSelectedFile(null);
    setImportMessage(null);
    setImportStats(null);
    setImportError(null);
    setIsDragging(false);
    setIsProcessing(false);
  };

  const openModal = () => {
    resetState();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".xlsx")) {
      return "File harus berformat .xlsx";
    }

    const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `Ukuran file maksimal ${MAX_FILE_SIZE_MB}MB`;
    }

    return null;
  };

  const handleFiles = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setImportError(validationError);
      toast.error("File tidak valid", {
        description: validationError,
      });
      setSelectedFile(null);
      return;
    }

    setImportError(null);
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImportMessage(null);
    setImportStats(null);
    setImportError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setImportError("Silakan pilih file terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    setImportError(null);

    try {
      const response = await commodityService.importData(selectedFile);
      if (response.success) {
        setImportMessage(response.message);
        setImportStats(response.data);
        toast.success("Import data berhasil", {
          description: response.message,
        });
        if (onSuccess) onSuccess();
      } else {
        setImportError(response.message || "Import data gagal.");
        toast.error("Import data gagal", {
          description: response.message || "Terjadi kesalahan saat import.",
        });
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Terjadi kesalahan saat mengimport data.";
      setImportError(message);
      toast.error("Import data gagal", {
        description: message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        type="button"
        onClick={openModal}
      >
        <UploadIcon className="w-4 h-4" />
        Import Data
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Import Data Komoditas
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Upload file Excel (.xlsx) sesuai template yang telah disediakan.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Tutup"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div
                className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors cursor-pointer w-full
                ${isDragging ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  disabled={isProcessing}
                />

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <FileSpreadsheet className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="mt-3 text-sm font-medium text-gray-900">
                  Pilih atau tarik file Excel (.xlsx)
                </h4>
                <p className="mt-1 text-xs text-gray-500">
                  Klik area ini untuk memilih file atau tarik dan lepas file ke sini.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Format: .xlsx &bull; Maks. {MAX_FILE_SIZE_MB}MB
                </p>

                {selectedFile && (
                  <div className="mt-4 w-full rounded-md bg-gray-50 px-3 py-2 text-left text-xs text-gray-700 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium truncate max-w-[220px]">
                        {selectedFile.name}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {importError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {importError}
                </div>
              )}

              {importMessage && importStats && (
                <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-800 space-y-1">
                  <p className="font-semibold">{importMessage}</p>
                  <p>Total baris: {importStats.total_rows}</p>
                  <p>Berhasil: {importStats.success_count}</p>
                  <p>Gagal: {importStats.failed_count}</p>
                  <p>Terlewati: {importStats.skipped_count}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-3 text-xs text-gray-500">
              <p>
                Pastikan format kolom sudah sesuai dengan template import komoditas.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={closeModal}
                  disabled={isProcessing}
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="bg-green-600 text-white text-xs hover:bg-green-700"
                  onClick={handleUpload}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Mengupload..." : "Import Sekarang"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImportCommodityFile;
