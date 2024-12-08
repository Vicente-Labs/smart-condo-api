import { makeCondominium } from 'test/factories/make-condominium'
import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'
import { InMemoryResidentsRepository } from 'test/repositories/in-memory-residents-repository'

import { Resident } from '@/core/entities/resident'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { RegisterResidentUseCase } from './register-resident'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let inMemoryResidentsRepository: InMemoryResidentsRepository
let sut: RegisterResidentUseCase

describe('Register resident use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    inMemoryResidentsRepository = new InMemoryResidentsRepository()
    sut = new RegisterResidentUseCase(
      inMemoryCondominiumRepository,
      inMemoryResidentsRepository,
    )
  })

  it('should be able to register a resident', async () => {
    const userId = new UniqueEntityId('user-id')

    const condominium = makeCondominium({ ownerId: userId })

    inMemoryCondominiumRepository.create(condominium)

    const residentData = {
      name: 'Resident',
      email: 'resident@example.com',
      phone: '1234567890',
      condominiumId: condominium.id.toValue(),
    }

    const result = await sut.execute(residentData)

    expect(result).toBeInstanceOf(Resident)
    expect(inMemoryResidentsRepository.residents[0].id).toEqual(result.id)
    expect(inMemoryResidentsRepository.residents[0]).toEqual(
      expect.objectContaining({
        ...residentData,
        condominiumId: condominium.id,
      }),
    )
  })
})
