"use client";
import React, { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import SubRouteNavigation from "./SubRouteNavigation";
import BaseImage from "@/components/Base/BaseImage";
import { RiArrowLeftSLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { removeCookie } from "@/utility";
import { vendorItems } from "@/constants/Data";
const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = useMemo(() => {
    if (pathname.startsWith("/")) return vendorItems;
    return [];
  }, [pathname]);

  const activeMenu = useMemo(() => {
    return menuItems.find((menu) => menu.link && pathname === menu.link);
  }, [pathname, menuItems]);

  const wrapperClasses = twMerge(
    "sticky px-4 top-0 h-screen flex flex-col shadow-md bg-white z-50 transition-all duration-300 ease-in-out",
    toggleCollapse ? "w-20" : "w-80",
    isMobileDrawerOpen
      ? "fixed px-4 left-0 w-64 max-w-sm h-screen"
      : "hidden md:flex"
  );

  const overlayClasses = twMerge(
    "fixed inset-0 bg-black bg-opacity-30 z-40 transition-all duration-300",
    isMobileDrawerOpen ? "block" : "hidden"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileDrawerOpen) {
        setIsMobileDrawerOpen(false);
        document.body.style.overflow = "auto";
      }
      if (window.innerWidth < 768 && toggleCollapse) {
        setToggleCollapse(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [isMobileDrawerOpen, toggleCollapse]);

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  , [isMobileDrawerOpen]);

  const handleMobileDrawerToggle = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
    document.body.style.overflow = isMobileDrawerOpen ? "auto" : "hidden";
  };

  const handleDesktopToggle = () => setToggleCollapse(!toggleCollapse);

  const handlerLogout = () => {
    removeCookie("V_at");
    removeCookie("V_PL");
    removeCookie("h_s");
    removeCookie("s_s");
    if (pathname.startsWith("/")) router.replace("/login");
  };

  const getNavItemClasses = (menu: { id?: number; link?: string }) => {
    return twMerge(
      "flex items-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap",
      activeMenu?.id === menu.id ? "bg-primary text-white" : "hover:bg-gray-100"
    );
  };

  return (
    <>
      <div className={overlayClasses} onClick={handleMobileDrawerToggle}></div>
      <button
        className={twMerge(
          "absolute top-4 z-50 p-2 md:hidden transition-transform bg-white/60 rounded-lg",
          isMobileDrawerOpen ? "left-4" : "left-4"
        )}
        style={{ top: ".5rem", left: ".5rem" }}
        onClick={handleMobileDrawerToggle}
      >
        <FiMenu size={24} className={isMobileDrawerOpen ? "rotate-180" : ""} />
      </button>
      <div
        className={wrapperClasses}
        style={{
          transition: "all 300ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <button
          className={twMerge(
            "absolute left-full transform -translate-x-1/2 p-2 bg-primary rounded-full hidden md:block",
            toggleCollapse ? "rotate-180" : ""
          )}
          onClick={handleDesktopToggle}
        >
          <RiArrowLeftSLine size={24} />
        </button>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center transition-transform duration-300 ease-in-out">
              <BaseImage
                src={
                  toggleCollapse
                    ? "/assets/images/bottom.png"
                    : "/assets/images/sidebarlogo.png"
                }
                width={toggleCollapse ? 50 : 214}
                height={toggleCollapse ? 50 : 93}
                alt="Logo"
                className="transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-col items-start mt-4 space-y-2 ">
            {menuItems.map((menu) => {
              if (!menu.id) {
                return (
                  <div
                    key={menu.label}
                    className="py-2 px-6 text-gray-500 font-semibold text-sm"
                  >
                    {!toggleCollapse && <span>{menu.label}</span>}
                  </div>
                );
              }

              const Icon = menu.icon;
              const classes = getNavItemClasses(menu);

              return menu.label === "Logout" ? (
                <div key={menu.id} className={classes} onClick={handlerLogout}>
                  <span className="flex py-3 px-3 items-center w-full h-full">
                    <div className="w-10">
                      <Icon
                        size={20}
                        className={twMerge(
                          activeMenu?.id === menu.id
                            ? "text-white"
                            : "text-black"
                        )}
                      />
                    </div>
                    <span
                      className={twMerge(
                        "text-md font-medium text-gray-600",
                        toggleCollapse ? "hidden" : "block",
                        activeMenu?.id === menu.id ? "text-white" : "text-black"
                      )}
                    >
                      {menu.label}
                    </span>
                  </span>
                </div>
              ) : (
                <SubRouteNavigation
                  closeMobileDrawer={() => isMobileDrawerOpen ? handleMobileDrawerToggle() : null}
                  setIsMobileDrawerOpen={setIsMobileDrawerOpen}
                  isMobileDrawerOpen={isMobileDrawerOpen}
                  activeMenu={activeMenu} menu={menu} />
              );
            })}

          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
