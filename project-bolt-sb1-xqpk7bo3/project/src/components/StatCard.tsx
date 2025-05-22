import { ReactNode } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeTimeframe?: string;
}

const StatCard = ({ title, value, icon, change = 0, changeTimeframe = 'since last month' }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="card p-6 transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold">{value}</p>
        {change !== 0 && (
          <p className={`mt-2 flex items-center text-sm ${isPositive ? 'text-success' : 'text-error'}`}>
            {isPositive ? (
              <ArrowUp size={16} className="mr-1" />
            ) : (
              <ArrowDown size={16} className="mr-1" />
            )}
            <span>{Math.abs(change)}%</span>
            <span className="ml-1 text-gray-500">{changeTimeframe}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;