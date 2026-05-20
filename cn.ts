export interface Project {
  id: string;
  title: string;
  category: 'reseau' | 'systeme' | 'cybersecurite' | 'web';
  description: string;
  longDescription: string;
  technologies: string[];
  architecture?: string[];
  commands?: string[];
  results: string[];
  icon: string;
}

export interface Stage {
  id: string;
  company: string;
  period: string;
  role: string;
  logoColor: string;
  description: string;
  missions: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string;
  details: string[];
  category: 'networks' | 'systems' | 'security' | 'virtualization';
}

export interface Education {
  id: string;
  degree: string;
  specialization: string;
  school: string;
  location: string;
  period: string;
  description: string;
  skillsAcquired: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  description: string;
  skills: string[];
}

export const EDUCATION_DATA: Education[] = [
  {
    id: 'bac-sti2d',
    degree: 'Baccalauréat STI2D',
    specialization: 'Option SIN (Systèmes d’Information et Numérique)',
    school: 'Lycée Jules Ferry',
    location: 'Cannes, France',
    period: '2020 - 2023',
    description: 'Première approche des systèmes d’information, initiation à l’algorithmique, à la programmation (C++, HTML/CSS, Python) et aux principes fondamentaux des réseaux informatiques.',
    skillsAcquired: ['Bases de l’algorithmique', 'Projets d’objets connectés (IoT)', 'Réseaux locaux & Protocoles IP', 'Électronique numérique']
  },
  {
    id: 'bts-sio',
    degree: 'BTS SIO (Services Informatiques aux Organisations)',
    specialization: 'Option SISR (Solutions d’Infrastructure, Systèmes et Réseaux)',
    school: 'Lycée des Métiers de l’Électricité et du Numérique',
    location: 'Nice, France',
    period: '2023 - Présent',
    description: 'Formation supérieure axée sur l’administration des systèmes, la conception et maintenance des infrastructures réseau, la sécurité logique et physique, ainsi que le support aux utilisateurs.',
    skillsAcquired: ['Routage et Commutation Cisco', 'Administration Linux & Active Directory', 'Sécurisation des infrastructures', 'Virtualisation & Services Cloud', 'Gestion de parc (GLPI)']
  }
];

export const SKILLS_DATA: Skill[] = [
  // Networks
  {
    name: 'Cisco Routing & Switching',
    level: 85,
    iconName: 'Network',
    category: 'networks',
    details: ['Routage Statique & Dynamique (OSPF, RIP)', 'Configuration VLANs, Trunking (802.1Q)', 'Protocoles STP, RSTP', 'Sécurité des ports (Port Security)', 'Inter-VLAN Routing']
  },
  {
    name: 'Protocoles Réseau & DNS/DHCP',
    level: 90,
    iconName: 'Server',
    category: 'networks',
    details: ['TCP/IP Model & Subnetting (CIDR, VLSM)', 'DHCP Failover & DNS Zones', 'VPN (IPsec, OpenVPN)', 'Analyse de trames avec Wireshark']
  },
  // Systems
  {
    name: 'Administration Linux (Debian, Rocky)',
    level: 80,
    iconName: 'Terminal',
    category: 'systems',
    details: ['Gestion des utilisateurs & droits (ACL, sudoers)', 'Configuration Apache2, Nginx, BIND9, ISC-DHCP', 'Scripting Shell (Bash)', 'Durcissement système (Hardening)']
  },
  {
    name: 'Windows Server & Active Directory',
    level: 85,
    iconName: 'MonitorPlay',
    category: 'systems',
    details: ['Structure AD DS (Forêts, Domaines, UOs)', 'Mise en place de GPO (Stratégies de groupe)', 'Services DNS, DHCP, WSUS, WDS', 'Serveur de fichiers & Droits NTFS/Partages']
  },
  // Virtualization
  {
    name: 'Virtualisation (Proxmox, VMware, Hyper-V)',
    level: 75,
    iconName: 'Layers',
    category: 'virtualization',
    details: ['Hyperviseurs Type-1 (Proxmox VE, ESXi)', 'Virtualisation de conteneurs (Docker, LXC)', 'Réseaux virtuels (vSwitches, bridges)', 'Sauvegardes et réplications automatiques']
  },
  {
    name: 'Gestion de Parc & Supervision',
    level: 80,
    iconName: 'Activity',
    category: 'virtualization',
    details: ['Outil de ticketing GLPI & OCS Inventory', 'Supervision d’infrastructure avec Zabbix / Nagios', 'Alerte SNMP & SNMP Traps']
  },
  // Security
  {
    name: 'Cybersécurité & Pare-feux (PFSense, Stormshield)',
    level: 80,
    iconName: 'ShieldAlert',
    category: 'security',
    details: ['Configuration de règles de filtrage (Firewalling)', 'NAT / PAT & Redirection de ports', 'Filtrage applicatif, Proxy Squid & SquidGuard', 'Cryptographie & Gestion des clés / certificats SSL']
  },
  {
    name: 'Audit de sécurité & Bonnes pratiques',
    level: 75,
    iconName: 'FileSpreadsheet',
    category: 'security',
    details: ['Application du guide d’hygiène informatique ANSSI', 'Sécurisation des accès SSH (clés, Fail2ban)', 'Vulnerability Assessment (Nmap, OpenVAS)']
  }
];

