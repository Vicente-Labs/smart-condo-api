import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'

import { Condominium } from '../entities/condominium'
import { RegisterCondominiumUseCase } from './register-condominium'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let sut: RegisterCondominiumUseCase

describe('Register condominium use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    sut = new RegisterCondominiumUseCase(inMemoryCondominiumRepository)
  })

  it('should be able to register a condominium', async () => {
    const result = await sut.execute({
      name: 'Condominium',
      address: 'Address',
      userId: 'user-id',
    })

    expect(result).toBeInstanceOf(Condominium)
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ownerId: 'user-id',
        name: 'Condominium',
        address: 'Address',
      }),
    )
  })
})
