import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import type { ResidentsRepository } from '@/core/repositories/residents-repository'

type GetResidentUseCaseInput = {
  residentId: string
}

export class GetResidentUseCase {
  constructor(private residentsRepository: ResidentsRepository) {}

  async execute({ residentId }: GetResidentUseCaseInput) {
    const resident = await this.residentsRepository.findById(residentId)

    if (!resident) throw new ResourceNotFoundError('Resident not found')

    return resident
  }
}
