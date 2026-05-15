import type {ShipmentStatus} from '../domain/models';

export type RiskLevel = 'Bajo' | 'Medio' | 'Alto' | 'N/A';

export type MetricDefinition = {
  label: string;
  value: string;
  subtext: string;
  accent: string;
};

export type ShipmentRow = {
  id: string;
  city: string;
  customer: string;
  status: ShipmentStatus;
  eta: string;
  carrier: string;
  risk: RiskLevel;
};

export type CarrierPerformance = {
  name: string;
  coverage: string;
  successRate: string;
  avgEta: string;
  type: 'Interna' | 'Externa';
};

export type CarrierCard = CarrierPerformance & {
  vehicles: number;
  features: string[];
  successRateValue: number;
};

export type TimelineEvent = {
  title: string;
  detail: string;
  time: string;
  accent: string;
};

export type LogisticsRule = {
  id: string;
  name: string;
  scope: string;
  sla: string;
  priority: 'High' | 'Medium' | 'Low';
  active: boolean;
};

export type ReturnTicket = {
  id: string;
  customer: string;
  city: string;
  pickupWindow: string;
  status: 'requested' | 'scheduled' | 'in_collection' | 'received';
};

export interface IntegrationChecklistItem {
  label: string;
  status: 'Completa' | 'En curso' | 'Pendiente';
}

export interface RouteSnapshot {
  region: string;
  shipments: number;
  distance: string;
  eta: string;
  carrier: string;
  status: string;
}

export interface RouteLeg {
  city: string;
  time: string;
  action: string;
  type: 'origin' | 'delivery' | 'pickup' | 'hub';
}

export interface OptimizerStat {
  label: string;
  value: string;
  trend: 'positivo' | 'neutral' | 'negativo';
}

export interface ConsolidatedLoadItem {
  label: string;
  value: string;
}

export const logisticsMetrics: MetricDefinition[] = [
  {label: 'Envíos activos', value: '128', subtext: '+18 hoy', accent: 'from-slate-900 via-slate-800 to-slate-900 text-white shadow-[0_20px_45px_-20px_rgba(15,23,42,0.75)]'},
  {label: 'SLA al borde', value: '9', subtext: 'Requieren acción', accent: 'from-amber-500/20 to-amber-300/10 text-amber-600'},
  {label: 'Transportadoras activas', value: '5', subtext: '3 externas, 2 internas', accent: 'from-violet-500/20 to-fuchsia-400/10 text-violet-600'},
  {label: 'Rutas optimizadas', value: '14', subtext: 'Últimas 24h', accent: 'from-emerald-500/20 to-lime-400/10 text-emerald-600'},
];

export const logisticsShipments: ShipmentRow[] = [
  {id: 'SHP-9042', city: 'Bogotá', customer: 'Laura Méndez', status: 'in_transit', eta: 'Hoy 18:30', carrier: 'Cygnus Fleet', risk: 'Bajo'},
  {id: 'SHP-9035', city: 'Medellín', customer: 'Retail Nova', status: 'dispatched', eta: 'Mañana 09:00', carrier: 'Andes Express', risk: 'Medio'},
  {id: 'SHP-9028', city: 'Cali', customer: 'Juan Álvarez', status: 'delayed', eta: 'Reprogramar', carrier: 'Andes Express', risk: 'Alto'},
  {id: 'SHP-9021', city: 'Barranquilla', customer: 'Surf & Co', status: 'delivered', eta: 'Entregado 11:14', carrier: 'BlueCargo', risk: 'N/A'},
];

export const logisticsCarrierPerformances: CarrierPerformance[] = [
  {name: 'Cygnus Fleet', coverage: 'Bogotá + 4 ciudades', successRate: '98.5%', avgEta: '6h', type: 'Interna'},
  {name: 'Andes Express', coverage: 'Nacional', successRate: '94.1%', avgEta: '18h', type: 'Externa'},
  {name: 'BlueCargo', coverage: 'Costa Caribe', successRate: '96.3%', avgEta: '12h', type: 'Externa'},
];

export const logisticsTimeline: TimelineEvent[] = [
  {title: 'SHP-9042 entregado', detail: 'Firma digital y evidencia fotográfica recibida', time: '11:14', accent: 'text-emerald-500'},
  {title: 'Ruta Caribe reoptimizada', detail: 'Se redistribuyeron 12 paquetes por ventana horaria', time: '09:48', accent: 'text-sky-500'},
  {title: 'Nueva alerta SLA', detail: '3 envíos superan las 36h en tránsito', time: '08:05', accent: 'text-amber-500'},
];

