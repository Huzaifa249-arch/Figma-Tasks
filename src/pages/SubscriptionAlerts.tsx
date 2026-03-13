import { useState } from 'react';
import { Bell, Ship, Plus, Trash2, Check, MapPin, Navigation, Anchor } from 'lucide-react';

interface Subscription {
  id: number;
  vesselName: string;
  vesselType: string;
  alerts: string[];
}

export default function SubscriptionAlerts() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 1,
      vesselName: 'MSC Gulsun',
      vesselType: 'Container Ship',
      alerts: ['Port Arrival', 'Speed Change', 'Route Deviation'],
    },
    {
      id: 2,
      vesselName: 'Atlantic Star',
      vesselType: 'Oil Tanker',
      alerts: ['Port Arrival', 'Anchoring'],
    },
  ]);

  const availableVessels = [
    { name: 'Pacific Queen', type: 'Bulk Carrier' },
    { name: 'Nordic Wave', type: 'Container Ship' },
    { name: 'Eastern Dragon', type: 'Cargo Ship' },
    { name: 'Mediterranean Voyager', type: 'Cruise Ship' },
  ];

  const alertTypes = [
    { id: 'arrival', name: 'Port Arrival', icon: Anchor, description: 'Notify when vessel arrives at port' },
    { id: 'departure', name: 'Port Departure', icon: Navigation, description: 'Notify when vessel departs from port' },
    { id: 'speed', name: 'Speed Change', icon: Navigation, description: 'Alert on significant speed changes' },
    { id: 'route', name: 'Route Deviation', icon: MapPin, description: 'Alert when vessel deviates from route' },
    { id: 'anchor', name: 'Anchoring', icon: Anchor, description: 'Notify when vessel drops anchor' },
    { id: 'zone', name: 'Zone Entry', icon: MapPin, description: 'Alert when entering specific zones' },
  ];

  const handleAlertToggle = (alertName: string) => {
    setSelectedAlerts((prev) =>
      prev.includes(alertName) ? prev.filter((a) => a !== alertName) : [...prev, alertName]
    );
  };

  const handleAddSubscription = () => {
    if (selectedVessel && selectedAlerts.length > 0) {
      const vessel = availableVessels.find((v) => v.name === selectedVessel);
      if (vessel) {
        const newSubscription: Subscription = {
          id: Date.now(),
          vesselName: vessel.name,
          vesselType: vessel.type,
          alerts: selectedAlerts,
        };
        setSubscriptions([...subscriptions, newSubscription]);
        setShowAddModal(false);
        setSelectedVessel('');
        setSelectedAlerts([]);
      }
    }
  };

  const handleRemoveSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A4B6E] mb-2">Alerts & Subscriptions</h1>
          <p className="text-gray-600">Manage vessel tracking and notification preferences</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#0A4B6E] to-[#1E88B5] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Subscription</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-lg text-white">
          <Ship className="h-8 w-8 mb-2 text-blue-100" />
          <p className="text-sm text-blue-100 mb-1">Tracked Vessels</p>
          <p className="text-3xl font-bold">{subscriptions.length}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 shadow-lg text-white">
          <Bell className="h-8 w-8 mb-2 text-emerald-100" />
          <p className="text-sm text-emerald-100 mb-1">Active Alerts</p>
          <p className="text-3xl font-bold">
            {subscriptions.reduce((acc, sub) => acc + sub.alerts.length, 0)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg text-white">
          <Navigation className="h-8 w-8 mb-2 text-orange-100" />
          <p className="text-sm text-orange-100 mb-1">Alert Types</p>
          <p className="text-3xl font-bold">{alertTypes.length}</p>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#0A4B6E]">Your Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Subscriptions Yet</h3>
            <p className="text-gray-600 mb-6">Start tracking vessels by adding your first subscription</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0A4B6E] to-[#1E88B5] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              <Plus className="h-5 w-5" />
              Add Subscription
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-[#0A4B6E] to-[#1E88B5] p-3 rounded-xl">
                      <Ship className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A4B6E] text-lg">{subscription.vesselName}</h3>
                      <p className="text-sm text-gray-600">{subscription.vesselType}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSubscription(subscription.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">ACTIVE ALERTS</p>
                  <div className="flex flex-wrap gap-2">
                    {subscription.alerts.map((alert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-[#0A4B6E] px-3 py-1 rounded-full text-xs font-semibold border border-cyan-200"
                      >
                        <Bell className="h-3 w-3" />
                        {alert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Alert Types */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-[#0A4B6E] mb-4">Available Alert Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alertTypes.map((alertType) => {
            const Icon = alertType.icon;
            return (
              <div
                key={alertType.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-[#1E88B5] hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-[#0A4B6E]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{alertType.name}</h3>
                    <p className="text-xs text-gray-600">{alertType.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0A4B6E] to-[#1E88B5] p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">Add Vessel Subscription</h2>
              <p className="text-cyan-100 text-sm mt-1">Select a vessel and configure alert preferences</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Vessel Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Vessel</label>
                <select
                  value={selectedVessel}
                  onChange={(e) => setSelectedVessel(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E88B5] focus:border-transparent transition bg-white"
                >
                  <option value="">Choose a vessel...</option>
                  {availableVessels.map((vessel, index) => (
                    <option key={index} value={vessel.name}>
                      {vessel.name} - {vessel.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Alert Configuration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Configure Alert Preferences
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {alertTypes.map((alertType) => {
                    const Icon = alertType.icon;
                    const isSelected = selectedAlerts.includes(alertType.name);
                    return (
                      <button
                        key={alertType.id}
                        onClick={() => handleAlertToggle(alertType.name)}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-[#1E88B5] bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? 'bg-gradient-to-br from-[#0A4B6E] to-[#1E88B5]' : 'bg-gray-100'
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`font-semibold ${isSelected ? 'text-[#0A4B6E]' : 'text-gray-800'}`}
                            >
                              {alertType.name}
                            </h3>
                            {isSelected && (
                              <div className="bg-[#1E88B5] p-1 rounded-full">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{alertType.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedVessel('');
                    setSelectedAlerts([]);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubscription}
                  disabled={!selectedVessel || selectedAlerts.length === 0}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold transition ${
                    selectedVessel && selectedAlerts.length > 0
                      ? 'bg-gradient-to-r from-[#0A4B6E] to-[#1E88B5] text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
