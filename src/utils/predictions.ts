import * as tf from '@tensorflow/tfjs';
import Papa from 'papaparse';

let model: tf.LayersModel | null = null;
let trainingData: any[] = [];

export async function loadModel() {
  // Load and parse CSV data
  const response = await fetch('/DefenseLedger_AmmoDataset.csv');
  const csv = await response.text();
  const { data } = Papa.parse(csv, { header: true });
  trainingData = data;

  // Create and train model (simplified for demo)
  model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [4], units: 64, activation: 'relu' }),
      tf.layers.dense({ units: 32, activation: 'relu' }),
      tf.layers.dense({ units: 1 })
    ]
  });

  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
}

export async function predictAmmoSupply(
  state: string,
  zone: string,
  currentStock: number
) {
  if (!model) await loadModel();

  // Mock prediction calculations
  const depletionRate = Math.round(currentStock * 0.05);
  const sustainabilityDays = Math.round(currentStock / depletionRate);
  const productionRate = Math.round(depletionRate * 1.2);
  
  const today = new Date();
  const depletionDate = new Date(today.getTime() + sustainabilityDays * 24 * 60 * 60 * 1000);

  // Generate forecast data
  const forecastData = Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    predicted: Math.round(currentStock - depletionRate * (i + 1)),
    actual: Math.round((currentStock - depletionRate * (i + 1)) * (0.9 + Math.random() * 0.2))
  }));

  return {
    depletionDate: depletionDate.toLocaleDateString(),
    productionRate,
    sustainabilityDays,
    depletionRate,
    forecastData
  };
}