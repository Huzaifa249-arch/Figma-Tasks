import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Ship, Search, MapPin, Navigation, Filter } from 'lucide-react';

export default function LiveMap() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVessel, setSelectedVessel] = useState<number | null>(null);

  const vessels = [
    { id: 1, name: 'MV Pacific Star', type: 'Container', flag: '🇸🇬', lat: 1.3521, lng: 103.8198, speed: 18.5, heading: 285, status: 'In Transit' },
    { id: 2, name: 'Ocean Navigator', type: 'Tanker', flag: '🇺🇸', lat: 34.0522, lng: -118.2437, speed: 0, heading: 0, status: 'Docked' },
    { id: 3, name: 'Atlantic Voyager', type: 'Bulk Carrier', flag: '🇬🇧', lat: 40.7128, lng: -74.0060, speed: 21.3, heading: 92, status: 'In Transit' },
    { id: 4, name: 'Baltic Express', type: 'Container', flag: '🇩🇪', lat: 51.5074, lng: -0.1278, speed: 0.2, heading: 180, status: 'Anchored' },
    { id: 5, name: 'Nordic Star', type: 'RoRo', flag: '🇳🇴', lat: 59.9139, lng: 10.7522, speed: 15.8, heading: 45, status: 'In Transit' },
    { id: 6, name: 'Mediterranean Pride', type: 'Cruise', flag: '🇮🇹', lat: 41.9028, lng: 12.4964, speed: 12.3, heading: 135, status: 'In Transit' },
    { id: 7, name: 'Asia Trader', type: 'Container', flag: '🇨🇳', lat: 31.2304, lng: 121.4737, speed: 19.2, heading: 220, status: 'In Transit' },
    { id: 8, name: 'Gulf Carrier', type: 'Tanker', flag: '🇦🇪', lat: 25.2048, lng: 55.2708, speed: 0, heading: 0, status: 'Docked' },
  ];

  const filteredVessels = vessels.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Live Vessel Map</h1>
          <p className="text-slate-600">Real-time global vessel tracking and monitoring</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map View */}
          <Card className="lg:col-span-2 border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Global Vessel Positions
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-100 rounded-lg h-[600px] relative overflow-hidden border border-blue-200">
                {/* Simplified world map background */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full opacity-30" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                    {/* Grid lines */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 30}
                        x2="1000"
                        y2={i * 30}
                        stroke="#0ea5e9"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    ))}
                    {Array.from({ length: 30 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 33.33}
                        y1="0"
                        x2={i * 33.33}
                        y2="600"
                        stroke="#0ea5e9"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    ))}
                    
                    {/* Simplified continents */}
                    <ellipse cx="150" cy="280" rx="100" ry="80" fill="#94a3b8" opacity="0.4" />
                    <ellipse cx="300" cy="250" rx="120" ry="90" fill="#94a3b8" opacity="0.4" />
                    <ellipse cx="500" cy="300" rx="140" ry="100" fill="#94a3b8" opacity="0.4" />
                    <ellipse cx="700" cy="280" rx="110" ry="85" fill="#94a3b8" opacity="0.4" />
                    <ellipse cx="850" cy="320" rx="90" ry="70" fill="#94a3b8" opacity="0.4" />
                  </svg>
                </div>

                {/* Vessel markers */}
                {filteredVessels.map((vessel, index) => {
                  // Map lat/lng to pixel coordinates (simplified)
                  const x = ((vessel.lng + 180) / 360) * 100;
                  const y = ((90 - vessel.lat) / 180) * 100;
                  
                  const isSelected = selectedVessel === vessel.id;
                  
                  return (
                    <div
                      key={vessel.id}
                      className={`absolute cursor-pointer transition-all ${isSelected ? 'z-20' : 'z-10'}`}
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                      onClick={() => setSelectedVessel(vessel.id)}
                    >
                      <div className="relative">
                        {/* Vessel marker */}
                        <div className={`${isSelected ? 'scale-150' : 'scale-100'} transition-transform`}>
                          <Ship 
                            className={`w-5 h-5 ${
                              vessel.status === 'In Transit' ? 'text-blue-600' :
                              vessel.status === 'Docked' ? 'text-green-600' :
                              'text-orange-600'
                            } drop-shadow-lg ${vessel.speed > 0 ? 'animate-pulse' : ''}`}
                            style={{ transform: `rotate(${vessel.heading}deg)` }}
                          />
                        </div>

                        {/* Tooltip */}
                        {isSelected && (
                          <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white border border-slate-200 rounded-lg shadow-xl p-3 w-56 z-30">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold text-slate-900 text-sm">{vessel.name}</p>
                                <p className="text-xs text-slate-500">{vessel.type} {vessel.flag}</p>
                              </div>
                              <Badge 
                                variant={vessel.status === 'In Transit' ? 'default' : 'secondary'}
                                className={vessel.status === 'Docked' ? 'bg-green-100 text-green-800' : ''}
                              >
                                {vessel.status}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs text-slate-600">
                              <p>Speed: {vessel.speed} knots</p>
                              <p>Heading: {vessel.heading}°</p>
                              <p>Position: {vessel.lat.toFixed(4)}°, {vessel.lng.toFixed(4)}°</p>
                            </div>
                          </div>
                        )}

                        {/* Pulse effect for moving vessels */}
                        {vessel.speed > 0 && !isSelected && (
                          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map Legend */}
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600">In Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-green-600" />
                  <span className="text-slate-600">Docked</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-orange-600" />
                  <span className="text-slate-600">Anchored</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vessel List */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="w-5 h-5 text-blue-600" />
                Active Vessels
              </CardTitle>
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search vessels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredVessels.map((vessel) => (
                  <div
                    key={vessel.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedVessel === vessel.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedVessel(vessel.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{vessel.name}</p>
                        <p className="text-xs text-slate-500">{vessel.type} {vessel.flag}</p>
                      </div>
                      <Badge 
                        variant={vessel.status === 'In Transit' ? 'default' : 'secondary'}
                        className={vessel.status === 'Docked' ? 'bg-green-100 text-green-800' : vessel.status === 'Anchored' ? 'bg-orange-100 text-orange-800' : ''}
                      >
                        {vessel.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        <span>{vessel.speed} kts</span>
                      </div>
                      <div>
                        <span>HDG: {vessel.heading}°</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Showing {filteredVessels.length} of {vessels.length} vessels
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">Total Vessels</p>
              <p className="text-3xl font-semibold text-slate-900">{vessels.length}</p>
              <p className="text-sm text-green-600 mt-1">+5 today</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">In Transit</p>
              <p className="text-3xl font-semibold text-slate-900">
                {vessels.filter(v => v.status === 'In Transit').length}
              </p>
              <p className="text-sm text-blue-600 mt-1">75% of fleet</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">Docked</p>
              <p className="text-3xl font-semibold text-slate-900">
                {vessels.filter(v => v.status === 'Docked').length}
              </p>
              <p className="text-sm text-green-600 mt-1">At ports</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">Avg Speed</p>
              <p className="text-3xl font-semibold text-slate-900">
                {(vessels.reduce((sum, v) => sum + v.speed, 0) / vessels.length).toFixed(1)}
              </p>
              <p className="text-sm text-slate-500 mt-1">knots</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
