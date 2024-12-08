import { makeCondominium } from 'test/factories/make-condominium'
import { makeMaintenanceRequest } from 'test/factories/make-maintenance-request'
import { makeResident } from 'test/factories/make-resident'
import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'
import { InMemoryMaintenanceRequestRepository } from 'test/repositories/in-memory-maintenance-request-repository'
import { InMemoryResidentsRepository } from 'test/repositories/in-memory-residents-repository'
import { InMemorySyndicatorRepository } from 'test/repositories/in-memory-syndicator-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

import { FetchMaintenanceRequestUseCase } from './fetch-maintenance-request'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let inMemoryResidentsRepository: InMemoryResidentsRepository
let inMemoryMaintenanceRequestRepository: InMemoryMaintenanceRequestRepository
let inMemorySyndicatorRepository: InMemorySyndicatorRepository
let sut: FetchMaintenanceRequestUseCase

describe('Fetch maintenance request use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    inMemoryResidentsRepository = new InMemoryResidentsRepository()
    inMemoryMaintenanceRequestRepository =
      new InMemoryMaintenanceRequestRepository()
    inMemorySyndicatorRepository = new InMemorySyndicatorRepository()
    sut = new FetchMaintenanceRequestUseCase(
      inMemorySyndicatorRepository,
      inMemoryCondominiumRepository,
      inMemoryMaintenanceRequestRepository,
      inMemoryResidentsRepository,
    )
  })

  it('should be able to fetch maintenance requests', async () => {
    const userId = new UniqueEntityId('user-id')

    const condominium = makeCondominium({ ownerId: userId })
    const resident = makeResident({ condominiumId: condominium.id })
    const maintenanceRequest = makeMaintenanceRequest({
      condominiumId: condominium.id,
      authorId: resident.id,
    })

    inMemoryMaintenanceRequestRepository.create(maintenanceRequest)
    inMemoryCondominiumRepository.create(condominium)
    inMemoryResidentsRepository.create(resident)

    const result = await sut.execute({
      condominiumId: condominium.id.toValue(),
      userId: userId.toValue(),
    })

    expect(result).toBeInstanceOf(Array)
    expect(
      inMemoryMaintenanceRequestRepository.maintenanceRequests.length,
    ).toEqual(result.length)
    expect(inMemoryMaintenanceRequestRepository.maintenanceRequests[0]).toEqual(
      expect.objectContaining({
        ...maintenanceRequest,
        condominiumId: condominium.id,
      }),
    )
  })

  it('should not be able to fetch maintenance requests from another condominium', async () => {
    const userId = new UniqueEntityId('user-id')

    const condominium = makeCondominium({ ownerId: userId })
    const maintenanceRequest = makeMaintenanceRequest({
      condominiumId: condominium.id,
    })

    const anotherUserId = new UniqueEntityId('another-user-id')

    inMemoryMaintenanceRequestRepository.create(maintenanceRequest)
    inMemoryCondominiumRepository.create(condominium)

    expect(async () => {
      await sut.execute({
        condominiumId: condominium.id.toValue(),
        userId: anotherUserId.toValue(),
      })
    }).rejects.toBeInstanceOf(NotAllowedError)
  })
})
