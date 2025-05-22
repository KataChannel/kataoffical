import { useState } from 'react';
import { 
  Palette, 
  Download, 
  Search, 
  ExternalLink,
  Copy
} from 'lucide-react';

interface Creative {
  id: string;
  title: string;
  type: 'banner' | 'social' | 'email' | 'video';
  format: string;
  size: string;
  imageUrl: string;
  downloadUrl: string;
  embedCode?: string;
}

// Sample data
const mockCreatives: Creative[] = [
  {
    id: '1',
    title: 'Summer Sale Banner',
    type: 'banner',
    format: 'JPG',
    size: '728x90',
    imageUrl: 'https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
    embedCode: '<a href="https://go.affiliate.com/summer"><img src="https://assets.affiliate.com/banners/summer-728x90.jpg" alt="Summer Sale" /></a>',
  },
  {
    id: '2',
    title: 'Product Showcase',
    type: 'banner',
    format: 'PNG',
    size: '300x250',
    imageUrl: 'https://images.pexels.com/photos/4755048/pexels-photo-4755048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
    embedCode: '<a href="https://go.affiliate.com/product"><img src="https://assets.affiliate.com/banners/product-300x250.png" alt="Product Showcase" /></a>',
  },
  {
    id: '3',
    title: 'Social Media Post',
    type: 'social',
    format: 'PNG',
    size: '1080x1080',
    imageUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
  },
  {
    id: '4',
    title: 'Email Header',
    type: 'email',
    format: 'JPG',
    size: '600x200',
    imageUrl: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
    embedCode: '<a href="https://go.affiliate.com/email"><img src="https://assets.affiliate.com/email/header-600x200.jpg" alt="Email Header" /></a>',
  },
  {
    id: '5',
    title: 'Product Video',
    type: 'video',
    format: 'MP4',
    size: '1920x1080',
    imageUrl: 'https://images.pexels.com/photos/7345433/pexels-photo-7345433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
    embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
  },
  {
    id: '6',
    title: 'Special Offer Banner',
    type: 'banner',
    format: 'PNG',
    size: '468x60',
    imageUrl: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
    embedCode: '<a href="https://go.affiliate.com/special"><img src="https://assets.affiliate.com/banners/special-468x60.png" alt="Special Offer" /></a>',
  },
  {
    id: '7',
    title: 'Holiday Campaign',
    type: 'banner',
    format: 'JPG',
    size: '970x250',
    imageUrl: 'https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
    embedCode: '<a href="https://go.affiliate.com/holiday"><img src="https://assets.affiliate.com/banners/holiday-970x250.jpg" alt="Holiday Campaign" /></a>',
  },
  {
    id: '8',
    title: 'Instagram Story Template',
    type: 'social',
    format: 'PNG',
    size: '1080x1920',
    imageUrl: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#',
  },
];

const CreativeCard = ({ creative, onOpenEmbed }: { creative: Creative; onOpenEmbed: (creative: Creative) => void }) => {
  return (
    <div className="card overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-video bg-gray-100 overflow-hidden">
        <img 
          src={creative.imageUrl} 
          alt={creative.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{creative.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            creative.type === 'banner' ? 'bg-blue-100 text-blue-800' : 
            creative.type === 'social' ? 'bg-purple-100 text-purple-800' :
            creative.type === 'email' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {creative.type.charAt(0).toUpperCase() + creative.type.slice(1)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{creative.format} • {creative.size}</p>
        
        <div className="mt-4 flex gap-2">
          <a 
            href={creative.downloadUrl}
            className="flex-1 btn btn-outline flex items-center justify-center text-sm"
            onClick={(e) => {
              e.preventDefault();
              alert(`Downloaded ${creative.title}`);
            }}
          >
            <Download size={16} className="mr-1" />
            Download
          </a>
          
          {creative.embedCode && (
            <button 
              className="flex-1 btn btn-primary flex items-center justify-center text-sm"
              onClick={() => onOpenEmbed(creative)}
            >
              <Copy size={16} className="mr-1" />
              Get Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EmbedCodeModal = ({ 
  creative, 
  isOpen, 
  onClose 
}: { 
  creative: Creative | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen || !creative) return null;
  
  const handleCopy = () => {
    if (creative.embedCode) {
      navigator.clipboard.writeText(creative.embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Embed Code for {creative.title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ExternalLink size={20} />
            </button>
          </div>
          <div className="p-4">
            <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
              <pre className="text-sm whitespace-pre-wrap">{creative.embedCode}</pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleCopy} 
                className="btn btn-primary flex items-center"
              >
                {copied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Creatives = () => {
  const [creatives, setCreatives] = useState<Creative[]>(mockCreatives);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'banner' | 'social' | 'email' | 'video'>('all');
  const [currentCreative, setCurrentCreative] = useState<Creative | null>(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  
  const filteredCreatives = creatives
    .filter(creative => creative.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(creative => selectedType === 'all' || creative.type === selectedType);

  const handleOpenEmbedModal = (creative: Creative) => {
    setCurrentCreative(creative);
    setIsEmbedModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Promotional Creatives</h1>
        <p className="mt-1 text-sm text-gray-500">
          Access ready-to-use banners, images, and promotional materials.
        </p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search creatives..."
            className="pl-10 input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button 
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedType === 'all' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Types
          </button>
          <button 
            onClick={() => setSelectedType('banner')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedType === 'banner' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Banners
          </button>
          <button 
            onClick={() => setSelectedType('social')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedType === 'social' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Social Media
          </button>
          <button 
            onClick={() => setSelectedType('email')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedType === 'email' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Email
          </button>
          <button 
            onClick={() => setSelectedType('video')}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap ${
              selectedType === 'video' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Video
          </button>
        </div>
      </div>

      {/* Creatives grid */}
      {filteredCreatives.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Palette className="text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No creatives found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreatives.map((creative) => (
            <CreativeCard 
              key={creative.id} 
              creative={creative} 
              onOpenEmbed={handleOpenEmbedModal}
            />
          ))}
        </div>
      )}

      {/* Embed code modal */}
      <EmbedCodeModal
        creative={currentCreative}
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
      />
    </div>
  );
};

export default Creatives;