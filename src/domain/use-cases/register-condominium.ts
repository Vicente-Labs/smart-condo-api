import { Condominium } from '../entities/condominium'

type RegisterCondominiumUseCaseInput = {
  name: string
  address: string
  userId: string
}

export class RegisterCondominiumUseCase {
  execute({ name, address, userId }: RegisterCondominiumUseCaseInput) {
    return new Condominium({ name, address, ownerId: userId })
  }
}
