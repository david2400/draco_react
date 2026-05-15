'use client';

export type ShipmentStatus =
  | 'prepared'
  | 'dispatched'
  | 'in_transit'
  | 'delayed'
  | 'delivered'
  | 'failed'
  | 'returned';

export type ReturnStatus =
  | 'requested'
  | 'scheduled'
  | 'in_collection'
  | 'received'
  | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface CustomerContact {
  fullName: string;
  phone?: string;
  email?: string;
}

export interface PackageDimension {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

export interface Package {
  id: string;
  weightKg: number;
  volumetricWeightKg?: number;
  dimensions: PackageDimension;
  contents: string[];
  hazardLevel?: 'none' | 'low' | 'medium' | 'high';
  trackingCode?: string;
}

export interface ShipmentLine {
  orderItemId: string;
  sku: string;
  description: string;
  quantity: number;
  weightKg?: number;
  volumeM3?: number;
}

export interface SLASetting {
  commitmentHours: number;
  maxPromiseHours?: number;
  cutoffHourUTC?: string;
  daysOfWeek?: Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>;
}

export interface CarrierZone {
  id: string;
  name: string;
  country: string;
  states?: string[];
  cities?: string[];
  postalCodes?: string[];
}

export interface CarrierRate {
  id: string;
  zoneId: string;
  minWeightKg: number;
  maxWeightKg: number;
  baseCost: number;
  costPerKg?: number;
  costPerKm?: number;
  currency: string;
  etaHours: number;
}

export interface CarrierCapability {
  supportsColdChain?: boolean;
  maxWeightKg?: number;
  maxVolumeM3?: number;
  requiresAppointment?: boolean;
  supportsCashOnDelivery?: boolean;
}

export interface Carrier {
  id: string;
  name: string;
  type: 'internal' | 'external';
  apiBaseUrl?: string;
  authType?: 'api_key' | 'oauth2';
  priorityScore: number;
  zones: CarrierZone[];
  rates: CarrierRate[];
  capability: CarrierCapability;
  leadTimeHours: number;
  availabilityWindows?: { startHourUTC: string; endHourUTC: string }[];
}

export interface ShipmentEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  timestamp: string;
  location?: Address;
  notes?: string;
  metadata?: Record<string, unknown>;
}

export interface Shipment {
  id: string;
  orderId: string;
  marketplaceOrder?: string;
  status: ShipmentStatus;
  priority: 'low' | 'normal' | 'high' | 'critical';
  sla: SLASetting;
  carrierId?: string;
  carrierAssignmentReason?: string;
  lines: ShipmentLine[];
  packages: Package[];
  sourceWarehouseId: string;
  destination: {
    address: Address;
    contact: CustomerContact;
  };
  totalWeightKg: number;
  totalVolumeM3?: number;
  insuredValue?: number;
  currency: string;
  costEstimate: number;
  routeId?: string;
  events: ShipmentEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface RouteStop {
  id: string;
  stopNumber: number;
  shipmentIds: string[];
  eta: string;
  address: Address;
  type: 'pickup' | 'delivery' | 'return';
}

export interface RoutePlan {
  id: string;
  carrierId: string;
  vehicleId?: string;
  date: string;
  region: string;
  status: 'draft' | 'finalized' | 'in_progress' | 'completed';
  distanceKm?: number;
  stops: RouteStop[];
  metadata?: Record<string, unknown>;
}

export interface TrackingEvent {
  shipmentId: string;
  status: ShipmentStatus;
  message: string;
  timestamp: string;
  source: 'carrier' | 'internal' | 'customer';
  evidenceUrl?: string;
}

export interface NotificationChannelPreference {
  channel: 'email' | 'push' | 'webhook';
  target: string;
}

export interface ReturnRequest {
  id: string;
  originalShipmentId: string;
  reasonCode: string;
  comments?: string;
  status: ReturnStatus;
  customerContact: CustomerContact;
  pickupAddress: Address;
  pickupWindow?: { start: string; end: string };
  approvals: { approvedBy: string; approvedAt: string }[];
}

export interface BusinessRule {
  id: string;
  name: string;
  scope: 'global' | 'country' | 'region' | 'city';
  priority: number;
  conditions: Record<string, unknown>;
  action: Record<string, unknown>;
  active: boolean;
  validFrom?: string;
  validTo?: string;
}

export interface AuditLogEntry {
  id: string;
  entity: 'shipment' | 'carrier' | 'route' | 'return' | 'rule';
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'status_change';
  performedBy: string;
  timestamp: string;
  diff?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}