export const logisticsRules: LogisticsRule[] = [
  {id: 'BR-109', name: 'SLA Prime Bogotá', scope: 'Bogotá D1', sla: '<= 24h', priority: 'High', active: true},
  {id: 'BR-088', name: 'Consolidación Costa', scope: 'Costa Caribe', sla: '48h', priority: 'Medium', active: true},
  {id: 'BR-071', name: 'Nocturno B2B', scope: 'Nacional', sla: '72h', priority: 'Low', active: false},
];

export const logisticsReturnTickets: ReturnTicket[] = [
  {id: 'RET-2201', customer: 'Andrea Castro', city: 'Bogotá', pickupWindow: 'Hoy 16:00 - 19:00', status: 'scheduled'},
  {id: 'RET-2194', customer: 'Studio Tatoo', city: 'Medellín', pickupWindow: 'Mañana 09:00 - 12:00', status: 'requested'},
  {id: 'RET-2188', customer: 'Retail Nova', city: 'Barranquilla', pickupWindow: 'En ruta', status: 'in_collection'},
];

export const logisticsCarrierCards: CarrierCard[] = [
  {
    name: 'Cygnus Fleet',
    type: 'Interna',
    coverage: 'Bogotá + Sabana',
    vehicles: 32,
    successRate: '98.5%',
    successRateValue: 98.5,
    avgEta: '5h 40m',
    features: ['Cold chain', 'Same-day', 'Green fleet'],
  },
  {
    name: 'Andes Express',
    type: 'Externa',
    coverage: 'Nacional',
    vehicles: 210,
    successRate: '94.1%',
    successRateValue: 94.1,
    avgEta: '18h 10m',
    features: ['Cash on delivery', 'API events'],
  },
  {
    name: 'BlueCargo',
    type: 'Externa',
    coverage: 'Costa Caribe',
    vehicles: 68,
    successRate: '96.3%',
    successRateValue: 96.3,
    avgEta: '12h 20m',
    features: ['24/7 support', 'Harbor hub'],
  },
  {
    name: 'Pacífico Riders',
    type: 'Interna',
    coverage: 'Cali + Eje Cafetero',
    vehicles: 24,
    successRate: '92.4%',
    successRateValue: 92.4,
    avgEta: '9h 15m',
    features: ['Motorcycles', 'Night shift'],
  },
];

export const logisticsIntegrationChecklist: IntegrationChecklistItem[] = [
  {label: 'Autenticación OAuth2', status: 'Completa'},
  {label: 'Webhooks de tracking', status: 'Completa'},
  {label: 'Catálogo de servicios', status: 'Pendiente'},
  {label: 'Tarifas dinámicas', status: 'En curso'},
];

export const logisticsRouteSnapshots: RouteSnapshot[] = [
  {region: 'Sabana Norte', shipments: 42, distance: '118 km', eta: '5h 10m', carrier: 'Cygnus Fleet', status: 'En progreso'},
  {region: 'Caribe', shipments: 27, distance: '233 km', eta: '9h 20m', carrier: 'BlueCargo', status: 'Reoptimizada'},
  {region: 'Eje Cafetero', shipments: 18, distance: '154 km', eta: '7h 35m', carrier: 'Pacífico Riders', status: 'Plan final'},
];

export const logisticsRouteLegs: RouteLeg[] = [
  {city: 'Bogotá', time: '08:00', action: 'Salida CD 03', type: 'origin'},
  {city: 'Chía', time: '09:15', action: 'Drop 12 paquetes', type: 'delivery'},
  {city: 'Cajicá', time: '10:05', action: 'Recolección devoluciones', type: 'pickup'},
  {city: 'Zipaquirá', time: '11:10', action: 'Entrega mayorista', type: 'delivery'},
  {city: 'Bogotá', time: '13:45', action: 'Retorno HUB', type: 'hub'},
];

export const logisticsOptimizerStats: OptimizerStat[] = [
  {label: 'Ahorro combustible', value: '14%', trend: 'positivo'},
  {label: 'Capacidad usada', value: '82%', trend: 'neutral'},
  {label: 'Alertas SLA', value: '2 rutas', trend: 'negativo'},
];

