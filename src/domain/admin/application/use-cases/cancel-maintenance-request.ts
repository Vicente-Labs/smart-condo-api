import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { MaintenanceRequestRepository } from '@/core/repositories/maintenance-repository'
import type { ResidentsRepository } from '@/core/repositories/residents-repository'

type CancelMaintenanceRequestUseCaseInput = {
  userId: string
  maintenanceRequestId: string
}

export class CancelMaintenanceRequestUseCase {
  constructor(
    private residentsRepository: ResidentsRepository,
    private maintenanceRequestsRepository: MaintenanceRequestRepository,
  ) {}

  async execute({
    userId,
    maintenanceRequestId,
  }: CancelMaintenanceRequestUseCaseInput) {
    const resident = await this.residentsRepository.findById(userId)

    if (!resident) throw new ResourceNotFoundError('Resident not found.')

    const maintenanceRequest =
      await this.maintenanceRequestsRepository.findById(maintenanceRequestId)

    if (!maintenanceRequest)
      throw new ResourceNotFoundError('Maintenance request not found.')

    maintenanceRequest.setCanceled()

    await this.maintenanceRequestsRepository.cancel(maintenanceRequest)
  }
}
