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
    const condominium = new Condominium({ name, address, ownerId: userId })

    await this.condominiumRepository.create(condominium)

    return condominium
  }
}
