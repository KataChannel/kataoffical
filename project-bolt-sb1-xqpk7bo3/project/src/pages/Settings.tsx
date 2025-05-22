import { useState } from 'react';
import { Save, User, Lock, BellRing, CreditCard } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

type TabType = 'profile' | 'password' | 'notifications' | 'payment';

const Settings = () => {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    company: 'Example Inc.',
    website: 'https://www.example.com',
    bio: 'Passionate affiliate marketer with 5+ years of experience in digital marketing and content creation.',
    
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    emailNotifications: true,
    marketingEmails: true,
    smsNotifications: false,
    
    paymentThreshold: '100',
    preferredPaymentMethod: 'bank_transfer',
    paymentSchedule: 'monthly',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'profile') {
        updateUser({
          name: formData.name,
          email: formData.email,
        });
      }
      
      setSaveMessage('Settings saved successfully');
      setIsSaving(false);
      
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your profile, security, and payment preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Sidebar navigation */}
        <nav className="md:col-span-1 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex w-full items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'profile'
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User size={20} className="mr-3" />
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex w-full items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'password'
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Lock size={20} className="mr-3" />
            Change Password
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex w-full items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'notifications'
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BellRing size={20} className="mr-3" />
            Notification Settings
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`flex w-full items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'payment'
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CreditCard size={20} className="mr-3" />
            Payment Preferences
          </button>
        </nav>

        {/* Main content area */}
        <div className="md:col-span-3 card">
          <div className="p-6">
            <form onSubmit={handleSave}>
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b pb-3">Profile Information</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="mt-1 input"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="mt-1 input"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        Company (Optional)
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="mt-1 input"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website (Optional)
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        className="mt-1 input"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio (Optional)
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="mt-1 input"
                      value={formData.bio}
                      onChange={handleInputChange}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
              )}

              {/* Password Settings */}
              {activeTab === 'password' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b pb-3">Change Password</h2>
                  
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      className="mt-1 input"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="mt-1 input"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters and include a number and a symbol.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="mt-1 input"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b pb-3">Notification Settings</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">Receive emails about your account activity and earnings.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketingEmails"
                          name="marketingEmails"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={formData.marketingEmails}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketingEmails" className="font-medium text-gray-700">
                          Marketing Emails
                        </label>
                        <p className="text-gray-500">Receive emails about new features, tips, and promotions.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="smsNotifications"
                          name="smsNotifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                          SMS Notifications
                        </label>
                        <p className="text-gray-500">Receive text messages for important updates and earnings.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Preferences */}
              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b pb-3">Payment Preferences</h2>
                  
                  <div>
                    <label htmlFor="paymentThreshold" className="block text-sm font-medium text-gray-700">
                      Payment Threshold
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="paymentThreshold"
                        id="paymentThreshold"
                        className="input pl-7"
                        placeholder="0.00"
                        min="25"
                        max="1000"
                        step="25"
                        value={formData.paymentThreshold}
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum balance required before a payment is sent. (Minimum: $25)
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="preferredPaymentMethod" className="block text-sm font-medium text-gray-700">
                      Preferred Payment Method
                    </label>
                    <select
                      id="preferredPaymentMethod"
                      name="preferredPaymentMethod"
                      className="mt-1 input"
                      value={formData.preferredPaymentMethod}
                      onChange={handleInputChange}
                    >
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="credit_card">Credit Card Refund</option>
                      <option value="crypto">Cryptocurrency</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="paymentSchedule" className="block text-sm font-medium text-gray-700">
                      Payment Schedule
                    </label>
                    <select
                      id="paymentSchedule"
                      name="paymentSchedule"
                      className="mt-1 input"
                      value={formData.paymentSchedule}
                      onChange={handleInputChange}
                    >
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      How often you want to receive payments once you've reached the threshold.
                    </p>
                  </div>
                </div>
              )}

              {/* Save button with success/error message */}
              <div className="mt-6 flex items-center justify-end">
                {saveMessage && (
                  <p className="mr-4 text-sm text-success">{saveMessage}</p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;