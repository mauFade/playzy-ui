"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FiBell, FiMenu, FiMessageCircle, FiSearch } from "react-icons/fi";
import { SlGameController } from "react-icons/sl";

import Menu from "./Menu";

const Header = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);

  const handleMouseEnter = (tooltip: string) => {
    setHovered(tooltip);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const toggleMenu = () => {
    setMenuIsVisible(!menuIsVisible);
  };

  return (
    <header className="bg-zinc-800 text-zinc-100 h-14 hidden md:flex items-center px-4 shadow-md fixed right-0 left-0">
      <div className="flex items-center space-x-3">
        <button
          className="flex items-center p-3 rounded-3xl hover:bg-zinc-900 transition-colors"
          onMouseEnter={() => handleMouseEnter("Menu")}
          onMouseLeave={handleMouseLeave}
          onClick={toggleMenu}
        >
          <FiMenu className="m-1 text-lg" />
          {hovered === "Menu" && (
            <span className="text-zinc-400 text-base shadow-lg px-1 font-semibold tracking-wide">
              Menu
            </span>
          )}

          {menuIsVisible && <Menu />}
        </button>
      </div>

      <div className="flex-grow"></div>

      <div className="flex items-center space-x-4">
        <SlGameController className="text-teal-500 text-2xl" />

        <div
          className="p-2 hover:bg-zinc-900 rounded-3xl"
          onMouseEnter={() => handleMouseEnter("Busca")}
          onMouseLeave={handleMouseLeave}
        >
          <FiSearch className="text-lg cursor-pointer hover:text-zinc-400 transition-colors" />
          {hovered === "Busca" && (
            <span className="absolute top-14 -translate-x-1/2 bg-zinc-700 text-white text-xs rounded px-2 py-1 shadow-lg">
              Busca
            </span>
          )}
        </div>
        <div className="p-2 hover:bg-zinc-900 rounded-3xl">
          <FiBell className="text-lg cursor-pointer hover:text-zinc-400 transition-colors" />
        </div>
        <div className="p-2 hover:bg-zinc-900 rounded-3xl">
          <FiMessageCircle className="text-lg cursor-pointer hover:text-zinc-400 transition-colors" />
        </div>
        <div className="flex items-center space-x-2 hover:bg-zinc-900 p-2 rounded-3xl cursor-pointer">
          <Image
            src="https://i.pinimg.com/736x/6e/27/e4/6e27e43f5e02954d08e0bd3be06f7242.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={20}
            height={20}
          />
          <span className="text-sm">maucardsm</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
