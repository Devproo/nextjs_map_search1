"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Top bar with menu button */}
      <div className="p-4 bg-gray-100  text-gray-600 flex items-center ">
        <button onClick={() => setIsOpen(true)}>
          <FiMenu size={18} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-1/4 rounded-xl bg-gray-100 shadow-lg z-50 
          transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col p-4 space-y-3">
          <a href="#" className="hover:text-gray-600">
            Home
          </a>
          <a href="#" className="hover:text-gray-600">
            About
          </a>
          <a href="#" className="hover:text-gray-600">
            Services
          </a>
          <a href="#" className="hover:text-gray-600">
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
}
