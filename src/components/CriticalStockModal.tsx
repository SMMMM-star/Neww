import React from 'react';
import { X } from 'lucide-react';
import { weapons, ammunition } from '../data/weapons';

interface CriticalStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: {
    [key: string]: number;
  };
}

export default function CriticalStockModal({ isOpen, onClose, stocks }: CriticalStockModalProps) {
  if (!isOpen) return null;

  const criticalWeapons = weapons.filter(
    weapon => (stocks[weapon.id] || 0) < weapon.stockThreshold
  );

  const criticalAmmo = ammunition.filter(
    ammo => (stocks[ammo.id] || 0) < ammo.stockThreshold
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#112240] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Critical Stock Levels</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Weapons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criticalWeapons.map(weapon => (
                <div
                  key={weapon.id}
                  className="bg-[#1a365d] p-4 rounded-lg flex items-center space-x-4"
                >
                  <img
                    src={weapon.image}
                    alt={weapon.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-white font-medium">{weapon.name}</h4>
                    <p className="text-red-400">
                      Current: {stocks[weapon.id] || 0} / Threshold: {weapon.stockThreshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Ammunition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {criticalAmmo.map(ammo => (
                <div
                  key={ammo.id}
                  className="bg-[#1a365d] p-4 rounded-lg flex items-center space-x-4"
                >
                  <img
                    src={ammo.image}
                    alt={ammo.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-white font-medium">{ammo.name}</h4>
                    <p className="text-red-400">
                      Current: {stocks[ammo.id] || 0} / Threshold: {ammo.stockThreshold}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}