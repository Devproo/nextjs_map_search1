// components/SearchBar.tsx
"use client";
import React, { HtmlHTMLAttributes } from "react";
import { CiSearch } from "react-icons/ci";
import SideNav from "./SideNav";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };
  return (
    <div className="flex gap-3 items-center bg-gray-100 rounded-3xl p-1 cursor-pointer ">
      <div>
        <SideNav />
      </div>

      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="bg-transparent  outline-none w-full text-[17px] text-gray-600 placeholder-gray-400 border-gray-500"
      />

      <CiSearch className="h-10 w-10 cursor-pointer " />
    </div>
  );
}
