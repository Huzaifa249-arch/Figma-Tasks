import { useState } from 'react';
import { Search, Filter, Ship, MapPin, Navigation, Activity } from 'lucide-react';

export default function VesselSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [vesselType, setVesselType] = useState('');
  const [flag, setFlag] = useState('');
  const [cargoType, setCargoType] = useState('');

  const vessels = [
    {
      id: 1,
      name: 'MSC Gulsun',
      imo: 'IMO9811000',
      type: 'Container Ship',
      flag: 'Liberia',
      cargo: 'Containers',
      position: '31.2304° N, 121.4737° E',
      speed: '18.5 knots',
      status: 'In Transit',
      destination: 'Rotterdam',
      eta: '2026-03-15 14:30',
    },
    {
      id: 2,
      name: 'Atlantic Star',
      imo: 'IMO9765432',
      type: 'Oil Tanker',
      flag: 'Panama',
      cargo: 'Crude Oil',
      position: '25.7617° N, 80.1918° W',
      speed: '0 knots',
      status: 'Anchored',
      destination: 'Miami',
      eta: '-',
    },
    {
      id: 3,
      name: 'Pacific Queen',
      imo: 'IMO9823456',
      type: 'Bulk Carrier',
      flag: 'Singapore',
      cargo: 'Iron Ore',
      position: '1.3521° N, 103.8198° E',
      speed: '14.2 knots',
      status: 'In Transit',
      destination: 'Singapore',
      eta: '2026-03-11 20:15',
    },
    {
      id: 4,
      name: 'Nordic Wave',
      imo: 'IMO9734567',
      type: 'Container Ship',
      flag: 'Norway',
      cargo: 'Containers',
      position: '51.5074° N, 0.1278° W',
      speed: '0 knots',
      status: 'Docked',
      destination: 'London',
      eta: '-',
    },
    {
      id: 5,
      name: 'Eastern Dragon',
      imo: 'IMO9845678',
      type: 'Cargo Ship',
      flag: 'China',
      cargo: 'General Cargo',
      position: '22.3193° N, 114.1694° E',
      speed: '16.8 knots',
      status: 'In Transit',
      destination: 'Hong Kong',
      eta: '2026-03-12 08:45',
    },
    {
      id: 6,
      name: 'Mediterranean Voyager',
      imo: 'IMO9756789',
      type: 'Cruise Ship',
      flag: 'Italy',
      cargo: 'Passengers',
      position: '41.9028° N, 12.4964° E',
      speed: '12.3 knots',
      status: 'In Transit',
      destination: 'Rome',
      eta: '2026-03-11 16:00',
    },
  ];

  const filteredVessels = vessels.filter((vessel) => {
    const matchesSearch =
      searchQuery === '' ||
      vessel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vessel.imo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = vesselType === '' || vessel.type === vesselType;
    const matchesFlag = flag === '' || vessel.flag === flag;
    const matchesCargo = cargoType === '' || vessel.cargo === cargoType;

    return matchesSearch && matchesType && matchesFlag && matchesCargo;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Docked':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Anchored':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A4B6E] mb-2">Vessel Search</h1>
        <p className="text-gray-600">Search and filter vessels by various parameters</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search Bar */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Vessel
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Enter vessel name or IMO number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E88B5] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Vessel Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vessel Type
            </label>
            <div className="relative">
              <select
                value={vesselType}
                onChange={(e) => setVesselType(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E88B5] focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">All Types</option>
                <option value="Container Ship">Container Ship</option>
                <option value="Oil Tanker">Oil Tanker</option>
                <option value="Bulk Carrier">Bulk Carrier</option>
                <option value="Cargo Ship">Cargo Ship</option>
                <option value="Cruise Ship">Cruise Ship</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Flag Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flag
            </label>
            <div className="relative">
              <select
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E88B5] focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">All Flags</option>
                <option value="Liberia">Liberia</option>
                <option value="Panama">Panama</option>
                <option value="Singapore">Singapore</option>
                <option value="Norway">Norway</option>
                <option value="China">China</option>
                <option value="Italy">Italy</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Cargo Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cargo Type
            </label>
            <div className="relative">
              <select
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E88B5] focus:border-transparent transition appearance-none bg-white"
              >
                <option value="">All Cargo</option>
                <option value="Containers">Containers</option>
                <option value="Crude Oil">Crude Oil</option>
                <option value="Iron Ore">Iron Ore</option>
                <option value="General Cargo">General Cargo</option>
                <option value="Passengers">Passengers</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-[#0A4B6E]">{filteredVessels.length}</span> of{' '}
            <span className="font-semibold">{vessels.length}</span> vessels
          </p>
        </div>
      </div>

      {/* Vessel List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredVessels.map((vessel) => (
          <div
            key={vessel.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Vessel Info */}
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-[#0A4B6E] to-[#1E88B5] p-4 rounded-xl flex-shrink-0">
                  <Ship className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#0A4B6E]">{vessel.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        vessel.status
                      )}`}
                    >
                      {vessel.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">IMO:</span> {vessel.imo}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span> {vessel.type}
                    </p>
                    <p>
                      <span className="font-medium">Flag:</span> {vessel.flag}
                    </p>
                    <p>
                      <span className="font-medium">Cargo:</span> {vessel.cargo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vessel Details */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MapPin className="h-4 w-4 text-[#1E88B5] mr-1" />
                    <p className="text-xs text-gray-500">Position</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{vessel.position}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Activity className="h-4 w-4 text-[#1E88B5] mr-1" />
                    <p className="text-xs text-gray-500">Speed</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{vessel.speed}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Navigation className="h-4 w-4 text-[#1E88B5] mr-1" />
                    <p className="text-xs text-gray-500">Destination</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{vessel.destination}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <p className="text-xs text-gray-500">ETA</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    {vessel.eta === '-' ? '-' : new Date(vessel.eta).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVessels.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <Ship className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Vessels Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
