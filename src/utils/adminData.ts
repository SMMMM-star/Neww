export async function getSystemStats() {
  // Mock data for demonstration
  const today = new Date();
  const productionTrends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(today.getTime() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    production: Math.round(10000 + Math.random() * 5000),
    demand: Math.round(8000 + Math.random() * 6000)
  }));

  return {
    activeUsers: Math.round(50 + Math.random() * 20),
    totalPredictions: Math.round(1000 + Math.random() * 500),
    totalStock: Math.round(100000 + Math.random() * 50000),
    lowStockAlerts: Math.round(Math.random() * 10),
    productionTrends
  };
}

export async function getUserActivities() {
  // Mock user activity data
  const activities = [
    {
      user: 'John Doe',
      action: 'Generated prediction for North Zone',
      timestamp: '2 minutes ago'
    },
    {
      user: 'Jane Smith',
      action: 'Updated stock levels for South Zone',
      timestamp: '15 minutes ago'
    },
    {
      user: 'Mike Johnson',
      action: 'Reviewed production forecast',
      timestamp: '1 hour ago'
    },
    {
      user: 'Sarah Wilson',
      action: 'Generated monthly report',
      timestamp: '2 hours ago'
    },
    {
      user: 'David Brown',
      action: 'Updated zone parameters',
      timestamp: '3 hours ago'
    }
  ];

  return activities;
}