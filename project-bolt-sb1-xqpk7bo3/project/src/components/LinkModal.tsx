import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: {
    name: string;
    destination: string;
    campaign: string;
  };
  onSubmit: (values: { name: string; destination: string; campaign: string }) => void;
}

const LinkModal = ({ isOpen, onClose, initialValues, onSubmit }: LinkModalProps) => {
  const [values, setValues] = useState({
    name: initialValues?.name || '',
    destination: initialValues?.destination || '',
    campaign: initialValues?.campaign || '',
  });

  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
    
    // For demo purposes, generate a fake affiliate link
    const baseUrl = 'https://go.affiliatehub.com/';
    const uniqueId = Math.random().toString(36).substring(2, 8);
    setGeneratedLink(`${baseUrl}${uniqueId}?ref=af123&campaign=${encodeURIComponent(values.campaign)}`);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-medium">
              {initialValues ? 'Edit Affiliate Link' : 'Create Affiliate Link'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Link Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 input"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  placeholder="Summer Sale 2025"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                  Destination URL
                </label>
                <input
                  id="destination"
                  type="url"
                  className="mt-1 input"
                  value={values.destination}
                  onChange={(e) => setValues({ ...values, destination: e.target.value })}
                  placeholder="https://example.com/landing-page"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="campaign" className="block text-sm font-medium text-gray-700">
                  Campaign
                </label>
                <select
                  id="campaign"
                  className="mt-1 input"
                  value={values.campaign}
                  onChange={(e) => setValues({ ...values, campaign: e.target.value })}
                  required
                >
                  <option value="">Select a campaign</option>
                  <option value="summer2025">Summer Sale 2025</option>
                  <option value="holiday2025">Holiday Season 2025</option>
                  <option value="backtoschool">Back to School</option>
                  <option value="blackfriday">Black Friday</option>
                  <option value="general">General</option>
                </select>
              </div>
              
              {generatedLink && (
                <div className="mt-4 rounded-md border border-green-100 bg-green-50 p-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Affiliate Link
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      className="flex-1 rounded-l-md border border-r-0 border-gray-300 bg-white py-2 px-3 text-sm"
                      value={generatedLink}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    This link will track clicks, conversions, and attribute commissions to your account.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {generatedLink ? 'Generate New Link' : 'Generate Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LinkModal;