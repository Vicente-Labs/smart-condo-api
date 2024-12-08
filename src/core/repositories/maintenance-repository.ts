import type { MaintenanceRequest } from '../entities/maintenance-request'

export interface MaintenanceRequestRepository {
  create(maintenanceRequest: MaintenanceRequest): Promise<void>
  findById(id: string): Promise<MaintenanceRequest | null>
  findManyByCondominiumId(condominiumId: string): Promise<MaintenanceRequest[]>
}
