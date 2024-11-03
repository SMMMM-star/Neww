import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Activity, Users, Package, AlertTriangle, MessageSquare } from 'lucide-react';
import { getSystemStats, getUserActivities } from '../utils/adminData';
import { useHistoryStore } from '../stores/historyStore';
import { useFeedbackStore } from '../stores/feedbackStore';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const predictions = useHistoryStore((state) => state.predictions);
  const feedback = useFeedbackStore((state) => state.feedback);
  const updateFeedbackStatus = useFeedbackStore((state) => state.updateFeedbackStatus);

  useEffect(() => {
    const fetchData = async () => {
      const statsData = await getSystemStats();
      const activitiesData = await getUserActivities();
      setStats(statsData);
      setActivities(activitiesData);
    };
    fetchData();
  }, [selectedTimeRange]);

  return (
    <div className="min-h-screen bg-transparent text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <select
            className="bg-[#1e3a8a] border border-gray-600 rounded-lg p-2"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Predictions Made</p>
                  <p className="text-2xl font-bold">{stats.totalPredictions}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Total Stock</p>
                  <p className="text-2xl font-bold">{stats.totalStock}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm text-gray-400">Low Stock Alerts</p>
                  <p className="text-2xl font-bold">{stats.lowStockAlerts}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Production Trends</h2>
            <LineChart width={500} height={300} data={stats?.productionTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="production"
                stroke="#3b82f6"
                name="Production"
              />
              <Line
                type="monotone"
                dataKey="demand"
                stroke="#10b981"
                name="Demand"
              />
            </LineChart>
          </div>

          <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 last:border-0 pb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-400">{activity.action}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Prediction History</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {predictions.map((pred) => (
                <div
                  key={pred.id}
                  className="border-b border-gray-700 last:border-0 pb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {pred.state} - {pred.zone}
                      </p>
                      <p className="text-sm text-gray-400">
                        {pred.weapon} - {pred.ammunition}
                      </p>
                      <p className="text-sm text-gray-400">
                        Stock: {pred.currentStock}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(pred.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#112240] p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedback.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-700 last:border-0 pb-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.username}</p>
                      <p className="text-sm text-gray-400">{item.message}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() =>
                          updateFeedbackStatus(
                            item.id,
                            item.status === 'pending' ? 'reviewed' : 'pending'
                          )
                        }
                        className={`ml-2 px-2 py-1 rounded text-xs ${
                          item.status === 'reviewed'
                            ? 'bg-green-600'
                            : 'bg-yellow-600'
                        }`}
                      >
                        {item.status}
                      </button>
                    </div>
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