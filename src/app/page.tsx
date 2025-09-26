"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/95 p-5 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-2 rounded-xl shadow-md">
                <Image
                  src="/icon0.svg"
                  alt="Ngawi Agriculture Dashboard Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  Ngawi Agriculture
                </h1>
                <p className="text-xs text-gray-500">Dashboard Analytics</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/dashboard-admin"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Dashboard
              </Link>
              <Link
                href="#features"
                className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
              >
                Fitur
              </Link>
              <Link
                href="#benefits"
                className="text-gray-700 hover:text-green-700 font-medium transition-colors duration-200"
              >
                Manfaat
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-full text-center transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="#features"
                  className="text-gray-700 hover:text-green-700 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fitur
                </Link>
                <Link
                  href="#benefits"
                  className="text-gray-700 hover:text-green-700 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Manfaat
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex  items-center flex-col justify-center overflow-hidden">
        {/* Hero Section */}
        <section className="flex py-10 items-center justify-center overflow-hidden">
          <div className=" mx-auto px-4 lg:px-8 z-10 mt-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8 animate-fade-in-up">
                <span className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-green-700 border border-green-200 shadow-sm mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Platform Analytics Pertanian Terdepan
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up delay-200">
                <span className="bg-gradient-to-r from-green-800 via-emerald-700 to-green-900 bg-clip-text text-transparent">
                  Ngawi
                </span>
                <br className="md:hidden" />
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Agriculture
                </span>
                <div className="mt-2">
                  <span className="text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </div>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-400">
                Platform <span className="font-semibold text-green-700">komprehensif</span> untuk monitoring dan analisis data pertanian Ngawi yang mendukung
                <span className="font-semibold text-emerald-700">ketahanan pangan</span> dan pembangunan pertanian berkelanjutan.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-600">
                <Link
                  href="/dashboard-admin"
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Akses Dashboard
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="group border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/80 hover:shadow-xl text-lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    Jelajahi Fitur
                    <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in-up delay-800">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">50K+</div>
                  <div className="text-gray-600 font-medium">Data Points Analyzed</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">24/7</div>
                  <div className="text-gray-600 font-medium">Real-time Monitoring</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">100%</div>
                  <div className="text-gray-600 font-medium">Data Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 rounded-3xl mt-20 lg:py-32 bg-gradient-to-b from-white to-green-50/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-semibold text-green-700 mb-6">
                ✨ Fitur Unggulan
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  Solusi Pertanian
                </span>
                <br />
                <span className="text-gray-800">Terdepan</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Platform terintegrasi dengan teknologi AI untuk monitoring dan analisis pertanian yang akurat dan real-time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Komoditas Pangan Card */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-green-300 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Monitoring Komoditas</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Pantau produksi, distribusi, dan tren komoditas pangan seperti padi, jagung, kedelai dengan dashboard interaktif.
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Dominasi Hama Card */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Analisis Dominasi Hama</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Sistem deteksi dini dan analisis prevalensi hama dengan teknologi AI untuk mitigasi yang efektif.
                </p>
                <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Perkiraan Panen Card */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-blue-300 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Prediksi Jadwal Panen</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Estimasi waktu panen yang akurat dengan algoritma machine learning untuk optimalisasi distribusi.
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Additional Features */}
              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-purple-300 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Analisis Cuaca</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Monitoring kondisi cuaca real-time dan prediksi untuk mendukung keputusan pertanian yang optimal.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-orange-300 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Assurance</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Sistem kontrol kualitas produk pertanian dengan standar internasional untuk jaminan mutu.
                </p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-green-100 hover:border-indigo-300 transition-all duration-500 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Irrigation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Sistem irigasi pintar dengan sensor IoT untuk efisiensi penggunaan air dan optimalisasi pertumbuhan tanaman.
                </p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                  Pelajari lebih lanjut
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-semibold text-blue-700 mb-6">
                  📊 Live Preview
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-800 to-green-700 bg-clip-text text-transparent">
                    Dashboard Analytics
                  </span>
                  <br />
                  <span className="text-gray-800">Terdepan</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Interface yang intuitif dengan visualisasi data real-time untuk pengambilan keputusan strategis yang akurat
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl">
                <Image src={assets.imageDashboard} alt="Dashboard Preview" width={800} height={600} />

              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 rounded-3xl lg:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-semibold text-green-700 mb-6">
                🚀 Manfaat Sistem
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                  Transformasi Digital
                </span>
                <br />
                <span className="text-gray-800">Pertanian Ngawi</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Solusi komprehensif yang memberikan dampak nyata untuk kemajuan sektor pertanian berkelanjutan
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              <div className="space-y-8">
                <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-green-100 hover:border-green-300 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Peningkatan Produktivitas</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Analisis data berbasis AI membantu optimalisasi hasil panen dengan peningkatan produktivitas hingga
                        <span className="font-semibold text-green-600">25-30%</span> melalui rekomendasi yang tepat sasaran.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-emerald-100 hover:border-emerald-300 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Mitigasi Risiko Cerdas</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Sistem deteksi dini dengan teknologi IoT dan machine learning mengurangi risiko kerugian hingga
                        <span className="font-semibold text-emerald-600">40%</span> dari serangan hama dan perubahan cuaca ekstrem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-blue-100 hover:border-blue-300 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-emerald-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Kebijakan Berbasis Data</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Dashboard analytics memberikan insight mendalam untuk pemerintah daerah dalam merancang kebijakan
                        pertanian yang lebih <span className="font-semibold text-blue-600">efektif dan berkelanjutan</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-purple-100 hover:border-purple-300 transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Aksesibilitas Universal</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Platform responsive yang dapat diakses
                        <span className="font-semibold text-purple-600">24/7</span> dari berbagai perangkat, memudahkan
                        petani, penyuluh, dan instansi terkait dalam mengambil keputusan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-green-100 max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-green-800 to-emerald-700 bg-clip-text text-transparent">
                    Siap Mentransformasi Pertanian Anda?
                  </span>
                </h3>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Bergabunglah dengan revolusi digital pertanian dan rasakan manfaat teknologi terdepan untuk hasil panen yang optimal.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link
                    href="/dashboard-admin"
                    className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Mulai Sekarang
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  <button className="group border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm bg-white/50 hover:shadow-xl text-lg">
                    <span className="flex items-center justify-center gap-2">
                      Konsultasi Gratis
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="pt-20 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
                    <Image
                      src="/icon0.svg"
                      alt="Ngawi Agriculture Dashboard Logo"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Ngawi Agriculture</h3>
                    <p className="text-green-200 text-sm">Smart Farming Dashboard</p>
                  </div>
                </div>
                <p className="text-green-100 leading-relaxed mb-8 text-lg">
                  Platform teknologi terdepan untuk monitoring dan analisis pertanian yang mendukung ketahanan pangan
                  dan pembangunan berkelanjutan di Kabupaten Ngawi.
                </p>

                {/* Social Media */}
                <div className="flex gap-4">
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.742-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white">Fitur Utama</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Monitoring Komoditas
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Analisis Hama & Penyakit
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Prediksi Jadwal Panen
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Smart Irrigation System
                  </a></li>
                </ul>
              </div>

              {/* Information */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white">Informasi</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Tentang Kabupaten Ngawi
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Statistik Pertanian
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Kebijakan & Regulasi
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    Berita & Artikel
                  </a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white">Dukungan</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Panduan Penggunaan
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Dokumentasi API
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Pusat Bantuan
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    Hubungi Kami
                  </a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8 pb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <p className="text-green-200 text-center sm:text-left">
                  &copy; {new Date().getFullYear()} Ngawi Agriculture Dashboard.
                  <span className="block sm:inline">Dikembangkan untuk kemajuan sektor pertanian Kabupaten Ngawi.</span>
                </p>
              </div>

              <div className="flex items-center gap-6">
                <a href="#" className="text-green-200 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-green-200 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-green-200 hover:text-white text-sm transition-colors duration-200">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// CSS untuk animasi fade-in-up
const fadeInUpStyle = `
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  .delay-200 {
    animation-delay: 200ms;
  }
  .delay-400 {
    animation-delay: 400ms;
  }
  .delay-600 {
    animation-delay: 600ms;
  }
  .delay-800 {
    animation-delay: 800ms;
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = fadeInUpStyle;
  document.head.appendChild(style);
}