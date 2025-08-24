"use client";

import { Driver, DriverListData } from "@/shared/Driver";
import { Star } from "lucide-react";

type DriverListProps = {
  drivers?: Driver[];
};

export default function DriverList({
  drivers = DriverListData,
}: DriverListProps) {
  return (
    <div className="space-y-3">
      {drivers.map((driver) => (
        <div
          key={driver.id}
          className="flex items-center justify-between p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all"
        >
          {/* Left side: Driver info */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{driver.name}</h2>
            <p className="text-sm text-gray-600">
              {driver.carModel} • {driver.carType}
            </p>
          </div>

          {/* Right side: Stats */}
          <div className="flex flex-col text-right">
            <div className="flex items-center justify-end text-yellow-500">
              <Star className="w-4 h-4 mr-1 fill-yellow-500" />
              <span className="text-sm font-medium">{driver.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              {driver.distance} km • {driver.estimatedTime} min
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
