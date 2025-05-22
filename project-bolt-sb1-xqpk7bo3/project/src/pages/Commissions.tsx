import { useState } from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';
import AffiliateTable from '../components/AffiliateTable';
import LineChart, { ChartDataPoint } from '../components/LineChart';

interface Commission {
  id: string;
  orderId: string;
  amount: number;
  product: string;
  customer: string;
  status: 'pending' | 'approved' | 'rejected';
  date: Date;
}

// Sample data
const mockCommissions: Commission[] = Array.from({ length: 15 }, (_, i) => ({
  id: `comm-${i + 1}`,
  orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
  amount: Math.round(Math.random() * 200 * 100) / 100,
  product: ['Premium Plan', 'Basic Subscription', 'Pro Package', 'Annual Membership', 'Starter Kit'][Math.floor(Math.random() * 5)],
  customer: ['Anonymous', 'Referred Customer', 'Direct Signup'][Math.floor(Math.random() * 3)],
  status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'rejected',
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
})).sort((a, b) => b.date.getTime() - a.date.getTime());

// Sample data for the chart
const generateChartData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    date: month,
    value: Math.floor(Math.random() * 2000) + 500
  }));
};

const Commissions = () => {
  const [commissions] = useState<Commission[]>(mockCommissions);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [chartData] = useState<ChartDataPoint[]>(generateChartData());
  
  const totalEarnings = commissions
    .filter(c => c.status === 'approved')
    .reduce((sum, curr) => sum + curr.amount, 0)
    .toFixed(2);
  
  const pendingEarnings = commissions
    .filter(c => c.status === 'pending')
    .reduce((sum, curr) => sum + curr.amount, 0)
    .toFixed(2);

  const filteredCommissions = filterStatus === 'all' 
    ? commissions 
    : commissions.filter(c => c.status === filterStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Commissions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage your earned commissions from successful referrals.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-2 card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Total Approved Commissions</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">${totalEarnings}</p>
              <div className="mt-4">
                <button className="flex items-center text-sm text-primary font-medium hover:text-primary-hover">
                  View payment history <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-success">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-gray-500 text-sm font-medium">Pending Commissions</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">${pendingEarnings}</p>
          <p className="mt-2 text-sm text-gray-500">Awaiting approval</p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">4.8%</p>
          <p className="mt-2 text-sm text-gray-500">368 of 7,652 visits</p>
        </div>
      </div>

      {/* Chart */}
      <LineChart
        data={chartData}
        title="Commission Earnings Overview"
        description="Monthly breakdown of your commission earnings"
        height={300}
      />

      {/* Filter options */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm font-medium text-gray-700">Filter by:</div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterStatus === 'all' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterStatus === 'pending' 
                ? 'bg-warning text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterStatus === 'approved' 
                ? 'bg-success text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilterStatus('rejected')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterStatus === 'rejected' 
                ? 'bg-error text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Commission table */}
      <AffiliateTable
        data={filteredCommissions}
        columns={[
          {
            header: 'Order ID',
            accessor: 'orderId',
          },
          {
            header: 'Product',
            accessor: 'product',
          },
          {
            header: 'Customer',
            accessor: 'customer',
          },
          {
            header: 'Amount',
            accessor: (commission) => `$${commission.amount.toFixed(2)}`,
            className: 'font-medium',
          },
          {
            header: 'Status',
            accessor: (commission) => (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                commission.status === 'approved' ? 'bg-green-100 text-success' :
                commission.status === 'pending' ? 'bg-yellow-100 text-warning' :
                'bg-red-100 text-error'
              }`}>
                {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
              </span>
            ),
          },
          {
            header: 'Date',
            accessor: (commission) => new Date(commission.date).toLocaleDateString(),
          },
        ]}
        pagination={{
          totalItems: filteredCommissions.length,
          itemsPerPage: 10,
          currentPage,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
};

export default Commissions;