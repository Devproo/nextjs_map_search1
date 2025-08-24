import Image from "next/image";
import React from "react";
import { Category } from "@/shared/Categories";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div
      className="flex  flext-shrink-0 items-center justify-between gap-1 bg-gray-100 p-3 rounded-2xl border-black shadow-2xl  h-10
                 hover:text-black hover:scale transition-all duration-100 cursor-pointer"
    >
      <Image src={category.icon} alt={category.name} width={18} height={18} />
      <h2 className="text-black">{category.name}</h2>
    </div>
  );
}
