import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Condominium } from '../entities/condominium'
import type { CondominiumRepository } from '../repositories/condominium-repository'

type RegisterCondominiumUseCaseInput = {
  name: string
  address: string
  userId: string
}

export class RegisterCondominiumUseCase {
  constructor(private condominiumRepository: CondominiumRepository) {}

  async execute({ name, address, userId }: RegisterCondominiumUseCaseInput) {
    const condominium = Condominium.create({
      name,
      address,
      ownerId: new UniqueEntityId(userId),
    })

    await this.condominiumRepository.create(condominium)

    return condominium
  }
}
