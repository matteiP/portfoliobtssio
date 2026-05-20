import React, { useState } from 'react';
import { 
  Network, 
  Server, 
  ShieldAlert, 
  Globe, 
  Cpu, 
  Monitor, 
  Play, 
  CheckCircle2, 
  Info,
  Terminal
} from 'lucide-react';

interface Node {
  id: string;
  name: string;
  ip: string;
  os: string;
  role: string;
  status: 'online' | 'offline' | 'alert';
  services: string[];
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  coords: { x: number; y: number }; // Percentage coords on our SVG grid
}

export default function NetworkSimulator() {
  const [nodes] = useState<Node[]>([
    {
      id: 'wan',
      name: 'Internet / WAN',
      ip: '8.8.8.8 (Public)',
      os: 'Cloud Router OS',
      role: 'Passerelle externe',
      status: 'online',
      services: ['DNS (Google)', 'Web Servers'],
      description: 'Accès au réseau public mondial. Point de sortie de notre infrastructure.',
      icon: Globe,
      color: 'text-cyan-400 border-cyan-500 bg-cyan-950/40',
      coords: { x: 50, y: 15 }
    },
    {
      id: 'firewall',
      name: 'PFSense (Pare-feu)',
      ip: '192.168.1.1 (WAN) / 10.0.0.1 (LAN)',
      os: 'FreeBSD / PFSense 2.7',
      role: 'Sécurité & Filtrage',
      status: 'online',
      services: ['NAT/PAT', 'OpenVPN', 'Squid Proxy', 'Snort IDS'],
      description: 'Gère la sécurité périmétrique, le filtrage web et la détection d’intrusions.',
      icon: ShieldAlert,
      color: 'text-rose-400 border-rose-500 bg-rose-950/40',
      coords: { x: 50, y: 40 }
    },
    {
      id: 'switch',
      name: 'Cisco Catalyst 2960',
      ip: '10.0.0.2 (VLAN Admin)',
      os: 'Cisco iOS 15.2',
      role: 'Commutation (VLANs)',
      status: 'online',
      services: ['STP', 'VLAN Trunking', 'DHCP Snooping'],
      description: 'Switch central de l’infrastructure commutant les paquets au niveau 2 avec segmentation VLAN.',
      icon: Network,
      color: 'text-indigo-400 border-indigo-500 bg-indigo-950/40',
      coords: { x: 50, y: 65 }
    },
    {
      id: 'active-directory',
      name: 'Contrôleur de Domaine AD',
      ip: '10.0.0.10',
      os: 'Windows Server 2022',
      role: 'Gestion d’identité & GPO',
      status: 'online',
      services: ['AD DS', 'DNS Privé', 'DHCP Server', 'Partage NTFS'],
      description: 'Gère la base de données utilisateurs, les ordinateurs du parc et applique les GPO.',
      icon: Server,
      color: 'text-blue-400 border-blue-500 bg-blue-950/40',
      coords: { x: 20, y: 85 }
    },
    {
      id: 'linux-srv',
      name: 'Serveur Web & DNS Linux',
      ip: '10.0.0.20',
      os: 'Debian 12 Bookworm',
      role: 'Hébergement & Services',
      status: 'online',
      services: ['Nginx (HTTPS)', 'BIND9 (DNS Zone)', 'SSH Securisé'],
      description: 'Serveur applicatif hébergeant l’Intranet et le serveur de noms interne.',
      icon: Cpu,
      color: 'text-emerald-400 border-emerald-500 bg-emerald-950/40',
      coords: { x: 50, y: 85 }
    },
    {
      id: 'client-pc',
      name: 'Client PC (User)',
      ip: '10.0.0.101 (DHCP)',
      os: 'Windows 11 Professionnel',
      role: 'Poste utilisateur',
      status: 'online',
      services: ['Accès AD', 'Agent GLPI', 'VPN Client'],
      description: 'Ordinateur d’un collaborateur configuré dans le domaine Active Directory.',
      icon: Monitor,
      color: 'text-purple-400 border-purple-500 bg-purple-950/40',
      coords: { x: 80, y: 85 }
    }
  ]);

  const [selectedNode, setSelectedNode] = useState<Node>(nodes[2]); // Default: Switch
  const [pingSource, setPingSource] = useState<string>('client-pc');
  const [pingDest, setPingDest] = useState<string>('linux-srv');
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingLogs, setPingLogs] = useState<string[]>([]);
  const [animationStep, setAnimationStep] = useState<number>(0);

  const handlePing = () => {
    if (isPinging) return;
    setIsPinging(true);
    setPingLogs([]);
    setAnimationStep(1);

    const src = nodes.find(n => n.id === pingSource);
    const dest = nodes.find(n => n.id === pingDest);

    if (!src || !dest) return;

    // Start logs
    addLog(`C:\\Users\\Administrator> ping ${dest.ip.split(' ')[0]}`);
    
    setTimeout(() => {
      addLog(`Envoi d'une requête 'Ping' sur ${dest.name} [${dest.ip.split(' ')[0]}] avec 32 octets de données:`);
      setAnimationStep(2);
    }, 800);

    // Simulate packet steps
    setTimeout(() => {
      if (pingSource === 'client-pc' && pingDest === 'wan') {
        addLog(`Réponse de 10.0.0.1 (Firewall PFSense) : Temps=1ms TTL=64`);
        addLog(`Réponse de 8.8.8.8 : octets=32 temps=12ms TTL=54`);
      } else {
        addLog(`Réponse de ${dest.ip.split(' ')[0]} : octets=32 temps=2ms TTL=64`);
      }
      setAnimationStep(3);
    }, 1800);

    setTimeout(() => {
      if (pingSource === 'client-pc' && pingDest === 'wan') {
        addLog(`Réponse de 8.8.8.8 : octets=32 temps=10ms TTL=54`);
      } else {
        addLog(`Réponse de ${dest.ip.split(' ')[0]} : octets=32 temps=3ms TTL=64`);
      }
      setAnimationStep(4);
    }, 2500);

    setTimeout(() => {
      // Final stats
      addLog(`\nStatistiques Ping pour ${dest.ip.split(' ')[0]}:`);
      addLog(`    Paquets : envoyés = 2, reçus = 2, perdus = 0 (perte 0%)`);
      addLog(`Durée approximative des boucles en millisecondes :`);
      addLog(`    Minimum = 2ms, Maximum = 12ms, Moyenne = 4ms`);
      
      setIsPinging(false);
      setAnimationStep(0);
    }, 3200);
  };

  const addLog = (msg: string) => {
    setPingLogs(prev => [...prev, msg]);
  };

  // Helper to draw connecting paths
  const getPathCoords = (node1Id: string, node2Id: string) => {
    const n1 = nodes.find(n => n.id === node1Id);
    const n2 = nodes.find(n => n.id === node2Id);
    if (!n1 || !n2) return { x1: 0, y1: 0, x2: 0, y2: 0 };
    return {
      x1: n1.coords.x,
      y1: n1.coords.y,
      x2: n2.coords.x,
      y2: n2.coords.y
    };
  };

  // Determine if a connection line should be animated
  const isLineActive = (n1Id: string, n2Id: string) => {
    if (!isPinging || animationStep === 0) return false;
    
    // Quick rules for our topology paths
    // Path 1: Client PC <-> Switch <-> Linux/AD or Firewall <-> WAN
    const path = [pingSource, 'switch'];
    
    // Add destinations
    if (pingDest === 'active-directory') path.push('active-directory');
    else if (pingDest === 'linux-srv') path.push('linux-srv');
    else if (pingDest === 'firewall' || pingDest === 'wan') {
      path.push('firewall');
      if (pingDest === 'wan') path.push('wan');
    }

    // Verify if n1Id and n2Id are adjacent in path
    const idx1 = path.indexOf(n1Id);
    const idx2 = path.indexOf(n2Id);
    if (idx1 !== -1 && idx2 !== -1 && Math.abs(idx1 - idx2) === 1) {
      return true;
    }
    return false;
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 glow-purple relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Network size={200} className="text-purple-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Side: Topology Map */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold font-mono">Infra-Simulation</span>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Topologie Réseau Interactive <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-mono hidden sm:block bg-slate-950 px-3 py-1 rounded border border-slate-800">
              LAN: 10.0.0.0/24 | WAN: 8.8.8.8
            </div>
          </div>

          <p className="text-sm text-slate-400 mb-6">
            Explorez l'infrastructure en cliquant sur les équipements, ou simulez un test de communication avec le panneau de commande.
          </p>

          {/* SVG Map Container */}
          <div className="relative bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden min-h-[360px] md:min-h-[400px]">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>

              {/* WAN <-> Firewall */}
              {(() => {
                const c = getPathCoords('wan', 'firewall');
                const active = isLineActive('wan', 'firewall');
                return (
                  <>
                    <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                      className={`stroke-slate-800 ${active ? 'stroke-indigo-500/50' : ''}`} strokeWidth="2" />
                    {active && (
                      <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                        stroke="url(#activeGrad)" strokeWidth="4" strokeLinecap="round"
                        className="animate-dash" strokeDasharray="10, 20" />
                    )}
                  </>
                );
              })()}

              {/* Firewall <-> Switch */}
              {(() => {
                const c = getPathCoords('firewall', 'switch');
                const active = isLineActive('firewall', 'switch');
                return (
                  <>
                    <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                      className={`stroke-slate-800 ${active ? 'stroke-indigo-500/50' : ''}`} strokeWidth="2" />
                    {active && (
                      <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                        stroke="url(#activeGrad)" strokeWidth="4" strokeLinecap="round"
                        className="animate-dash" strokeDasharray="10, 20" />
                    )}
                  </>
                );
              })()}

              {/* Switch <-> AD Server */}
              {(() => {
                const c = getPathCoords('switch', 'active-directory');
                const active = isLineActive('switch', 'active-directory');
                return (
                  <>
                    <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                      className={`stroke-slate-800 ${active ? 'stroke-indigo-500/50' : ''}`} strokeWidth="2" />
                    {active && (
                      <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                        stroke="url(#activeGrad)" strokeWidth="4" strokeLinecap="round"
                        className="animate-dash" strokeDasharray="10, 20" />
                    )}
                  </>
                );
              })()}

              {/* Switch <-> Linux Server */}
              {(() => {
                const c = getPathCoords('switch', 'linux-srv');
                const active = isLineActive('switch', 'linux-srv');
                return (
                  <>
                    <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                      className={`stroke-slate-800 ${active ? 'stroke-indigo-500/50' : ''}`} strokeWidth="2" />
                    {active && (
                      <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                        stroke="url(#activeGrad)" strokeWidth="4" strokeLinecap="round"
                        className="animate-dash" strokeDasharray="10, 20" />
                    )}
                  </>
                );
              })()}

              {/* Switch <-> Client PC */}
              {(() => {
                const c = getPathCoords('switch', 'client-pc');
                const active = isLineActive('switch', 'client-pc');
                return (
                  <>
                    <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                      className={`stroke-slate-800 ${active ? 'stroke-indigo-500/50' : ''}`} strokeWidth="2" />
                    {active && (
                      <line x1={`${c.x1}%`} y1={`${c.y1}%`} x2={`${c.x2}%`} y2={`${c.y2}%`} 
                        stroke="url(#activeGrad)" strokeWidth="4" strokeLinecap="round"
                        className="animate-dash" strokeDasharray="10, 20" />
                    )}
                  </>
                );
              })()}
            </svg>

            {/* Nodes Elements */}
            {nodes.map(node => {
              const NodeIcon = node.icon;
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute group transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-300 ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                  style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                >
                  {/* Outer Pulsing Glow on selected/active */}
                  {isSelected && (
                    <div className="absolute inset-0 -m-3 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
                  )}

                  {/* Icon Wrapper */}
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 relative ${
                    isSelected 
                      ? 'border-indigo-400 bg-indigo-900/60 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                      : 'border-slate-800 bg-slate-900 group-hover:border-slate-600'
                  }`}>
                    <NodeIcon className={`w-6 h-6 ${node.color.split(' ')[0]}`} />
                    
                    {/* Status Dot */}
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 bg-emerald-500 shadow-sm"></span>
                  </div>

                  {/* Node Name */}
                  <span className={`text-[11px] mt-2 font-mono font-medium px-2 py-0.5 rounded transition-all duration-300 ${
                    isSelected 
                      ? 'text-indigo-300 bg-indigo-950/80 border border-indigo-900' 
                      : 'text-slate-400 bg-slate-950/60'
                  }`}>
                    {node.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Control Panel & Inspector */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          
          {/* Section 1: Equipment Inspector */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-bold mb-3 flex items-center gap-1.5">
              <Info size={14} className="text-indigo-400" /> Inspecteur d'Équipement
            </h4>

            {/* Inspect Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <selectedNode.icon className={`w-5 h-5 ${selectedNode.color.split(' ')[0]}`} />
                  <span className="font-bold text-white text-base leading-tight">{selectedNode.name}</span>
                </div>
                <div className="mt-1 text-xs text-indigo-400 font-mono">{selectedNode.role}</div>
              </div>

              <div className="border-t border-slate-800/80 pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Adresse IP :</span>
                  <span className="text-slate-300 font-mono text-xs">{selectedNode.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Système :</span>
                  <span className="text-slate-300 font-mono text-xs">{selectedNode.os}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Statut :</span>
                  <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <CheckCircle2 size={12} /> Actif
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-3">
                <div className="text-xs text-slate-500 mb-1.5 font-semibold">Services & Protocoles :</div>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.services.map(srv => (
                    <span key={srv} className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-indigo-300 px-2 py-0.5 rounded">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                {selectedNode.description}
              </p>
            </div>
          </div>

          {/* Section 2: Ping Command Panel */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 flex-1 flex flex-col">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-bold mb-3 flex items-center gap-1.5">
              <Terminal size={14} className="text-purple-400" /> Ping Simulator
            </h4>

            {/* Inputs */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Source :</label>
                <select 
                  value={pingSource} 
                  onChange={(e) => setPingSource(e.target.value)}
                  disabled={isPinging}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded p-2 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="client-pc">Client PC (10.0.0.101)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono text-slate-500 block mb-1">Destination :</label>
                <select 
                  value={pingDest} 
                  onChange={(e) => setPingDest(e.target.value)}
                  disabled={isPinging}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded p-2 focus:border-indigo-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="linux-srv">Linux Web Server (10.0.0.20)</option>
                  <option value="active-directory">AD Domain Controller (10.0.0.10)</option>
                  <option value="firewall">PFSense Gateway (10.0.0.1)</option>
                  <option value="wan">Public DNS / WAN (8.8.8.8)</option>
                </select>
              </div>

              <button
                onClick={handlePing}
                disabled={isPinging || pingSource === pingDest}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-mono font-semibold py-2 px-3 text-xs rounded flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200"
              >
                <Play size={12} className={isPinging ? 'animate-spin' : ''} />
                {isPinging ? 'Ping en cours...' : 'Envoyer Ping ICMP'}
              </button>
            </div>

            {/* Console Log */}
            <div className="flex-1 bg-black border border-slate-800 rounded p-3 font-mono text-[10px] text-emerald-400 overflow-y-auto max-h-[140px] leading-normal scrollbar-none flex flex-col gap-1">
              {pingLogs.length === 0 ? (
                <span className="text-slate-600 italic">En attente de commande...</span>
              ) : (
                pingLogs.map((log, i) => (
                  <div key={i} className="whitespace-pre-wrap">{log}</div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Styled animation for packet dashes in SVG */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: dash 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
