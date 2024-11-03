import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { weapons, ammunition } from '../data/weapons';

interface ProductionChartProps {
  type: 'weapons' | 'ammunition';
}

export default function ProductionChart({ type }: ProductionChartProps) {
  const data = type === 'weapons' ? weapons : ammunition;
  
  const chartData = data.map(item => ({
    name: item.name,
    production: item.monthlyProduction,
    threshold: item.stockThreshold
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            stroke="#fff"
          />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a365d',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Bar
            dataKey="production"
            name="Monthly Production"
            fill="#3b82f6"
          />
          <Bar
            dataKey="threshold"
            name="Stock Threshold"
            fill="#ef4444"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}