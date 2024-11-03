import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAuthStore } from '../stores/authStore';
import { useHistoryStore } from '../stores/historyStore';
import { useFeedbackStore } from '../stores/feedbackStore';
import { weapons, ammunition } from '../data/weapons';
import { predictAmmoSupply } from '../utils/predictions';
import Map3D from '../components/Map3D';
import { MessageSquare, AlertCircle } from 'lucide-react';
import { STATES_DATA } from '../data/states';

const ZONES = ['North', 'South', 'East', 'West', 'Central'];

export default function UserDashboard() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedAmmo, setSelectedAmmo] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [feedback, setFeedback] = useState('');

  const { userData } = useAuthStore();
  const addPrediction = useHistoryStore((state) => state.addPrediction);
  const addFeedback = useFeedbackStore((state) => state.addFeedback);

  // Filter compatible ammunition based on selected weapon
  const compatibleAmmo = useMemo(() => {
    if (!selectedWeapon) return ammunition;
    const weapon = weapons.find(w => w.name === selectedWeapon);
    if (!weapon) return ammunition;
    return ammunition.filter(ammo => 
      ammo.compatibleWeapons.includes(weapon.id)
    );
  }, [selectedWeapon]);

  const handlePredict = async () => {
    if (!selectedState || !selectedZone || !selectedWeapon || !selectedAmmo || !currentStock) {
      alert('Please fill in all fields');
      return;
    }

    const result = await predictAmmoSupply(
      selectedState,
      selectedZone,
      parseInt(currentStock)
    );

    setPrediction(result);
    addPrediction({
      state: selectedState,
      zone: selectedZone,
      weapon: selectedWeapon,
      ammunition: selectedAmmo,
      currentStock: parseInt(currentStock),
      prediction: result
    });
  };

  const handleFeedback = () => {
    if (!feedback.trim()) return;
    addFeedback(userData!.id, userData!.username, feedback);
    setFeedback('');
  };

  const weaponTypes = [...new Set(weapons.map(w => w.type))];

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Prediction Parameters</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">State</label>
                <select
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {Object.keys(STATES_DATA).sort().map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Zone</label>
                <select
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                >
                  <option value="">Select Zone</option>
                  {ZONES.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Weapon Type</label>
                <select
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={selectedWeapon}
                  onChange={(e) => {
                    setSelectedWeapon(e.target.value);
                    setSelectedAmmo(''); // Reset ammo when weapon changes
                  }}
                >
                  <option value="">Select Weapon</option>
                  {weaponTypes.map((type) => (
                    <optgroup key={type} label={type}>
                      {weapons
                        .filter(w => w.type === type)
                        .map(weapon => (
                          <option key={weapon.id} value={weapon.name}>
                            {weapon.name} ({weapon.caliber})
                          </option>
                        ))
                      }
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Ammunition</label>
                <select
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={selectedAmmo}
                  onChange={(e) => setSelectedAmmo(e.target.value)}
                  disabled={!selectedWeapon}
                >
                  <option value="">Select Ammunition</option>
                  {compatibleAmmo.map((ammo) => (
                    <option key={ammo.id} value={ammo.name}>
                      {ammo.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Current Stock</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={currentStock}
                  onChange={(e) => setCurrentStock(e.target.value)}
                  placeholder="Enter current stock"
                  min="0"
                />
              </div>

              <button
                onClick={handlePredict}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate Prediction
              </button>
            </div>
          </div>

          <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Interactive Map</h2>
            <Map3D selectedState={selectedState} selectedZone={selectedZone} />
          </div>
        </div>

        {prediction && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Prediction Results</h2>
              <div className="space-y-4 text-white">
                <p>Depletion Date: {prediction.depletionDate}</p>
                <p>Production Rate: {prediction.productionRate} units/day</p>
                <p>Sustainability: {prediction.sustainabilityDays} days</p>
                <p>Depletion Rate: {prediction.depletionRate} units/day</p>
              </div>
            </div>

            <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Forecast Chart</h2>
              <BarChart width={500} height={300} data={prediction.forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="predicted" fill="#3b82f6" name="Predicted" />
                <Bar dataKey="actual" fill="#10b981" name="Actual" />
              </BarChart>
            </div>
          </div>
        )}

        <div className="mt-8 bg-[#112240] p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Feedback</h2>
          <div className="flex gap-4">
            <input
              type="text"
              className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback"
            />
            <button
              onClick={handleFeedback}
              className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}