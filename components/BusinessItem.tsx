import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { Business } from "@/shared/Data";

interface BusinessItemProps {
  data: Business;
}

export default function BusinessItem({ data }: BusinessItemProps) {
  return (
    <div className="flex gap-3 py-2 border-b-2 border-purple-100 mb-4 items-center bg-white rounded-lg">
      <Image
        src={data.image}
        alt={data.name}
        width={90}
        height={90}
        className="object-cover rounded-xl h-[100px] w-[100px]"
      />
      <div>
        <h2 className="text-[20px] font-semibold">{data.name}</h2>
        <h2 className="text-[15px] text-gray-500">{data.address}</h2>
        <div className="flex gap-2 items-center">
          <FaStar className="w-5 h-5 text-yellow-500" />
          <h2>{data.rating}</h2>
        </div>
      </div>
    </div>
  );
}
