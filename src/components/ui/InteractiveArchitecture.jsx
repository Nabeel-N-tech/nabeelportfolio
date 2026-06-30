"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Terminal, 
  ArrowRightLeft, 
  Activity, 
  ShieldCheck, 
  RefreshCw 
} from "lucide-react";

export default function InteractiveArchitecture() {
  const [logs, setLogs] = useState([
    { time: "--:--:--", text: "Architecture monitoring system online. Ready for inputs.", type: "sys" }
  ]);
  const [activeFlow, setActiveFlow] = useState(null); // 'api', 'db', 'celery'
  const [nodeStates, setNodeStates] = useState({
    client: "IDLE", // IDLE, SENDING, SUCCESS
    api: "IDLE",    // IDLE, AUTHING, PROCESSING, SUCCESS
    db: "IDLE",     // IDLE, LOCKING, QUERYING, SUCCESS
    celery: "IDLE"  // IDLE, QUEUED, PROCESSING, SUCCESS
  });
  
  // Dynamic metrics
  const [metrics, setMetrics] = useState({
    latency: 14.8,
    dbPool: 2,
    queueLoad: 0,
    cpu: 8.2
  });

  const logsEndRef = useRef(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Fluctuating background telemetry metrics
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeFlow === null) {
        setMetrics(prev => ({
          latency: parseFloat((12.5 + Math.random() * 4).toFixed(1)),
          dbPool: 2,
          queueLoad: 0,
          cpu: parseFloat((6 + Math.random() * 3).toFixed(1))
        }));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [activeFlow]);

  const addLog = (text, type = "info") => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev.slice(-14), { time: timestamp, text, type }]);
  };

  // 1. Simulate API Request Flow
  const triggerApiRequest = async () => {
    if (activeFlow) return;
    setActiveFlow("api");
    setNodeStates(prev => ({ ...prev, client: "SENDING", api: "AUTHING" }));
    
    // Telemetry updates
    setMetrics(prev => ({ ...prev, cpu: 18.5, latency: 115 }));
    addLog("[Client UI] Triggered action: Fetch Projects Catalog", "sys");
    
    // Phase 1: Client ➜ API
    await new Promise(r => setTimeout(r, 600));
    setNodeStates(prev => ({ ...prev, api: "PROCESSING" }));
    addLog("GET /api/v1/projects/ - Authenticating JWT Session...", "api");

    // Phase 2: Processing inside API
    await new Promise(r => setTimeout(r, 600));
    addLog("JWT Verified. Identity verified: nabeeln1230@gmail.com", "api");
    setMetrics(prev => ({ ...prev, latency: 124 }));

    // Phase 3: DB Query under the hood (implicit)
    await new Promise(r => setTimeout(r, 400));
    setNodeStates(prev => ({ ...prev, api: "SUCCESS", client: "SUCCESS" }));
    addLog("API: Query successful. Output compressed via gzip.", "api");
    addLog("CLIENT: 200 OK - Received 3 project objects (124ms)", "client");

    // Reset Flow
    await new Promise(r => setTimeout(r, 1200));
    setNodeStates({ client: "IDLE", api: "IDLE", db: "IDLE", celery: "IDLE" });
    setActiveFlow(null);
  };

  // 2. Simulate Database ACID Transaction
  const triggerDbQuery = async () => {
    if (activeFlow) return;
    setActiveFlow("db");
    setNodeStates(prev => ({ ...prev, api: "PROCESSING", db: "LOCKING" }));
    
    // Telemetry updates
    setMetrics(prev => ({ ...prev, cpu: 22.4, dbPool: 3 }));
    addLog("[API Router] Request received to update booking slot", "sys");
    addLog("API: Beginning atomic database transaction block...", "api");

    // Phase 1: API ➜ DB Lock
    await new Promise(r => setTimeout(r, 500));
    setNodeStates(prev => ({ ...prev, db: "QUERYING" }));
    addLog("POSTGRESQL: Acquire Row Lock: SELECT * FROM bookings FOR UPDATE", "db");

    // Phase 2: DB Write & Commit
    await new Promise(r => setTimeout(r, 700));
    setMetrics(prev => ({ ...prev, dbPool: 4, latency: 45 }));
    addLog("POSTGRESQL: Commit transaction - Update success, release lock.", "db");

    // Phase 3: DB ➜ API
    await new Promise(r => setTimeout(r, 400));
    setNodeStates(prev => ({ ...prev, api: "SUCCESS", db: "SUCCESS" }));
    addLog("API: Transaction committed successfully (45ms).", "api");

    // Reset Flow
    await new Promise(r => setTimeout(r, 1200));
    setNodeStates({ client: "IDLE", api: "IDLE", db: "IDLE", celery: "IDLE" });
    setActiveFlow(null);
  };

  // 3. Simulate Celery Async Task Queue
  const triggerCeleryJob = async () => {
    if (activeFlow) return;
    setActiveFlow("celery");
    setNodeStates(prev => ({ ...prev, api: "PROCESSING", celery: "QUEUED" }));

    // Telemetry updates
    setMetrics(prev => ({ ...prev, cpu: 14.1, queueLoad: 1 }));
    addLog("[API Router] Client requested heavy PDF Resume download", "sys");
    addLog("API: File compilation requested. Offloading to Celery Worker...", "api");

    // Phase 1: API ➜ Redis ➜ Celery
    await new Promise(r => setTimeout(r, 600));
    setNodeStates(prev => ({ ...prev, celery: "PROCESSING" }));
    addLog("REDIS: Task published: compile_pdf_document [id: f891-23d9]", "sys");
    addLog("CELERY WORKER: Dequeued task. Starting PDF layout engine...", "celery");

    // Phase 2: Celery processes task
    await new Promise(r => setTimeout(r, 1200));
    setMetrics(prev => ({ ...prev, cpu: 28.5 }));
    addLog("CELERY WORKER: Document built (24 pages). Compressing buffers...", "celery");

    // Phase 3: Finish Task
    await new Promise(r => setTimeout(r, 600));
    setNodeStates(prev => ({ ...prev, api: "SUCCESS", celery: "SUCCESS" }));
    setMetrics(prev => ({ ...prev, queueLoad: 0 }));
    addLog("CELERY WORKER: Task compile_pdf_document success. Output cached.", "celery");
    addLog("API: Async job complete. Client notified via Webhook.", "api");

    // Reset Flow
    await new Promise(r => setTimeout(r, 1200));
    setNodeStates({ client: "IDLE", api: "IDLE", db: "IDLE", celery: "IDLE" });
    setActiveFlow(null);
  };

  return (
    <div className="relative w-full max-w-[480px] select-none group font-sans">
      {/* Visual background glows */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-purple-600/5 to-cyan-500/10 blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none" />

      {/* Styled animation Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes laser-api {
          0% { stroke-dashoffset: 80; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes laser-db {
          0% { stroke-dashoffset: 120; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes laser-celery {
          0% { stroke-dashoffset: 160; }
          100% { stroke-dashoffset: 0; }
        }
        .laser-api-active {
          stroke-dasharray: 8 16;
          animation: laser-api 1.2s linear infinite;
        }
        .laser-db-active {
          stroke-dasharray: 8 16;
          animation: laser-db 1.2s linear infinite;
        }
        .laser-celery-active {
          stroke-dasharray: 8 16;
          animation: laser-celery 1.5s linear infinite;
        }
      `}} />

      {/* Main Glassmorphic Panel Container */}
      <div className="relative w-full rounded-2xl bg-[#0c0c0c]/85 border border-white/[0.06] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden backdrop-blur-xl group-hover:border-primary-accent/30 transition-all duration-500">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(239,68,68,0.2)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.2)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.2)]" />
          </div>
          <div className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            Full-Stack Pipeline Visualizer
          </div>
          <div className="text-[9px] font-mono text-emerald-500/90 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
            LIVE TELEMETRY
          </div>
        </div>

        {/* 2x2 Network Node Diagram Grid */}
        <div className="p-6 relative z-10 grid grid-cols-2 gap-x-12 gap-y-16">
          
          {/* SVG Pipelines Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="api-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="db-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="celery-gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            
            {/* 1. Client to API (Horizontal top flow) */}
            <path d="M 120,62 L 320,62" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
            <path 
              d={activeFlow === 'api' ? "M 320,62 L 120,62" : "M 120,62 L 320,62"} 
              fill="none" 
              stroke="url(#api-gradient)" 
              strokeWidth="2" 
              className={activeFlow === 'api' ? "laser-api-active" : "hidden"} 
            />

            {/* 2. API to DB (Vertical right flow) */}
            <path d="M 320,86 L 320,230" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
            <path 
              d="M 320,86 L 320,230" 
              fill="none" 
              stroke="url(#db-gradient)" 
              strokeWidth="2" 
              className={activeFlow === 'db' ? "laser-db-active" : "hidden"} 
            />

            {/* 3. API to Celery (Diagonal flow top-right to bottom-left) */}
            <path d="M 320,86 L 120,230" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
            <path 
              d="M 320,86 L 120,230" 
              fill="none" 
              stroke="url(#celery-gradient)" 
              strokeWidth="2" 
              className={activeFlow === 'celery' ? "laser-celery-active" : "hidden"} 
            />
          </svg>

          {/* Node 1: React Client (Top Left) */}
          <div className="relative z-10 flex justify-center">
            <ArchitectureNode 
              icon={<Code2 className="w-4 h-4" />}
              title="React Client"
              tech="Frontend / Single-Page App"
              status={nodeStates.client}
              statusColor={nodeStates.client === "SENDING" ? "text-blue-400" : "text-zinc-500"}
              glow="group-hover:border-blue-500/20"
            />
          </div>

          {/* Node 2: Django REST (Top Right) */}
          <div className="relative z-10 flex justify-center">
            <ArchitectureNode 
              icon={<Server className="w-4 h-4" />}
              title="Django REST"
              tech="API Server / Python Auth"
              status={nodeStates.api}
              statusColor={
                nodeStates.api === "AUTHING" ? "text-yellow-400" :
                nodeStates.api === "PROCESSING" ? "text-purple-400" : "text-zinc-500"
              }
              glow="group-hover:border-purple-500/20"
            />
          </div>

          {/* Node 4: Celery Worker (Bottom Left) */}
          <div className="relative z-10 flex justify-center">
            <ArchitectureNode 
              icon={<Cpu className="w-4 h-4" />}
              title="Celery Worker"
              tech="Redis Queue / Async Task"
              status={nodeStates.celery}
              statusColor={nodeStates.celery === "PROCESSING" ? "text-pink-400 animate-pulse" : "text-zinc-500"}
              glow="group-hover:border-pink-500/20"
              progressBar={nodeStates.celery === "PROCESSING"}
            />
          </div>

          {/* Node 3: PostgreSQL DB (Bottom Right) */}
          <div className="relative z-10 flex justify-center">
            <ArchitectureNode 
              icon={<Database className="w-4 h-4" />}
              title="PostgreSQL"
              tech="Relational Database / Locks"
              status={nodeStates.db}
              statusColor={
                nodeStates.db === "LOCKING" ? "text-yellow-400 animate-pulse" :
                nodeStates.db === "QUERYING" ? "text-emerald-400" : "text-zinc-500"
              }
              glow="group-hover:border-emerald-500/20"
            />
          </div>

        </div>

        {/* Console Action Buttons Control Panel */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#060606] border-y border-white/[0.04] text-[9px] font-mono">
          <span className="text-zinc-600 mr-2 uppercase tracking-wider font-bold">Trigger flow:</span>
          <div className="flex flex-wrap gap-2 flex-1">
            <button 
              disabled={activeFlow !== null}
              onClick={triggerApiRequest} 
              className={`px-2.5 py-1 rounded border transition-all cursor-pointer font-bold ${
                activeFlow === "api" 
                  ? "bg-blue-500/25 border-blue-400 text-blue-300"
                  : activeFlow !== null 
                    ? "opacity-30 border-zinc-800 text-zinc-600 bg-transparent"
                    : "border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10"
              }`}
            >
              [API_REQUEST]
            </button>
            <button 
              disabled={activeFlow !== null}
              onClick={triggerDbQuery} 
              className={`px-2.5 py-1 rounded border transition-all cursor-pointer font-bold ${
                activeFlow === "db" 
                  ? "bg-emerald-500/25 border-emerald-400 text-emerald-300"
                  : activeFlow !== null 
                    ? "opacity-30 border-zinc-800 text-zinc-600 bg-transparent"
                    : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              [DB_TRANSACTION]
            </button>
            <button 
              disabled={activeFlow !== null}
              onClick={triggerCeleryJob} 
              className={`px-2.5 py-1 rounded border transition-all cursor-pointer font-bold ${
                activeFlow === "celery" 
                  ? "bg-pink-500/25 border-pink-400 text-pink-300"
                  : activeFlow !== null 
                    ? "opacity-30 border-zinc-800 text-zinc-600 bg-transparent"
                    : "border-pink-500/20 bg-pink-500/5 text-pink-400 hover:bg-pink-500/10"
              }`}
            >
              [DISPATCH_TASK]
            </button>
          </div>
          <button 
            onClick={() => setLogs([{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), text: "Telemetry log buffer cleared.", type: "sys" }])} 
            className="px-2 py-1 text-zinc-600 hover:text-white transition-colors"
          >
            [CLR]
          </button>
        </div>

        {/* Live Logs Terminal Screen + Metrics Panel */}
        <div className="bg-[#050505]/95 p-4 font-mono text-[9px] flex h-[150px]">
          
          {/* Logs scroll console */}
          <div className="w-[70%] pr-4 border-r border-white/[0.04] flex flex-col justify-start">
            <div className="uppercase tracking-widest text-zinc-600 font-bold mb-1.5 border-b border-white/[0.03] pb-1 flex justify-between items-center">
              <span>Pipeline Telemetry Logs</span>
              <span className="text-[7px] text-zinc-500 bg-zinc-900 border border-white/[0.03] px-1 rounded animate-pulse">RUNNING</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-1 scrollbar-none">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-1.5 items-start">
                  <span className="text-zinc-700">[{log.time}]</span>
                  <span className={`
                    ${log.type === 'sys' ? 'text-amber-500' : ''}
                    ${log.type === 'client' ? 'text-blue-500' : ''}
                    ${log.type === 'api' ? 'text-purple-500' : ''}
                    ${log.type === 'db' ? 'text-emerald-500' : ''}
                    ${log.type === 'celery' ? 'text-pink-500' : ''}
                  `}>❯</span>
                  <span className="text-zinc-400 break-all">{log.text}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

          {/* Metrics indicators */}
          <div className="w-[30%] pl-4 flex flex-col justify-between py-1">
            <div className="uppercase tracking-widest text-zinc-600 font-bold mb-1 border-b border-white/[0.03] pb-1">
              Stats Panel
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-2 text-zinc-500 font-mono">
              <div className="flex justify-between items-center">
                <span>LATENCY:</span> 
                <span className={activeFlow ? "text-yellow-400 font-bold" : "text-zinc-300"}>
                  {metrics.latency}ms
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>DB POOL:</span> 
                <span className={metrics.dbPool > 2 ? "text-emerald-400 font-bold" : "text-zinc-300"}>
                  {metrics.dbPool}/10
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Q LOAD:</span> 
                <span className={metrics.queueLoad > 0 ? "text-pink-400 font-bold animate-pulse" : "text-zinc-300"}>
                  {metrics.queueLoad} task
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>CPU TEMP:</span> 
                <span className="text-zinc-300">{metrics.cpu}%</span>
              </div>
            </div>
            
            {/* System Status Indicators */}
            <div className="pt-2 border-t border-white/[0.03] flex items-center justify-between text-[7px] text-zinc-600">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-blue-500" /> JWT: SAFE
              </span>
              <span className="flex items-center gap-1 animate-pulse">
                <RefreshCw className="w-2.5 h-2.5 text-emerald-500" /> SSL: ACTIVE
              </span>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}

// Sub-component: Glowing Architecture Node Card
function ArchitectureNode({ icon, title, tech, status, statusColor, glow, progressBar = false }) {
  const isOnline = status === "SUCCESS" || status === "IDLE";
  const isPending = !isOnline;

  return (
    <div className={`w-[190px] rounded-xl p-3.5 bg-[#090909]/95 border border-white/[0.04] transition-all duration-300 flex flex-col items-start gap-1 relative overflow-hidden group/node ${glow}`}>
      
      {/* Background ambient lighting on active states */}
      {status !== "IDLE" && (
        <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" />
      )}
      
      {/* Title block */}
      <div className="flex items-center justify-between w-full relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-zinc-400 group-hover/node:text-white transition-colors duration-300">
            {icon}
          </div>
          <span className="text-[11px] font-sans font-bold text-white tracking-tight">{title}</span>
        </div>
        
        {/* Node status dot indicator */}
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          status === "SUCCESS" ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : 
          status === "IDLE" ? "bg-emerald-500/30" : "bg-yellow-400 animate-ping"
        }`} />
      </div>

      {/* Tech Description */}
      <span className="text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-wider relative z-10">
        {tech}
      </span>

      {/* Status reading */}
      <div className="mt-2.5 w-full flex items-center justify-between relative z-10">
        <span className="text-[8px] font-mono text-zinc-500 uppercase">Status:</span>
        <span className={`text-[8.5px] font-mono font-bold uppercase ${statusColor}`}>
          {status}
        </span>
      </div>

      {/* Mini loading progress bar (Celery processing state) */}
      {progressBar && (
        <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden mt-1.5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500" 
          />
        </div>
      )}
    </div>
  );
}
