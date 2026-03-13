import { useState } from 'react';
import { MapPin, Ship, Navigation, Info, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export default function MapView() {
  const [selectedVessel, setSelectedVessel] = useState<number | null>(null);

  const vessels = [
    {
      id: 1,
      name: 'MSC Gulsun',
      type: 'Container Ship',
      position: { lat: 31.2304, lng: 121.4737 },
      speed: '18.5 knots',
      heading: '045°',
      status: 'In Transit',
      destination: 'Rotterdam',
    },
    {
      id: 2,
      name: 'Atlantic Star',
      type: 'Oil Tanker',
      position: { lat: 25.7617, lng: -80.1918 },
      speed: '0 knots',
      heading: '-',
      status: 'Anchored',
      destination: 'Miami',
    },
    {
      id: 3,
      name: 'Pacific Queen',
      type: 'Bulk Carrier',
      position: { lat: 1.3521, lng: 103.8198 },
      speed: '14.2 knots',
      heading: '180°',
      status: 'In Transit',
      destination: 'Singapore',
    },
    {
      id: 4,
      name: 'Nordic Wave',
      type: 'Container Ship',
      position: { lat: 51.5074, lng: -0.1278 },
      speed: '0 knots',
      heading: '-',
      status: 'Docked',
      destination: 'London',
    },
    {
      id: 5,
      name: 'Eastern Dragon',
      type: 'Cargo Ship',
      position: { lat: 22.3193, lng: 114.1694 },
      speed: '16.8 knots',
      heading: '270°',
      status: 'In Transit',
      destination: 'Hong Kong',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-emerald-500';
      case 'Docked':
        return 'bg-blue-500';
      case 'Anchored':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A4B6E] mb-2">Map View</h1>
        <p className="text-gray-600">Track vessel positions and routes in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Map Controls */}
            <div className="bg-gradient-to-r from-[#0A4B6E] to-[#1E88B5] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-300" />
                <span className="text-white font-semibold">Interactive Map</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                  <ZoomIn className="h-4 w-4 text-white" />
                </button>
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                  <ZoomOut className="h-4 w-4 text-white" />
                </button>
                <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                  <Maximize className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Map Display (Simulated) */}
            <div className="relative bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 h-[600px]">
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(#0A4B6E 1px, transparent 1px), linear-gradient(90deg, #0A4B6E 1px, transparent 1px)',
                  backgroundSize: '50px 50px',
                }}
              />

              {/* Vessel Markers */}
              {vessels.map((vessel, index) => (
                <div
                  key={vessel.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 3) * 20}%`,
                  }}
                  onClick={() => setSelectedVessel(vessel.id)}
                >
                  {/* Vessel Marker */}
                  <div
                    className={`${getStatusColor(
                      vessel.status
                    )} p-3 rounded-full shadow-lg group-hover:scale-125 transition-transform`}
                  >
                    <Ship className="h-5 w-5 text-white" />
                  </div>

                  {/* Vessel Label */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs font-semibold text-[#0A4B6E]">{vessel.name}</p>
                    <p className="text-xs text-gray-600">{vessel.speed}</p>
                  </div>

                  {/* Route Line */}
                  {vessel.status === 'In Transit' && (
                    <div
                      className="absolute top-1/2 left-1/2 h-0.5 bg-emerald-500 opacity-50"
                      style={{
                        width: '100px',
                        transformOrigin: 'left center',
                        transform: `rotate(${index * 30}deg)`,
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <h4 className="text-sm font-bold text-[#0A4B6E] mb-3">Status Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-gray-700">In Transit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-700">Docked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-xs text-gray-700">Anchored</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vessel Details Sidebar */}
        <div className="space-y-4">
          {/* Info Card */}
          <div className="bg-gradient-to-br from-[#0A4B6E] to-[#1E88B5] rounded-2xl p-6 shadow-lg text-white">
            <Info className="h-8 w-8 mb-3 text-cyan-300" />
            <h3 className="text-lg font-bold mb-2">Map Information</h3>
            <p className="text-cyan-100 text-sm">
              Click on vessel markers to view detailed information. Vessels in transit show route lines.
            </p>
          </div>

          {/* Selected Vessel Details */}
          {selectedVessel ? (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-[#0A4B6E] mb-4">Vessel Details</h3>
              {vessels
                .filter((v) => v.id === selectedVessel)
                .map((vessel) => (
                  <div key={vessel.id} className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className={`${getStatusColor(vessel.status)} p-3 rounded-xl`}>
                        <Ship className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{vessel.name}</h4>
                        <p className="text-sm text-gray-600">{vessel.type}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            vessel.status === 'In Transit'
                              ? 'bg-emerald-100 text-emerald-700'
                              : vessel.status === 'Docked'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {vessel.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Position</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {vessel.position.lat.toFixed(4)}° N, {Math.abs(vessel.position.lng).toFixed(4)}°{' '}
                          {vessel.position.lng >= 0 ? 'E' : 'W'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Speed</p>
                          <p className="text-sm font-semibold text-gray-800">{vessel.speed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Heading</p>
                          <p className="text-sm font-semibold text-gray-800">{vessel.heading}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Destination</p>
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-[#1E88B5]" />
                          <p className="text-sm font-semibold text-gray-800">{vessel.destination}</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-[#0A4B6E] to-[#1E88B5] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow mt-4">
                      Track Vessel
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <Ship className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">Select a vessel marker on the map to view details</p>
            </div>
          )}

          {/* Active Vessels Counter */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Active Vessels on Map</h4>
            <p className="text-3xl font-bold text-[#0A4B6E]">{vessels.length}</p>
            <p className="text-xs text-gray-500 mt-1">Currently tracked</p>
          </div>
        </div>
      </div>
    </div>
  );
}
