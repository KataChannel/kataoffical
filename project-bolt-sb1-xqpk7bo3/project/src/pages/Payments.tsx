import { useState } from 'react';
import { DollarSign, Download, Filter, CreditCard, Caravan as BankCard, Wallet, PlusCircle } from 'lucide-react';
import AffiliateTable, { StatusBadge } from '../components/AffiliateTable';

interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'bank_transfer' | 'paypal' | 'credit_card' | 'crypto';
  date: Date;
  reference: string;
}

// Sample data
const mockPayments: Payment[] = Array.from({ length: 12 }, (_, i) => ({
  id: `pay-${i + 1}`,
  amount: Math.round(Math.random() * 1000 * 100) / 100,
  status: ['completed', 'completed', 'completed', 'pending', 'failed'][Math.floor(Math.random() * 5)] as 'pending' | 'completed' | 'failed',
  method: ['bank_transfer', 'paypal', 'credit_card', 'crypto'][Math.floor(Math.random() * 4)] as 'bank_transfer' | 'paypal' | 'credit_card' | 'crypto',
  date: new Date(Date.now() - Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000),
  reference: `REF-${Math.floor(Math.random() * 100000)}`,
})).sort((a, b) => b.date.getTime() - a.date.getTime());

const Payments = () => {
  const [payments] = useState<Payment[]>(mockPayments);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');
  
  const filteredPayments = filterStatus === 'all' 
    ? payments 
    : payments.filter(p => p.status === filterStatus);

  const totalEarnings = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, curr) => sum + curr.amount, 0)
    .toFixed(2);
  
  const pendingEarnings = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, curr) => sum + curr.amount, 0)
    .toFixed(2);

  const methodIcons = {
    bank_transfer: <BankCard size={16} className="mr-2" />,
    paypal: <Wallet size={16} className="mr-2" />,
    credit_card: <CreditCard size={16} className="mr-2" />,
    crypto: <DollarSign size={16} className="mr-2" />
  };

  const methodNames = {
    bank_transfer: 'Bank Transfer',
    paypal: 'PayPal',
    credit_card: 'Credit Card',
    crypto: 'Cryptocurrency'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your payment history and manage your payment methods.
        </p>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Available for Withdrawal</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">${totalEarnings}</p>
              <div className="mt-4">
                <button className="btn btn-primary flex items-center">
                  <DollarSign size={16} className="mr-1" />
                  Request Payout
                </button>
              </div>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-success">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-gray-500 text-sm font-medium">Pending Payments</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">${pendingEarnings}</p>
          <p className="mt-2 text-sm text-gray-500">Being processed</p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-gray-500 text-sm font-medium">Next Payout Date</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900">Jun 30, 2025</p>
          <p className="mt-2 text-sm text-gray-500">In 15 days</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <button className="btn btn-outline flex items-center text-sm">
            <PlusCircle size={16} className="mr-1" />
            Add Method
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BankCard className="text-gray-700" />
                <span className="ml-2 font-medium">Bank Account</span>
              </div>
              <span className="badge bg-success/10 text-success">Default</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">**** **** **** 1234</p>
            <div className="mt-3 flex justify-end">
              <button className="text-xs text-primary hover:text-primary-hover">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <Wallet className="text-gray-700" />
              <span className="ml-2 font-medium">PayPal</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">user@example.com</p>
            <div className="mt-3 flex justify-end">
              <button className="text-xs text-primary hover:text-primary-hover">Edit</button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 border-dashed flex items-center justify-center">
            <button className="flex flex-col items-center text-gray-500 hover:text-gray-700">
              <PlusCircle size={24} />
              <span className="mt-2 text-sm">Add Payment Method</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter options */}
      <div className="flex flex-wrap items-center justify-between gap-3">
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
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterStatus === 'completed' 
                  ? 'bg-success text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setFilterStatus('failed')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterStatus === 'failed' 
                  ? 'bg-error text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Failed
            </button>
          </div>
        </div>
        
        <div>
          <button className="btn btn-outline flex items-center">
            <Filter size={16} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Payments table */}
      <AffiliateTable
        data={filteredPayments}
        columns={[
          {
            header: 'Reference',
            accessor: 'reference',
          },
          {
            header: 'Method',
            accessor: (payment) => (
              <div className="flex items-center">
                {methodIcons[payment.method]}
                {methodNames[payment.method]}
              </div>
            ),
          },
          {
            header: 'Amount',
            accessor: (payment) => `$${payment.amount.toFixed(2)}`,
            className: 'font-medium',
          },
          {
            header: 'Status',
            accessor: (payment) => (
              <StatusBadge status={payment.status as any} />
            ),
          },
          {
            header: 'Date',
            accessor: (payment) => new Date(payment.date).toLocaleDateString(),
          },
        ]}
        pagination={{
          totalItems: filteredPayments.length,
          itemsPerPage: 10,
          currentPage,
          onPageChange: setCurrentPage,
        }}
        actionButtons={{
          view: true,
        }}
        onView={(payment) => {
          if (payment.status === 'completed') {
            alert(`Download receipt for payment ${payment.reference}`);
          } else {
            alert(`View details for payment ${payment.reference}`);
          }
        }}
      />
    </div>
  );
};

export default Payments;