import Image from "next/image";
import React from "react";
import { Category } from "@/shared/Data";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div
      className="flex flex-col flext-shrink-0 items-center bg-gray-100 p-3 rounded-2xl  h-16
                 hover:text-black hover:scale-105 transition-all duration-100 cursor-pointer"
    >
      <Image src={category.icon} alt={category.name} width={24} height={24} />
      <h2 className="text-gray-600">{category.name}</h2>
    </div>
  );
}