export const logisticsConsolidatedLoad: ConsolidatedLoadItem[] = [
  {label: 'Paquetes voluminosos', value: '12'},
  {label: 'Peso promedio', value: '8.3 kg'},
  {label: 'Temperatura controlada', value: '5 envíos'},
];

export interface ShipmentBatch {
  id: string;
  priority: 'Alta' | 'Media' | 'Baja';
  carrier: string;
  zone: string;
  stops: number;
  eta: string;
  status: 'Planificada' | 'En curso' | 'Requiere acción';
}

export const logisticsShipmentBatches: ShipmentBatch[] = [
  {id: 'WAVE-054', priority: 'Alta', carrier: 'Cygnus Fleet', zone: 'Bogotá Norte', stops: 18, eta: 'Hoy 15:40', status: 'En curso'},
  {id: 'WAVE-055', priority: 'Media', carrier: 'Andes Express', zone: 'Antioquia', stops: 32, eta: 'Hoy 21:10', status: 'Planificada'},
  {id: 'WAVE-056', priority: 'Alta', carrier: 'BlueCargo', zone: 'Costa Caribe', stops: 24, eta: 'Mañana 08:30', status: 'Requiere acción'},
];

export interface TrackingChannel {
  name: string;
  uptime: string;
  latency: string;
  connected: boolean;
  lastEvent: string;
}

export const logisticsTrackingChannels: TrackingChannel[] = [
  {name: 'Cygnus Fleet API', uptime: '99.3%', latency: '420 ms', connected: true, lastEvent: 'Hace 2 min'},
  {name: 'Andes Express Webhook', uptime: '97.1%', latency: '1.3 s', connected: true, lastEvent: 'Hace 7 min'},
  {name: 'BlueCargo Polling', uptime: '95.4%', latency: '3.2 s', connected: false, lastEvent: 'Hace 28 min'},
];

export interface AuditLogEntry {
  id: string;
  entity: string;
  action: string;
  actor: string;
  role: string;
  timestamp: string;
  details: string;
  criticality: 'baja' | 'media' | 'alta';
}

export const logisticsAuditLog: AuditLogEntry[] = [
  {
    id: 'AUD-7781',
    entity: 'Regla BR-109',
    action: 'Actualización SLA',
    actor: 'María Cortés',
    role: 'Logistics Lead',
    timestamp: 'Hoy · 10:14',
    details: 'SLA Prime Bogotá ajustado de 24h a 20h',
    criticality: 'media',
  },
  {
    id: 'AUD-7776',
    entity: 'Carrier BlueCargo',
    action: 'API Key rotada',
    actor: 'Plataforma',
    role: 'Automation',
    timestamp: 'Hoy · 09:48',
    details: 'Rotación automática exitosa · próxima en 30 días',
    criticality: 'baja',
  },
  {
    id: 'AUD-7769',
    entity: 'Shipment SHP-9028',
    action: 'Cambio de transportadora',
    actor: 'Juan Herrera',
    role: 'Supervisor',
    timestamp: 'Ayer · 18:32',
    details: 'Reasignado de Andes Express a Cygnus Fleet por sobrecupo',
    criticality: 'alta',
  },
];

export interface ControlTowerAlert {
  id: string;
  title: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical';
  zone: string;
  etaRisk?: string;
}

export const logisticsControlAlerts: ControlTowerAlert[] = [
  {id: 'ALR-441', title: 'Congestión Sabana', detail: 'Tráfico denso en vía 80 · agregar buffer de 25 min', severity: 'warning', zone: 'Bogotá', etaRisk: '+18 min'},
  {id: 'ALR-437', title: 'Fallo API BlueCargo', detail: 'Webhook sin respuesta · activado fallback polling', severity: 'critical', zone: 'Caribe'},
  {id: 'ALR-428', title: 'Sobreventa transportadora', detail: 'Andes Express sin capacidad camiones 32ft', severity: 'warning', zone: 'Antioquia', etaRisk: '+6h'},
];

export interface FleetVehicle {
  id: string;
  type: 'van' | 'truck' | 'bike';
  capacityKg: number;
  status: 'available' | 'en_route' | 'maintenance';
  driver: string;
  route?: string;
  nextMaintenance: string;
}

