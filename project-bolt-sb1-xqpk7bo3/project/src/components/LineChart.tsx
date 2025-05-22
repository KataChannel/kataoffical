import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export interface ChartDataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  title: string;
  description?: string;
  dataKey?: string;
  height?: number;
  color?: string;
  formatYAxis?: (value: number) => string;
}

const LineChart = ({ 
  data, 
  title, 
  description, 
  dataKey = 'value', 
  height = 300, 
  color = '#3B82F6',
  formatYAxis = (value) => `$${value}`
}: LineChartProps) => {
  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="px-6 pb-6">
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={formatYAxis}
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
                formatter={(value) => [`$${value}`, 'Earnings']}
                labelFormatter={(label) => label}
              />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2} 
                activeDot={{ r: 6, strokeWidth: 0 }}
                dot={false}
                fill="url(#colorGradient)"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChart;