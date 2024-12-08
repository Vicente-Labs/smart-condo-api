import type { MaintenanceRequest } from '@/core/entities/maintenance-request'
import type { MaintenanceRequestRepository } from '@/core/repositories/maintenance-repository'

export class InMemoryMaintenanceRequestRepository
  implements MaintenanceRequestRepository
{
  public maintenanceRequests: MaintenanceRequest[] = []

  async create(maintenanceRequest: MaintenanceRequest): Promise<void> {
    this.maintenanceRequests.push(maintenanceRequest)
  }

  async findById(id: string): Promise<MaintenanceRequest | null> {
    const maintenanceRequest = this.maintenanceRequests.find(
      (mr) => mr.id.value === id,
    )

    return maintenanceRequest ?? null
  }
}