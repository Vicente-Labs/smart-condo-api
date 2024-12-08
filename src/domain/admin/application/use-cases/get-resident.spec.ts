import { makeCondominium } from 'test/factories/make-condominium'
import { makeResident } from 'test/factories/make-resident'
import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'
import { InMemoryResidentsRepository } from 'test/repositories/in-memory-residents-repository'

import { Resident } from '@/core/entities/resident'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { GetResidentUseCase } from './get-resident'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let inMemoryResidentsRepository: InMemoryResidentsRepository
let sut: GetResidentUseCase

describe('Get resident use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    inMemoryResidentsRepository = new InMemoryResidentsRepository()
    sut = new GetResidentUseCase(inMemoryResidentsRepository)
  })

  it('should be able to get a resident', async () => {
    const userId = new UniqueEntityId('user-id')

    const condominium = makeCondominium({ ownerId: userId })
    const resident = makeResident({ condominiumId: condominium.id })

    inMemoryCondominiumRepository.create(condominium)
    inMemoryResidentsRepository.create(resident)

    const result = await sut.execute({
      residentId: resident.id.toValue(),
    })

    expect(result).toBeInstanceOf(Resident)
    expect(inMemoryResidentsRepository.residents[0].id).toEqual(result.id)
    expect(inMemoryResidentsRepository.residents[0]).toEqual(
      expect.objectContaining({
        ...resident,
        condominiumId: condominium.id,
      }),
    )
  })
})
