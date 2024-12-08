import { Resident } from '@/core/entities/resident'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { CondominiumRepository } from '@/core/repositories/condominium-repository'
import type { ResidentsRepository } from '@/core/repositories/residents-repository'

type RegisterResidentUseCaseInput = {
  name: string
  email: string
  phone: string
  condominiumId: string
}

export class RegisterResidentUseCase {
  constructor(
    private condominiumRepository: CondominiumRepository,
    private residentsRepository: ResidentsRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    condominiumId,
  }: RegisterResidentUseCaseInput) {
    const condominium = await this.condominiumRepository.findById(condominiumId)

    if (!condominium) throw new Error('Condominium not found.')

    const resident = Resident.create({
      name,
      email,
      phone,
      condominiumId: new UniqueEntityId(condominiumId),
    })

    await this.residentsRepository.create(resident)

    return resident
  }
}
