"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FiBell, FiMessageCircle, FiSearch } from "react-icons/fi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const Header = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleMouseEnter = (tooltip: string) => {
    setHovered(tooltip);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <header className="bg-zinc-800 text-zinc-100 h-14 hidden md:flex items-center px-4 shadow-md fixed right-0 left-0">
      <div className="flex items-center space-x-3"></div>

      <div className="flex-grow"></div>

      <div className="flex items-center space-x-4">
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
        <div
          className="p-2 hover:bg-zinc-900 rounded-3xl"
          onMouseEnter={() => handleMouseEnter("Notificações")}
          onMouseLeave={handleMouseLeave}
        >
          <FiBell className="text-lg cursor-pointer hover:text-zinc-400 transition-colors" />
          {hovered === "Notificações" && (
            <span className="absolute top-14 -translate-x-1/2 bg-zinc-700 text-white text-xs rounded px-2 py-1 shadow-lg">
              Notificações
            </span>
          )}
        </div>
        <div
          className="p-2 hover:bg-zinc-900 rounded-3xl"
          onMouseEnter={() => handleMouseEnter("Mensagens")}
          onMouseLeave={handleMouseLeave}
        >
          <FiMessageCircle className="text-lg cursor-pointer hover:text-zinc-400 transition-colors" />
          {hovered === "Mensagens" && (
            <span className="absolute top-14 -translate-x-1/2 bg-zinc-700 text-white text-xs rounded px-2 py-1 shadow-lg">
              Mensagens
            </span>
          )}
        </div>
        <div
          className="flex items-center space-x-2 hover:bg-zinc-900 p-2 rounded-3xl cursor-pointer"
          onClick={onOpen}
        >
          <Image
            src="https://i.pinimg.com/736x/6e/27/e4/6e27e43f5e02954d08e0bd3be06f7242.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={20}
            height={20}
          />
          <span className="text-sm">maucardsm</span>
        </div>

        {/* Modal */}
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top"
            className="bg-white mt-10"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Menu
                  </ModalHeader>
                  <ModalBody></ModalBody>
                  <ModalFooter>
                    <Button
                      variant="shadow"
                      onPress={onClose}
                      className="bg-red-500"
                    >
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header;
