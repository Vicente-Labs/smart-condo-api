import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { CondominiumRepository } from '@/core/repositories/condominium-repository'
import type { MaintenanceRequestRepository } from '@/core/repositories/maintenance-repository'
import type { ResidentsRepository } from '@/core/repositories/residents-repository'
import type { SyndicatorRepository } from '@/core/repositories/syndicator-repository'

type FetchMaintenanceRequestUseCaseInput = {
  condominiumId: string
  userId: string
}

export class FetchMaintenanceRequestUseCase {
  constructor(
    private syndicatorRepository: SyndicatorRepository,
    private condominiumRepository: CondominiumRepository,
    private maintenanceRequestRepository: MaintenanceRequestRepository,
    private residentRepository: ResidentsRepository,
  ) {}

  async execute({
    condominiumId,
    userId,
  }: FetchMaintenanceRequestUseCaseInput) {
    const resident = await this.residentRepository.findById(userId)

    const condominium = await this.condominiumRepository.findById(condominiumId)
    const syndicator = await this.syndicatorRepository.findById(userId)

    if (!condominium) throw new ResourceNotFoundError('Condominium not found')

    const isCondominiumResidentOrHasPermission =
      resident?.condominiumId === condominium.id ||
      syndicator?.condominiumId === condominium.id ||
      condominium.ownerId.toString() === userId

    if (!isCondominiumResidentOrHasPermission) throw new NotAllowedError()

    const maintenanceRequests =
      await this.maintenanceRequestRepository.findManyByCondominiumId(
        condominiumId,
      )

    return maintenanceRequests
  }
}
