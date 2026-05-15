import {logisticsCarrierCards, logisticsIntegrationChecklist} from '../data/mock';
import type {CarrierCard, IntegrationChecklistItem} from '../data/mock';

/**
 * CarrierService centraliza las operaciones relacionadas con transportadoras.
 * Estas funciones son mock y deben sustituirse por llamadas reales a API o repositorios.
 */
export class CarrierService {
  async listCarriers(): Promise<CarrierCard[]> {
    return Promise.resolve(logisticsCarrierCards);
  }

  async listIntegrationChecklist(): Promise<IntegrationChecklistItem[]> {
    return Promise.resolve(logisticsIntegrationChecklist);
  }

  async createCarrier(payload: CarrierCard): Promise<CarrierCard> {
    // TODO: reemplazar por llamada a POST /carriers
    return Promise.resolve(payload);
  }

  async importRates(fileName: string): Promise<{fileName: string; status: 'processing' | 'completed'}> {
    // TODO: enviar a servicio de procesamiento
    return Promise.resolve({fileName, status: 'processing'});
  }
}

export const carrierService = new CarrierService();
