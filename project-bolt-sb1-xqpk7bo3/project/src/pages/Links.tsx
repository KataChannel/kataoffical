import { useState } from 'react';
import { Link, Plus, ExternalLink } from 'lucide-react';
import AffiliateTable, { StatusBadge } from '../components/AffiliateTable';
import LinkModal from '../components/LinkModal';

interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  destination: string;
  campaign: string;
  clicks: number;
  conversions: number;
  conversionRate: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
}

// Sample data
const mockLinks: AffiliateLink[] = [
  {
    id: '1',
    name: 'Summer Sale Banner',
    url: 'https://go.affiliatehub.com/abc123',
    destination: 'https://example.com/summer-sale',
    campaign: 'Summer Sale 2025',
    clicks: 1245,
    conversions: 86,
    conversionRate: '6.91%',
    status: 'active',
    createdAt: new Date('2025-06-01'),
  },
  {
    id: '2',
    name: 'Product Review Blog',
    url: 'https://go.affiliatehub.com/def456',
    destination: 'https://example.com/product/xyz',
    campaign: 'Product Launch',
    clicks: 895,
    conversions: 37,
    conversionRate: '4.13%',
    status: 'active',
    createdAt: new Date('2025-05-15'),
  },
  {
    id: '3',
    name: 'Email Newsletter',
    url: 'https://go.affiliatehub.com/ghi789',
    destination: 'https://example.com/special-offer',
    campaign: 'Newsletter Q2',
    clicks: 532,
    conversions: 29,
    conversionRate: '5.45%',
    status: 'active',
    createdAt: new Date('2025-04-20'),
  },
  {
    id: '4',
    name: 'Holiday Campaign',
    url: 'https://go.affiliatehub.com/jkl012',
    destination: 'https://example.com/holiday-deals',
    campaign: 'Holiday Season 2024',
    clicks: 2145,
    conversions: 102,
    conversionRate: '4.76%',
    status: 'inactive',
    createdAt: new Date('2024-12-01'),
  },
  {
    id: '5',
    name: 'Black Friday Promo',
    url: 'https://go.affiliatehub.com/mno345',
    destination: 'https://example.com/black-friday',
    campaign: 'Black Friday',
    clicks: 3542,
    conversions: 187,
    conversionRate: '5.28%',
    status: 'inactive',
    createdAt: new Date('2024-11-20'),
  },
  {
    id: '6',
    name: 'Social Media Campaign',
    url: 'https://go.affiliatehub.com/pqr678',
    destination: 'https://example.com/social-promo',
    campaign: 'Social Q2',
    clicks: 1187,
    conversions: 54,
    conversionRate: '4.55%',
    status: 'pending',
    createdAt: new Date('2025-06-10'),
  },
];

const Links = () => {
  const [links, setLinks] = useState<AffiliateLink[]>(mockLinks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<AffiliateLink | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');

  const handleCreateLink = (values: { name: string; destination: string; campaign: string }) => {
    const newLink: AffiliateLink = {
      id: Math.random().toString(36).substring(2, 9),
      name: values.name,
      url: `https://go.affiliatehub.com/${Math.random().toString(36).substring(2, 8)}`,
      destination: values.destination,
      campaign: values.campaign,
      clicks: 0,
      conversions: 0,
      conversionRate: '0.00%',
      status: 'active',
      createdAt: new Date(),
    };
    
    setLinks([newLink, ...links]);
    setIsModalOpen(false);
  };

  const handleEditLink = (link: AffiliateLink) => {
    setCurrentLink(link);
    setIsModalOpen(true);
  };

  const handleUpdateLink = (values: { name: string; destination: string; campaign: string }) => {
    if (!currentLink) return;
    
    setLinks(links.map(link => 
      link.id === currentLink.id 
        ? { ...link, name: values.name, destination: values.destination, campaign: values.campaign }
        : link
    ));
    
    setIsModalOpen(false);
    setCurrentLink(null);
  };

  const handleDeleteLink = (link: AffiliateLink) => {
    if (confirm(`Are you sure you want to delete the link "${link.name}"?`)) {
      setLinks(links.filter(l => l.id !== link.id));
    }
  };

  const filteredLinks = filterStatus === 'all' 
    ? links 
    : links.filter(link => link.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Affiliate Links</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage your affiliate links for various campaigns.
          </p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => {
            setCurrentLink(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} className="mr-1" /> Create Link
        </button>
      </div>

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
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterStatus === 'active' 
                ? 'bg-success text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilterStatus('inactive')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filterStatus === 'inactive' 
                ? 'bg-gray-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inactive
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
        </div>
      </div>

      {/* Links table */}
      <AffiliateTable
        data={filteredLinks}
        columns={[
          {
            header: 'Name',
            accessor: (link) => (
              <div>
                <div className="font-medium text-gray-900">{link.name}</div>
                <div className="text-xs text-gray-500">{link.url}</div>
              </div>
            ),
          },
          {
            header: 'Campaign',
            accessor: 'campaign',
          },
          {
            header: 'Performance',
            accessor: (link) => (
              <div>
                <div className="text-sm">{link.clicks} clicks</div>
                <div className="text-xs text-gray-500">{link.conversions} conv. ({link.conversionRate})</div>
              </div>
            ),
          },
          {
            header: 'Status',
            accessor: (link) => <StatusBadge status={link.status} />,
          },
          {
            header: 'Created',
            accessor: (link) => new Date(link.createdAt).toLocaleDateString(),
          },
        ]}
        pagination={{
          totalItems: filteredLinks.length,
          itemsPerPage: 5,
          currentPage,
          onPageChange: setCurrentPage,
        }}
        actionButtons={{
          edit: true,
          delete: true,
          view: true,
        }}
        onEdit={handleEditLink}
        onDelete={handleDeleteLink}
        onView={(link) => window.open(link.url, '_blank')}
      />

      {/* Create/Edit Link Modal */}
      <LinkModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentLink(null);
        }}
        initialValues={currentLink 
          ? { 
              name: currentLink.name, 
              destination: currentLink.destination, 
              campaign: currentLink.campaign 
            }
          : undefined
        }
        onSubmit={currentLink ? handleUpdateLink : handleCreateLink}
      />
    </div>
  );
};

export default Links;