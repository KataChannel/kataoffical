import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Calendar,
  ChevronDown
} from 'lucide-react';
import StatCard from '../components/StatCard';
import LineChart, { ChartDataPoint } from '../components/LineChart';
import PerformanceChart, { PerformanceDataPoint } from '../components/PerformanceChart';
import { useUser } from '../contexts/UserContext';

// Generate sample data for the earnings chart
const generateEarningsData = (): ChartDataPoint[] => {
  const dates = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return dates.map((date, index) => ({
    date,
    value: Math.floor(Math.random() * 1000) + 500
  }));
};

// Generate sample data for performance chart
const generatePerformanceData = (): PerformanceDataPoint[] => {
  return [
    { name: 'Product A', clicks: 1200, conversions: 120 },
    { name: 'Product B', clicks: 850, conversions: 95 },
    { name: 'Product C', clicks: 1450, conversions: 180 },
    { name: 'Product D', clicks: 950, conversions: 85 },
    { name: 'Product E', clicks: 700, conversions: 70 }
  ];
};

const Overview = () => {
  const { user } = useUser();
  const [earningsData, setEarningsData] = useState<ChartDataPoint[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  useEffect(() => {
    // Simulate data loading
    setEarningsData(generateEarningsData());
    setPerformanceData(generatePerformanceData());
  }, [timeframe]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user.name}. Here's what's happening with your affiliate program.
          </p>
        </div>
        <div className="flex">
          <div className="relative">
            <button className="btn btn-outline flex items-center">
              <Calendar size={16} className="mr-2" />
              {timeframe === 'weekly' ? 'This Week' : timeframe === 'monthly' ? 'This Month' : 'This Year'}
              <ChevronDown size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Earnings"
          value={`$${user.earnings.total.toLocaleString()}`}
          icon={<DollarSign size={20} />}
          change={15.3}
        />
        <StatCard
          title="Clicks"
          value="8,946"
          icon={<Users size={20} />}
          change={8.1}
        />
        <StatCard
          title="Conversions"
          value="368"
          icon={<ShoppingCart size={20} />}
          change={-2.5}
        />
        <StatCard
          title="Conversion Rate"
          value="4.11%"
          icon={<TrendingUp size={20} />}
          change={0.8}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LineChart
          data={earningsData}
          title="Earnings Overview"
          description="Your earnings over time with monthly breakdown"
          height={320}
        />
        
        <PerformanceChart
          data={performanceData}
          title="Top Performing Products"
          description="Products with highest clicks and conversions"
          height={320}
        />
      </div>

      {/* Recent activity & coming soon features */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                <div className="bg-primary/10 p-2 rounded-full text-primary mr-3">
                  {i % 2 === 0 ? <ShoppingCart size={16} /> : <DollarSign size={16} />}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {i % 2 === 0 
                      ? `New conversion from campaign "Summer Sale"`
                      : `Commission of $${(Math.random() * 100).toFixed(2)} has been approved`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {i * 2} hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-4">Coming Soon</h3>
          <div className="space-y-3">
            <div className="rounded-md bg-purple-50 p-3 border border-purple-100">
              <p className="text-sm font-medium text-purple-800">Mobile App</p>
              <p className="text-xs text-purple-600 mt-1">Track your performance on the go with our upcoming mobile app.</p>
            </div>
            <div className="rounded-md bg-blue-50 p-3 border border-blue-100">
              <p className="text-sm font-medium text-blue-800">Advanced Analytics</p>
              <p className="text-xs text-blue-600 mt-1">Deeper insights with demographic and behavioral data.</p>
            </div>
            <div className="rounded-md bg-teal-50 p-3 border border-teal-100">
              <p className="text-sm font-medium text-teal-800">API Access</p>
              <p className="text-xs text-teal-600 mt-1">Direct integration with your own systems and dashboards.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;