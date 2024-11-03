import React from 'react';
import { Shield, Crosshair } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="relative">
        <Shield className="h-10 w-10 text-blue-500" />
        <Crosshair className="h-6 w-6 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h1 className="ml-3 text-2xl font-black tracking-wider text-white uppercase bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        DEFENSE LEDGER
      </h1>
    </div>
  );
}