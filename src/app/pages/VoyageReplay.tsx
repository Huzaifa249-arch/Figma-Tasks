import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Play, Pause, RotateCcw, FastForward, Ship, Clock, Navigation, Anchor } from 'lucide-react';

export default function VoyageReplay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([35]);
  const [speed, setSpeed] = useState('1x');
  const [selectedVoyage, setSelectedVoyage] = useState('voyage1');

  const voyages = [
    { id: 'voyage1', name: 'MV Pacific Star - Singapore to Rotterdam', date: '2026-02-15 to 2026-03-14', duration: '28 days' },
    { id: 'voyage2', name: 'Ocean Navigator - Los Angeles to Shanghai', date: '2026-03-01 to 2026-03-15', duration: '14 days' },
    { id: 'voyage3', name: 'Atlantic Voyager - Hamburg to New York', date: '2026-03-05 to 2026-03-17', duration: '12 days' },
  ];

  const currentVoyage = voyages.find(v => v.id === selectedVoyage);

  // Simulated voyage events based on progress
  const getVoyageEvents = () => {
    const events = [
      { time: 0, event: 'Departed Singapore Port', lat: 1.2897, lng: 103.8501 },
      { time: 15, event: 'Entered Malacca Strait', lat: 2.1896, lng: 102.2501 },
      { time: 25, event: 'Crossed Indian Ocean', lat: 8.5241, lng: 76.9366 },
      { time: 45, event: 'Suez Canal Transit', lat: 30.5852, lng: 32.2654 },
      { time: 65, event: 'Mediterranean Sea', lat: 35.8989, lng: 14.5146 },
      { time: 85, event: 'Gibraltar Strait', lat: 36.1408, lng: -5.3536 },
      { time: 100, event: 'Arrived Rotterdam Port', lat: 51.9225, lng: 4.4792 },
    ];

    const currentProgress = progress[0];
    return events.filter(e => e.time <= currentProgress);
  };

  const currentEvents = getVoyageEvents();
  const latestEvent = currentEvents[currentEvents.length - 1];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress([0]);
    setIsPlaying(false);
  };

  // Calculate current position for vessel marker
  const vesselPosition = {
    x: 20 + (progress[0] / 100) * 60,
    y: 40 + Math.sin((progress[0] / 100) * Math.PI) * 20,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Voyage Replay</h1>
          <p className="text-slate-600">Replay and analyze historical vessel journeys</p>
        </div>

        {/* Voyage Selection */}
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Ship className="w-6 h-6 text-blue-600" />
              <div className="flex-1">
                <Select value={selectedVoyage} onValueChange={setSelectedVoyage}>
                  <SelectTrigger className="w-full max-w-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voyages.map((voyage) => (
                      <SelectItem key={voyage.id} value={voyage.id}>
                        {voyage.name} ({voyage.duration})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {currentVoyage && (
              <div className="mt-4 flex gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{currentVoyage.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  <span>Duration: {currentVoyage.duration}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map View */}
          <Card className="lg:col-span-2 border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Voyage Route Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-96 relative overflow-hidden border border-blue-100">
                {/* Simplified world map background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 800 400">
                    {/* Ocean waves */}
                    <path d="M 0 200 Q 200 180 400 200 T 800 200" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M 0 220 Q 200 200 400 220 T 800 220" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.3" />
                    <path d="M 0 240 Q 200 220 400 240 T 800 240" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.3" />
                    
                    {/* Simplified continents */}
                    <ellipse cx="100" cy="200" rx="80" ry="60" fill="#94a3b8" opacity="0.3" />
                    <ellipse cx="300" cy="180" rx="100" ry="70" fill="#94a3b8" opacity="0.3" />
                    <ellipse cx="500" cy="220" rx="90" ry="65" fill="#94a3b8" opacity="0.3" />
                    <ellipse cx="650" cy="200" rx="70" ry="50" fill="#94a3b8" opacity="0.3" />
                  </svg>
                </div>

                {/* Route path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d={`M 20 40 Q 30 30, 40 45 T 60 50 T 80 40`}
                    stroke="#3b82f6"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="2,2"
                    opacity="0.6"
                  />
                  <path
                    d={`M 20 40 Q 30 30, 40 45 T 60 50 T 80 40`}
                    stroke="#3b82f6"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray={`${progress[0]} ${100 - progress[0]}`}
                  />
                </svg>

                {/* Vessel marker (animated) */}
                <div
                  className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ left: `${vesselPosition.x}%`, top: `${vesselPosition.y}%` }}
                >
                  <div className="relative">
                    <Ship className="w-6 h-6 text-blue-600 drop-shadow-lg" style={{ transform: 'rotate(45deg)' }} />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {currentVoyage?.name.split(' - ')[0]}
                    </div>
                  </div>
                </div>

                {/* Port markers */}
                <div className="absolute top-[40%] left-[20%] -translate-x-1/2 -translate-y-1/2">
                  <Anchor className="w-5 h-5 text-green-600" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-slate-700 font-medium whitespace-nowrap">
                    Singapore
                  </span>
                </div>
                <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2">
                  <Anchor className="w-5 h-5 text-red-600" />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-slate-700 font-medium whitespace-nowrap">
                    Rotterdam
                  </span>
                </div>
              </div>

              {/* Timeline Slider */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={togglePlay}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button onClick={handleReset} size="sm" variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1">
                    <Slider
                      value={progress}
                      onValueChange={setProgress}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <Select value={speed} onValueChange={setSpeed}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5x">0.5x</SelectItem>
                      <SelectItem value="1x">1x</SelectItem>
                      <SelectItem value="2x">2x</SelectItem>
                      <SelectItem value="4x">4x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span>Day 0</span>
                  <span className="font-medium text-blue-600">Day {Math.round((progress[0] / 100) * 28)}</span>
                  <span>Day 28</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Timeline */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Voyage Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentEvents.map((event, index) => (
                  <div key={index} className="border-l-2 border-blue-600 pl-4 pb-4 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                    <p className="text-sm font-medium text-slate-900">{event.event}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Day {Math.round((event.time / 100) * 28)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Position: {event.lat.toFixed(4)}°, {event.lng.toFixed(4)}°
                    </p>
                  </div>
                ))}
                
                {progress[0] < 100 && (
                  <div className="border-l-2 border-slate-300 border-dashed pl-4 pb-4 relative opacity-50">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-300 rounded-full border-2 border-white" />
                    <p className="text-sm text-slate-400">Upcoming events...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voyage Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">Current Progress</p>
              <p className="text-2xl font-semibold text-slate-900">{progress[0]}%</p>
              <p className="text-sm text-slate-500 mt-1">of total journey</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">Average Speed</p>
              <p className="text-2xl font-semibold text-slate-900">18.5</p>
              <p className="text-sm text-slate-500 mt-1">knots</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">Distance Covered</p>
              <p className="text-2xl font-semibold text-slate-900">{Math.round((progress[0] / 100) * 9850)}</p>
              <p className="text-sm text-slate-500 mt-1">nautical miles</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-1">ETA</p>
              <p className="text-2xl font-semibold text-slate-900">{28 - Math.round((progress[0] / 100) * 28)}</p>
              <p className="text-sm text-slate-500 mt-1">days remaining</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