export const logisticsFleetVehicles: FleetVehicle[] = [
  {id: 'VH-204', type: 'truck', capacityKg: 3800, status: 'en_route', driver: 'Carlos Nieto', route: 'Sabana Norte', nextMaintenance: '2026-02-18'},
  {id: 'VH-112', type: 'van', capacityKg: 950, status: 'available', driver: 'Disponible', nextMaintenance: '2026-03-01'},
  {id: 'VH-089', type: 'bike', capacityKg: 80, status: 'maintenance', driver: 'Sandra Páez', nextMaintenance: 'En taller'},
];

export interface LogisticsCostMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'flat';
}

export const logisticsCostMetrics: LogisticsCostMetric[] = [
  {label: 'Costo promedio por envío', value: '$18.20', trend: 'down'},
  {label: 'Variación mensual', value: '-6.4%', trend: 'down'},
  {label: 'Recargos SLA', value: '$1 240', trend: 'up'},
];

export interface CarrierCostBreakdown {
  carrier: string;
  avgCost: string;
  variance: string;
  currency: string;
}

export const logisticsCarrierCosts: CarrierCostBreakdown[] = [
  {carrier: 'Cygnus Fleet', avgCost: '$15.40', variance: '-3.1%', currency: 'USD'},
  {carrier: 'Andes Express', avgCost: '$21.90', variance: '+4.7%', currency: 'USD'},
  {carrier: 'BlueCargo', avgCost: '$18.70', variance: '+1.2%', currency: 'USD'},
];

export interface IntegrationLog {
  id: string;
  provider: string;
  type: 'webhook' | 'api' | 'ftp';
  status: 'success' | 'error' | 'retrying';
  responseTime: string;
  timestamp: string;
}

export const logisticsIntegrationLogs: IntegrationLog[] = [
  {id: 'INT-9931', provider: 'Cygnus Fleet', type: 'webhook', status: 'success', responseTime: '410 ms', timestamp: '10:12:04'},
  {id: 'INT-9922', provider: 'BlueCargo', type: 'api', status: 'retrying', responseTime: '3.8 s', timestamp: '10:10:55'},
  {id: 'INT-9914', provider: 'Andes Express', type: 'webhook', status: 'error', responseTime: '-', timestamp: '10:08:11'},
];

export interface DemandForecast {
  week: string;
  expectedShipments: number;
  capacityGap: number;
  recommendation: string;
}

export const logisticsDemandForecast: DemandForecast[] = [
  {week: 'Semana 04', expectedShipments: 1420, capacityGap: -80, recommendation: 'Asignar overflow a 3PL'},
  {week: 'Semana 05', expectedShipments: 1675, capacityGap: 120, recommendation: 'Suficiente capacidad'},
  {week: 'Semana 06', expectedShipments: 1890, capacityGap: 260, recommendation: 'Habilitar turnos extra nocturnos'},
];

export interface CustomerExperienceMetric {
  label: string;
  value: string;
  delta: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export const logisticsCxMetrics: CustomerExperienceMetric[] = [
  {label: 'NPS Post-entrega', value: '62', delta: '+4 pts', sentiment: 'positive'},
  {label: 'Reclamos de entrega', value: '1.8%', delta: '-0.6 pp', sentiment: 'positive'},
  {label: 'T. respuesta incidencias', value: '27 min', delta: '+5 min', sentiment: 'negative'},
];

export interface SandboxScenario {
  id: string;
  title: string;
  hypothesis: string;
  impact: string;
  status: 'draft' | 'simulated' | 'applied';
}

export const logisticsSandboxScenarios: SandboxScenario[] = [
  {
    id: 'SIM-208',
    title: 'Desviar 20% volumen Bogotá a BlueCargo',
    hypothesis: 'Reduce presión sabana y mejora SLA prime',
    impact: '+1.5% OTIF estimado',
    status: 'simulated',
  },
  {
    id: 'SIM-205',
    title: 'Consolidar rutas nocturnas Antioquia',
    hypothesis: 'Ahorro combustible 8%',
    impact: 'En análisis',
    status: 'draft',
  },
  {
    id: 'SIM-198',
    title: 'Activar cash-on-delivery en Eje Cafetero',
    hypothesis: 'Incremento ventas 4%',
    impact: 'Pendiente validación reglas',
    status: 'draft',
  },
];
