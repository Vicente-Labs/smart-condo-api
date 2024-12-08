import { MaintenanceRequest } from '@/core/entities/maintenance-request'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { CondominiumRepository } from '@/core/repositories/condominium-repository'
import type { MaintenanceRequestRepository } from '@/core/repositories/maintenance-repository'

type RegisterMaintenanceRequestUseCaseInput = {
  name: string
  description: string
  condominiumId: string
  commonAreaId?: string | null
  authorId: string
}

export class RegisterMaintenanceRequestUseCase {
  constructor(
    private condominiumRepository: CondominiumRepository,
    private maintenanceRequestRepository: MaintenanceRequestRepository,
  ) {}

  async execute({
    name,
    description,
    condominiumId,
    commonAreaId,
    authorId,
  }: RegisterMaintenanceRequestUseCaseInput) {
    const condominium = await this.condominiumRepository.findById(condominiumId)

    if (!condominium) throw new ResourceNotFoundError('Condominium not found')

    const maintenanceRequest = MaintenanceRequest.create({
      name,
      description,
      authorId: new UniqueEntityId(authorId),
      condominiumId: new UniqueEntityId(condominiumId),
      commonAreaId: commonAreaId ? new UniqueEntityId(commonAreaId) : null,
    })

    await this.maintenanceRequestRepository.create(maintenanceRequest)

    return maintenanceRequest
  }
}
