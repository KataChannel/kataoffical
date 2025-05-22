import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export interface PerformanceDataPoint {
  name: string;
  clicks: number;
  conversions: number;
}

interface PerformanceChartProps {
  data: PerformanceDataPoint[];
  title: string;
  description?: string;
  height?: number;
}

const PerformanceChart = ({ 
  data, 
  title, 
  description, 
  height = 300 
}: PerformanceChartProps) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="px-6 pb-6">
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                  padding: '8px 12px',
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => (
                  <span className="text-sm font-medium">{value}</span>
                )}
              />
              <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="conversions" name="Conversions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;