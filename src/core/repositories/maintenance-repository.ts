import type { MaintenanceRequest } from '../entities/maintenance-request'

export interface MaintenanceRequestRepository {
  create(maintenanceRequest: MaintenanceRequest): Promise<void>
  findById(id: string): Promise<MaintenanceRequest | null>
  findManyByCondominiumId(condominiumId: string): Promise<MaintenanceRequest[]>
  makeDone(maintenanceRequest: MaintenanceRequest): Promise<void>
  cancel(maintenanceRequest: MaintenanceRequest): Promise<void>
  startProgress(maintenanceRequest: MaintenanceRequest): Promise<void>
}
