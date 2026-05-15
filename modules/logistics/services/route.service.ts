import {
  logisticsConsolidatedLoad,
  logisticsOptimizerStats,
  logisticsRouteLegs,
  logisticsRouteSnapshots,
} from '../data/mock';
import type {
  ConsolidatedLoadItem,
  OptimizerStat,
  RouteLeg,
  RouteSnapshot,
} from '../data/mock';

interface OptimizeRouteInput {
  region: string;
  date: string;
  consolidateReturns: boolean;
  maxStops: number;
}

interface OptimizeRouteResult {
  routeId: string;
  status: 'planned' | 'submitted';
  eta: string;
  totalStops: number;
}

export class RouteService {
  async listSnapshots(): Promise<RouteSnapshot[]> {
    return Promise.resolve(logisticsRouteSnapshots);
  }

  async listRouteLegs(): Promise<RouteLeg[]> {
    return Promise.resolve(logisticsRouteLegs);
  }

  async listOptimizerStats(): Promise<OptimizerStat[]> {
    return Promise.resolve(logisticsOptimizerStats);
  }

  async listConsolidatedLoad(): Promise<ConsolidatedLoadItem[]> {
    return Promise.resolve(logisticsConsolidatedLoad);
  }

  async optimizeRoutes(input: OptimizeRouteInput): Promise<OptimizeRouteResult> {
    // TODO: implementar llamada real a motor de optimización
    return Promise.resolve({
      routeId: `${input.region}-${input.date}`,
      status: 'planned',
      eta: input.date,
      totalStops: Math.min(input.maxStops, 50),
    });
  }

  async exportManifest(routeId: string): Promise<{routeId: string; status: 'queued' | 'sent'}> {
    // TODO: enviar documento a TMS/transportadoras
    return Promise.resolve({routeId, status: 'queued'});
  }
}

export const routeService = new RouteService();
