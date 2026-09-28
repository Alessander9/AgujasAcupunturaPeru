import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type SubMenuItem = {
  label: string;
  description: string;
  icon: React.ElementType;
  link?: string;
};

export type SubMenu = {
  title: string;
  items: SubMenuItem[];
};

export type NavItem = {
  id: number;
  label: string;
  link?: string;
  subMenus?: SubMenu[];
};

export type DropdownNavigationProps = {
  navItems: NavItem[];
  className?: string;
};

export function DropdownNavigation({ navItems, className = "" }: DropdownNavigationProps) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isHover, setIsHover] = useState<number | null>(null);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <ul className="relative flex items-center space-x-1">
          {navItems.map((navItem) => (
            <li
              key={navItem.label}
              className="relative"
              onMouseEnter={() => handleHover(navItem.label)}
              onMouseLeave={() => handleHover(null)}
            >
              {navItem.link && !navItem.subMenus ? (
                <a
                  href={navItem.link}
                  className="text-sm font-semibold py-2 px-3.5 flex cursor-pointer group transition-colors duration-200 items-center justify-center gap-1 text-[#F7F2EA] hover:text-[#E6D3BC] relative rounded-full"
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  {isHover === navItem.id && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                </a>
              ) : (
                <button
                  type="button"
                  className="text-sm font-semibold py-2 px-3.5 flex cursor-pointer group transition-colors duration-200 items-center justify-center gap-1.5 text-[#F7F2EA] hover:text-[#E6D3BC] relative rounded-full"
                  onMouseEnter={() => setIsHover(navItem.id)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  {navItem.subMenus && (
                    <ChevronDown
                      className={`h-4 w-4 relative z-10 text-[#E6D3BC] group-hover:text-[#F7F2EA] duration-300 transition-transform ${
                        openMenu === navItem.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {(isHover === navItem.id || openMenu === navItem.label) && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute inset-0 size-full bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                    />
                  )}
                </button>
              )}

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div className="w-auto absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="bg-[#FFFFFF] border border-[#E6D3BC] p-5 w-max shadow-2xl shadow-[#16332B]/30 rounded-2xl"
                    >
                      <div className="w-fit shrink-0 flex space-x-7 overflow-hidden">
                        {navItem.subMenus.map((sub) => (
                          <div className="w-64" key={sub.title}>
                            <h3 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-[#A47C52] border-b border-[#E6D3BC]/60 pb-2">
                              {sub.title}
                            </h3>
                            <ul className="space-y-2">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={item.link || "#"}
                                      className="flex items-start space-x-3 group p-2 rounded-xl transition-all duration-200 hover:bg-[#F7F2EA]"
                                    >
                                      <div className="border border-[#E6D3BC] text-[#23483C] bg-[#F7F2EA] rounded-lg flex items-center justify-center size-9 shrink-0 group-hover:bg-[#23483C] group-hover:text-white group-hover:border-[#23483C] transition-colors duration-200 shadow-xs">
                                        <Icon className="h-4.5 w-4.5 flex-none" />
                                      </div>
                                      <div className="leading-5 w-max max-w-[180px]">
                                        <p className="text-xs font-bold text-[#202520] group-hover:text-[#23483C] transition-colors">
                                          {item.label}
                                        </p>
                                        <p className="text-[11px] text-[#687067] group-hover:text-[#202520] transition-colors line-clamp-2 mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownNavigation;
