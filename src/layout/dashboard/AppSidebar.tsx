// components/AppSidebar.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSidebar } from "@/context/SidebarContext";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SubMenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  pro?: boolean;
  new?: boolean;
  // permission?: PermissionType;
};

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
  isLogout?: boolean;
  isHelp?: boolean;
  // permission?: PermissionType;
  // permissions?: PermissionType[];
};

const navItems: NavItem[] = [
  {
    icon: <Icon icon="tabler:home" width="20" height="20" color="#009933" />,
    name: "Executive",
    path: "/dashboard-admin",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="ph:farm" width="20" height="20" color="#009933" />,
    name: "Komoditas",
    path: "/dashboard-admin/komoditas",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="streamline-plump:wheat" width="20" height="20" color="#009933" />,
    name: "Komoditas Pangan",
    path: "/dashboard-admin/komoditas-pangan",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="tabler:plant" width="20" height="20" color="#009933" />,
    name: "Komoditas Hortikultura",
    path: "/dashboard-admin/komoditas-hortikultura",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="mdi:seed-outline" width="20" height="20" color="#009933" />,
    name: "Komoditas Perkebunan",
    path: "/dashboard-admin/komoditas-perkebunan",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="material-symbols:settings-outline-rounded" width="20" height="20" color="#009933" />,
    name: "Alat Pertanian",
    path: "/dashboard-admin/alat-pertanian",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="icon-park-outline:water" width="20" height="20" color="#009933" />,
    name: "Lahan & Pengairan",
    path: "/dashboard-admin/lahan-pengairan",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="tabler:file-text" width="20" height="20" color="#009933" />,
    name: "Laporan",
    path: "/dashboard-admin/laporan",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {
    icon: <Icon icon="icon-park-outline:user" width="20" height="20" color="#009933" />,
    name: "Manajemen Pengguna",
    path: "/dashboard-admin/user-management",
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },
  {

    name: "Bantuan",
    isHelp: true, // Menandai sebagai menu bantuan
  },
  {
    icon: <Icon icon="tabler:logout-2" width="20" height="20" color="" />,
    name: "Logout",
    path: "/logout",
    isLogout: true,
    // permission: PERMISSIONS.DASHBOARD_INDEX,
  },

];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => pathname === path,
    [pathname],
  );

  const handleLogout = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setShowLogoutDialog(true);
    },
    [],
  );

  const handleConfirmLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
    } catch (error) {
      console.error("Logout gagal", error);
    }
  };

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const getSubMenuItemIcon = (subItem: SubMenuItem) => {
    return subItem?.icon || <HiDotsHorizontal className="w-4 h-4" />;
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => {
        const accessibleSubItems = nav.subItems?.map((subItem) => subItem) || [];

        if (nav.subItems) {
          if (accessibleSubItems.length === 0) return null;

          const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
          const isCurrent = isOpen || isActive(nav.path || "");

          return (
            <li key={nav.name} className="relative">
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group
                  ${isCurrent ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-600 hover:bg-gray-100"}
                  ${!isExpanded && !isHovered && !isMobileOpen ? "justify-center" : "justify-between"}
                `}
                onClick={() => handleSubmenuToggle(index, menuType)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-green-600 group-hover:text-green-800">
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
                </div>
                {(isExpanded || isHovered || isMobileOpen) && nav.subItems && (
                  <FaChevronDown
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {(isExpanded || isHovered || isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[`${menuType}-${index}`] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height: isOpen ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {accessibleSubItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.path}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200
                            ${isActive(subItem.path) ? "text-green-700 bg-green-50" : "text-gray-600 hover:bg-gray-100"}
                          `}
                        >
                          <span className="text-green-600">
                            {getSubMenuItemIcon(subItem)}
                          </span>
                          <span>{subItem.name}</span>
                          <span className="flex items-center gap-1 ml-auto">
                            {subItem.new && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${isActive(subItem.path)
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                                }`}>
                                new
                              </span>
                            )}
                            {subItem.pro && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${isActive(subItem.path)
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-600"
                                }`}>
                                pro
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        }
        if (nav.isHelp) {
          return (
            <li key={nav.name} className="relative">
              <div className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium text-gray-600 hover:bg-gray-100
                ${!isExpanded && !isHovered && !isMobileOpen ? "justify-center" : "justify-between"}
              `}>
                {(isExpanded || isHovered || isMobileOpen) ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-green-600">{nav.icon}</span>
                      <div>
                        <h3 className="font-medium">Butuh Bantuan?</h3>
                        <p className="text-xs text-gray-500">Hubungi kami</p>
                      </div>
                    </div>
                    <div
                      className="border-1 border-gray-300 rounded-lg p-2 "
                      onClick={() => {
                        // Handle bantuan action
                        console.log("Bantuan clicked");
                      }}
                    >
                      <Icon icon="mynaui:telephone" width="16" height="16" className="text-green-600" />
                    </div>
                  </>
                ) : (
                  <span className="text-green-600">{nav.icon}</span>
                )}
              </div>
            </li>
          );
        }
        if (nav.path) {
          return nav.isLogout ? (
            <li key={nav.name}>
              <button
                className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                  ${isActive(nav.path) ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:bg-gray-100"}
                  ${!isExpanded && !isHovered && !isMobileOpen ? "justify-center" : "justify-start"}
                `}
                onClick={handleLogout}
              >
                <span className="text-orange-600">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="text-orange-600">{nav.name}</span>}
              </button>
            </li>
          ) : (
            <li key={nav.name}>
              <Link
                href={nav.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                  ${isActive(nav.path) ? "text-green-700 bg-green-50" : "text-gray-600 hover:bg-gray-100"}
                  ${!isExpanded && !isHovered && !isMobileOpen ? "justify-center" : "justify-start"}
                `}
              >
                <span className="text-green-600">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
              </Link>
            </li>

          );
        }
        return null;
      })}
    </ul>
  );

  return (
    <>
      <div className={`fixed h-full top-0 p-5 z-50  lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`} onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <aside
          className={`  bg-white flex flex-col lg:mt-0  px-5 left-0  h-[calc(100vh-45px)] text-gray-900  overflow-y-auto transition-all duration-300 ease-in-out z-50 rounded-xl
          ${isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
                ? "w-[290px]"
                : "w-[80px]"
            }
          lg:translate-x-0`}
        >
          <div
            className={`py-8 flex ${!isExpanded && !isHovered && !isMobileOpen ? "lg:justify-center" : "justify-start"
              }`}
          >
            <Link href="/">
              {isExpanded || isHovered || isMobileOpen ? (
                <>
                  <div className=" flex justify-center items-center gap-2">
                    <Image
                      src={assets.imageLogoNgawi}
                      alt="Logo Ngawi"
                      width={30}
                      height={30}
                    />
                    <Image
                      src={assets.imageLogo}
                      alt="Logo Jagoan Satu Data"
                      width={120}
                      height={120}
                    />
                  </div>
                </>
              ) : (
                <Image
                  src={assets.imageLogoNgawi}
                  alt="Logo Ngawi"
                  width={30}
                  height={30}
                />
              )}
            </Link>
          </div>
          <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav className="mb-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2
                    className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered && !isMobileOpen
                      ? "lg:justify-center"
                      : "justify-start"
                      }`}
                  >
                    {isExpanded || isHovered || isMobileOpen ? (
                      "Menu"
                    ) : (
                      <HiDotsHorizontal className="size-6" />
                    )}
                  </h2>
                  {renderMenuItems(
                    navItems.filter((nav) => {
                      if (nav.path === "/dashboard-admin/user-management") {
                        return user?.role === "SUPERADMIN";
                      }
                      return true;
                    }),
                    "main"
                  )}
                </div>
              </div>
            </nav>
          </div>
        </aside>
      </div>

      {/* Alert Dialog untuk Logout */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah kamu yakin ingin logout? Anda akan keluar dari akun dan perlu login kembali untuk mengakses sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmLogout}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Ya, Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AppSidebar;