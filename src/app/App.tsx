import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { StatCard } from "./components/StatCard";
import { PortChart } from "./components/PortChart";
import { AlertsPanel } from "./components/AlertsPanel";
import { WaitTimeTrendChart } from "./components/WaitTimeTrendChart";
import { ArrivalsVsDeparturesChart } from "./components/ArrivalsVsDeparturesChart";
import { CongestionIndicator } from "./components/CongestionIndicator";
import { Clock, Ship, Anchor, Activity } from "lucide-react";

export default function App() {
  return (
    <div className="flex h-screen bg-[#050914] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Average Wait Time"
                value="32 min"
                subtitle="Down from 45 min yesterday"
                icon={Clock}
                trend={{ value: "28%", positive: true }}
              />
              <StatCard
                title="Arrivals Today"
                value="24"
                subtitle="3 vessels in queue"
                icon={Ship}
                trend={{ value: "12%", positive: true }}
              />
              <StatCard
                title="Departures Today"
                value="19"
                subtitle="5 scheduled for tonight"
                icon={Anchor}
                trend={{ value: "5%", positive: false }}
              />
              <StatCard
                title="Congestion Level"
                value="Medium"
                subtitle="68% capacity utilized"
                icon={Activity}
              />
            </div>

            {/* Chart and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Section - Takes 2 columns */}
              <div className="lg:col-span-2">
                <PortChart />
              </div>

              {/* Alerts Panel - Takes 1 column */}
              <div>
                <AlertsPanel />
              </div>
            </div>

            {/* Analytics Section - Wait Time Trends & Arrivals/Departures */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WaitTimeTrendChart />
              <ArrivalsVsDeparturesChart />
            </div>

            {/* Congestion Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Placeholder for future components or expand existing chart */}
                <div className="bg-[#0f1629] border border-[#1e293b] rounded-lg p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Port Operations Overview
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
                      <p className="text-slate-400 text-xs mb-2">
                        Active Berths
                      </p>
                      <p className="text-teal-400 text-2xl font-semibold">
                        14/20
                      </p>
                    </div>
                    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
                      <p className="text-slate-400 text-xs mb-2">
                        Avg Turnaround
                      </p>
                      <p className="text-blue-400 text-2xl font-semibold">
                        4.2h
                      </p>
                    </div>
                    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
                      <p className="text-slate-400 text-xs mb-2">
                        Cargo Handled
                      </p>
                      <p className="text-amber-400 text-2xl font-semibold">
                        2.4k
                      </p>
                    </div>
                    <div className="bg-[#0a0f1e] border border-[#1e293b] rounded-lg p-4 text-center">
                      <p className="text-slate-400 text-xs mb-2">
                        Efficiency
                      </p>
                      <p className="text-green-400 text-2xl font-semibold">
                        92%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <CongestionIndicator />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}