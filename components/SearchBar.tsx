// components/SearchBar.tsx
"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex gap-3 bg-gray-100 rounded-xl p-3">
      <CiSearch className="h-10 w-10" />
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none w-full text-[17px] text-gray-600 placeholder-gray-100"
      />
    </div>
  );
}
