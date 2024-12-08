import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'

import { Condominium } from '@/core/entities/condominium'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { RegisterCondominiumUseCase } from './register-condominium'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let sut: RegisterCondominiumUseCase

describe('Register condominium use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    sut = new RegisterCondominiumUseCase(inMemoryCondominiumRepository)
  })

  it('should be able to register a condominium', async () => {
    const userId = new UniqueEntityId('user-id')

    const result = await sut.execute({
      name: 'Condominium',
      address: 'Address',
      userId: userId.toValue(),
    })

    expect(result).toBeInstanceOf(Condominium)
    expect(inMemoryCondominiumRepository.condominiums[0].id).toEqual(result.id)
    expect(inMemoryCondominiumRepository.condominiums[0]).toEqual(
      expect.objectContaining({
        ownerId: userId,
        name: 'Condominium',
        address: 'Address',
      }),
    )
  })
})