export const STAGES_DATA: Stage[] = [
  {
    id: 'stage-1',
    company: 'TechNet Services',
    period: 'Janvier - Février 2024 (6 semaines)',
    role: 'Technicien Réseau & Système (Stage de 1ère année)',
    logoColor: 'from-blue-600 to-indigo-600',
    description: 'Immersion au sein d’une ESN spécialisée dans l’accompagnement des PME pour la gestion de leur parc informatique et de leur réseau local.',
    missions: [
      'Migration d’un serveur Active Directory physique vers un hyperviseur Proxmox VE virtuel.',
      'Mise en place d’une solution de sauvegarde automatisée avec réplication quotidienne (Veeam Backup).',
      'Déploiement de serveurs DHCP redondants et gestion des baux de réservation pour 120 postes clients.',
      'Création et configuration de stratégies de groupe (GPO) pour la sécurité des mots de passe et le montage automatique des lecteurs réseau.'
    ],
    technologies: ['Windows Server 2022', 'Active Directory', 'Proxmox VE', 'Veeam Backup', 'PowerShell']
  },
  {
    id: 'stage-2',
    company: 'SecurIT Solutions',
    period: 'Mai - Juin 2024 (6 semaines)',
    role: 'Assistant Administrateur Réseau & Sécurité (Stage de 2ème année)',
    logoColor: 'from-purple-600 to-pink-600',
    description: 'Participation au durcissement de l’infrastructure interne et à la supervision des réseaux clients sous la tutelle du responsable de la sécurité informatique.',
    missions: [
      'Configuration et déploiement de pare-feux PFSense dans une architecture double-patte (WAN, LAN, DMZ).',
      'Configuration de tunnels VPN IPsec pour sécuriser le télétravail des collaborateurs.',
      'Mise en place d’un serveur de supervision Zabbix avec alertes e-mail et tableau de bord en temps réel pour le parc serveur.',
      'Réalisation d’audits de vulnérabilités réseau à l’aide de Nmap et OpenVAS, suivis de rapports de remédiation.'
    ],
    technologies: ['PFSense', 'Zabbix', 'VPN IPsec / OpenVPN', 'Nmap', 'Linux Debian', 'GLPI']
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'serveur-linux',
    title: 'Mise en place d’un serveur d’infrastructure Linux',
    category: 'systeme',
    description: 'Déploiement d’un serveur Debian complet hébergeant les services indispensables d’un réseau d’entreprise : DHCP, DNS faisant autorité, et serveur web sécurisé.',
    longDescription: 'Ce projet consiste en la création d’une passerelle et d’un serveur de services essentiels sous Debian. Il permet de simuler un environnement de production où les machines du réseau reçoivent dynamiquement leur adresse, résolvent les noms en local et externe, et accèdent à l’intranet de l’entreprise de manière sécurisée.',
    technologies: ['Debian 12', 'BIND9', 'ISC-DHCP-Server', 'Nginx', 'OpenSSL', 'iptables'],
    architecture: [
      'IP Passerelle LAN : 192.168.10.254/24',
      'Zone DNS locale : bts-sisr.lan',
      'Pool DHCP : 192.168.10.10 à 192.168.10.100',
      'Serveur Web HTTPS : intranet.bts-sisr.lan (Port 443)'
    ],
    commands: [
      'sudo apt install isc-dhcp-server bind9 nginx openssl',
      'systemctl restart isc-dhcp-server',
      'openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx.key -out /etc/ssl/certs/nginx.crt',
      'iptables -A FORWARD -i eth1 -o eth0 -j MASQUERADE'
    ],
    results: [
      'Attribution automatique d’IP aux clients dans la plage configurée.',
      'Résolution DNS locale et redirection des requêtes externes vers 1.1.1.1.',
      'Accès HTTPS fonctionnel au serveur web avec certificat auto-signé.',
      'Routage NAT sécurisé permettant aux machines privées d’accéder à internet.'
    ],
    icon: 'Terminal'
  },
  {
    id: 'cisco-network',
    title: 'Configuration d’un Réseau Multi-VLAN Cisco',
    category: 'reseau',
    description: 'Conception et imploi d’une architecture réseau commutée et routée sur Packet Tracer et matériel physique avec routage inter-VLAN et ACLs de filtrage.',
    longDescription: 'Création d’un réseau segmenté pour une entreprise fictive disposant de 3 services (Administration, Informatique, Invités). Le but était d’assurer la communication contrôlée entre ces réseaux tout en bloquant l’accès des invités aux ressources sensibles par des listes de contrôle d’accès (ACL).',
    technologies: ['Cisco iOS', 'Switches Catalyst 2960', 'Routeur Cisco 2911', 'SSH', '802.1Q Trunking', 'ACL'],
    architecture: [
      'VLAN 10 : Administration (192.168.10.0/24)',
      'VLAN 20 : Informatique (192.168.20.0/24)',
      'VLAN 30 : Invités (192.168.30.0/24) - Accès Internet uniquement',
      'Routage : Sub-interfaces sur le routeur (Router-on-a-Stick)'
    ],
    commands: [
      'Switch(config)# vlan 10',
      'Switch(config-vlan)# name Administration',
      'Switch(config-if)# switchport mode trunk',
      'Routeur(config)# interface gigabitEthernet 0/0.10',
      'Routeur(config-subif)# encapsulation dot1Q 10',
      'Routeur(config-subif)# ip address 192.168.10.254 255.255.255.0',
      'Routeur(config)# access-list 101 deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255'
    ],
    results: [
      'Segmentation hermétique des flux de données entre services.',
      'Isolement total du réseau Invités vis-à-vis des serveurs administratifs.',
      'Routage inter-VLAN fluide et sécurisé pour l’équipe Informatique.',
      'Accès SSH sécurisé mis en place sur tous les équipements réseau.'
    ],
    icon: 'Network'
  },
  {
    id: 'active-directory',
    title: 'Déploiement d’un Domaine Active Directory',
    category: 'systeme',
    description: 'Installation et configuration d’un contrôleur de domaine Windows Server avec automatisation des comptes, UOs et stratégies de sécurité GPO.',
    longDescription: 'Mise en place complète d’une infrastructure Microsoft Active Directory (AD DS) sous Windows Server 2022. Le projet inclut la création d’une arborescence d’Unités Organisationnelles (UOs), la configuration d’un serveur DHCP/DNS natif AD et le déploiement de stratégies de groupe visant à uniformiser et sécuriser le parc clients.',
    technologies: ['Windows Server 2022', 'AD DS', 'Group Policy (GPO)', 'PowerShell', 'DNS Server', 'DHCP Server'],
    architecture: [
      'Nom de domaine : pasquet.local',
      'Structure UO : Cannes > Services (RH, Ventes, Tech) > Utilisateurs / Ordinateurs',
      'GPO Sécurité : Verrouillage session (10 min), Complexité MDP, Restrictions USB',
      'GPO Environnement : Lecteurs réseau automatiques, Bureau corporatif'
    ],
    commands: [
      'Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools',
      'Install-ADDSForest -DomainName "pasquet.local" -InstallDns:$true',
      'New-ADOrganizationalUnit -Name "RessourcesHumaines" -Path "DC=pasquet,DC=local"',
      'New-ADUser -Name "Jean Dupont" -SamAccountName "jdupont" -Path "OU=RessourcesHumaines,DC=pasquet,DC=local" -Enabled $true'
    ],
    results: [
      'Authentification centralisée fonctionnelle pour l’ensemble des utilisateurs.',
      'Application instantanée des règles de sécurité (GPOs) lors de l’ouverture de session.',
      'Automatisation de la création de 50 comptes utilisateurs via script PowerShell.',
      'Partages de fichiers sécurisés et restreints selon l’appartenance aux groupes AD.'
    ],
    icon: 'MonitorPlay'
  },
  {
    id: 'projet-cyber',
    title: 'Sécurisation périmétrique avec Firewall Pfsense',
    category: 'cybersecurite',
    description: 'Mise en place d’une passerelle de sécurité réseau PFSense avec zone DMZ, proxy de filtrage web Squid et détection d’intrusions.',
    longDescription: 'Ce projet vise à sécuriser le périmètre réseau d’une agence en filtrant le trafic entrant et sortant. L’infrastructure sépare le réseau local de confiance (LAN), le réseau public (WAN) et une zone intermédiaire isolée (DMZ) contenant les serveurs exposés à Internet.',
    technologies: ['PFSense', 'Squid Proxy', 'Snort (IDS/IPS)', 'NAT/PAT', 'DMZ', 'Certificats CA'],
    architecture: [
      'Interface WAN : IP dynamique (Passerelle Internet)',
      'Interface LAN : 10.0.1.254/24 (Postes clients)',
      'Interface DMZ : 10.0.2.254/24 (Serveur Web & FTP)',
      'Filtrage : Bloquer tout flux LAN -> DMZ sauf HTTPS et SSH (informatique)'
    ],
    commands: [
      'Activer HTTPS Filtering (SSL-Bump) dans Squid',
      'Installer la base de signatures de règles Snort (Community Rules)',
      'Configuration NAT Port Forwarding: WAN Port 443 -> DMZ IP 10.0.2.80 Port 443',
      'Configuration des règles de pare-feu LAN-to-WAN strictes'
    ],
    results: [
      'Blocage efficace des sites malveillants et des téléchargements suspects via SquidGuard.',
      'Détection et notification automatique des scans de ports et attaques DoS grâce à Snort.',
      'Isolement de la DMZ : si le serveur web est compromis, l’attaquant ne peut pas rebondir sur le LAN.',
      'Accès à distance sécurisé des administrateurs via un VPN SSL OpenVPN hébergé sur le PFSense.'
    ],
    icon: 'ShieldAlert'
  },
  {
    id: 'portfolio-web',
    title: 'Développement d’un Site Web Portfolio Moderne',
    category: 'web',
    description: 'Création d’un site vitrine interactif et responsive pour valoriser mes projets et compétences en BTS SIO SISR.',
    longDescription: 'Bien qu’étudiant en SISR, maîtriser le développement web est un atout indispensable pour administrer des interfaces de supervision, comprendre les failles applicatives (OWASP) ou scripter des outils. Ce site présente mon parcours de manière interactive avec un terminal réseau simulé.',
    technologies: ['React 19', 'Tailwind CSS v4', 'Vite', 'TypeScript', 'Lucide React'],
    architecture: [
      'Frontend : Composants modulaires React réutilisables',
      'Style : Tailwind CSS avec effets de gradients et glassmorphisme',
      'Fonctionnalité : Terminal CLI virtuel écrit en TypeScript pour interagir avec le système du portfolio'
    ],
    commands: [
      'npm create vite@latest portfolio -- --template react-ts',
      'npm install lucide-react',
      'npm run build'
    ],
    results: [
      'Vitesse de chargement optimale avec Vite.',
      'Compatibilité mobile et tablette totale (Responsive design).',
      'Interaction originale et immersive grâce au terminal de commande.',
      'Présentation moderne valorisant l’image de technicien réseau moderne.'
    ],
    icon: 'Code'
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'cert-cisco',
    name: 'Introduction to Cybersecurity / Networking Academy',
    issuer: 'Cisco Networking Academy',
    date: 'Mars 2024',
    badgeUrl: 'cisco-logo', // will be styled or SVG
    description: 'Certification validant les compétences de base sur la topologie des réseaux, les protocoles de routage, la sécurité logique et les menaces courantes.',
    skills: ['Sécurité Réseau', 'Menaces Logicielles', 'Protocoles Réseau', 'Mitigation des risques']
  },
  {
    id: 'cert-anssi',
    name: 'SecNumacad (Mooc Cybersécurité)',
    issuer: 'ANSSI (Agence Nationale de la Sécurité des Systèmes d’Information)',
    date: 'Avril 2024',
    badgeUrl: 'anssi-logo',
    description: 'Formation complète répartie en 4 modules : Panorama de la SSI, Sécurité de l’authentification, Sécurité de l’internet et Sécurité du nomadisme.',
    skills: ['Hygiène Informatique', 'Gestion des Mots de Passe', 'Chiffrement', 'Sécurisation Wifi & Télétravail']
  },
  {
    id: 'cert-pix',
    name: 'Certification Pix (Développement Numérique)',
    issuer: 'Ministère de l’Éducation Nationale',
    date: 'Juin 2023',
    badgeUrl: 'pix-logo',
    description: 'Certification officielle certifiant un niveau de maîtrise des compétences numériques (recherche d’info, sécurité des données, programmation de base). Score de 620 Pix.',
    skills: ['Sécurité des données', 'Recherche d’information', 'Collaboration numérique', 'Traitement de données']
  }
];
