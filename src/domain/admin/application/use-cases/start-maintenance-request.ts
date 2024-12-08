import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { MaintenanceRequestRepository } from '@/core/repositories/maintenance-repository'
import type { ResidentsRepository } from '@/core/repositories/residents-repository'

type StartMaintenanceRequestUseCaseInput = {
  userId: string
  maintenanceRequestId: string
}

export class StartMaintenanceRequestUseCase {
  constructor(
    private residentsRepository: ResidentsRepository,
    private maintenanceRequestsRepository: MaintenanceRequestRepository,
  ) {}

  async execute({
    userId,
    maintenanceRequestId,
  }: StartMaintenanceRequestUseCaseInput) {
    const resident = await this.residentsRepository.findById(userId)

    if (!resident) throw new ResourceNotFoundError('Resident not found.')

    const maintenanceRequest =
      await this.maintenanceRequestsRepository.findById(maintenanceRequestId)

    if (!maintenanceRequest)
      throw new ResourceNotFoundError('Maintenance request not found.')

    if (maintenanceRequest.status !== 'pending')
      throw new NotAllowedError('Maintenance request is already in progress.')

    maintenanceRequest.startProgress()

    await this.maintenanceRequestsRepository.startProgress(maintenanceRequest)
  }
}
