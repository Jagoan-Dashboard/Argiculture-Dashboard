
"use client";

import { ReactNode, useEffect } from "react";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import AppSidebar from "@/layout/dashboard/AppSidebar";
import Backdrop from "@/layout/dashboard/Backdrop";
import AppHeader from "@/layout/dashboard/AppHeader";

interface LayoutContentProps {
  children: ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Script
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

    createChat({
        webhookUrl: 'https://dev-n8n.ub.ac.id/webhook/b0580c04-2832-42e3-a844-2ab70449d6f4/chat',
        initialMessages: [
            // Pesan awal yang disesuaikan
            'Selamat datang, **Bapak/Ibu Eksekutif**.\\n\\nSaya Asisten Data AI Kab. Ngawi, siap menyediakan informasi cepat untuk data pertanian.'
        ],
        i18n: {
            en: { // Menggunakan 'en' namun isinya Bahasa Indonesia
                title: 'Jagoan Bot AI', // Judul yang fokus pada data
                subtitle: '', // Subtitle institusi
                footer: '',
                getStarted: 'Mulai Sesi Percakapan dengan AI', // Lebih profesional
                inputPlaceholder: 'Input pertanyaan data Anda...', // Lebih ringkas
            },
        },
        showWelcomeScreen: true,
        theme: {
            primaryColor: '#FF4B99',      // Rose/Pink: Warna Aksen Utama Dashboard
            backgroundColor: '#FFFFFF',   // Putih: Bersih dan formal
            textColor: '#333333',         // Warna teks gelap
            chatBubbleColor: '#FFEDED'    // Warna bubble bot Light Pink
        },
    });
    `;
    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  });

  return (
    <div className="min-h-screen xl:flex bg-[#F8F3F5] xl:gap-4">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

interface DashboardAdminLayoutProps {
  children: ReactNode;
}

const DashboardAdminLayout: React.FC<DashboardAdminLayoutProps> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};

export default DashboardAdminLayout;