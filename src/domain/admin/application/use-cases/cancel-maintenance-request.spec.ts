import { makeCondominium } from 'test/factories/make-condominium'
import { makeMaintenanceRequest } from 'test/factories/make-maintenance-request'
import { makeResident } from 'test/factories/make-resident'
import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'
import { InMemoryMaintenanceRequestRepository } from 'test/repositories/in-memory-maintenance-request-repository'
import { InMemoryResidentsRepository } from 'test/repositories/in-memory-residents-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { CancelMaintenanceRequestUseCase } from './cancel-maintenance-request'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let inMemoryResidentsRepository: InMemoryResidentsRepository
let inMemoryMaintenanceRequestRepository: InMemoryMaintenanceRequestRepository
let sut: CancelMaintenanceRequestUseCase

describe('Cancel maintenance request use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    inMemoryResidentsRepository = new InMemoryResidentsRepository()
    inMemoryMaintenanceRequestRepository =
      new InMemoryMaintenanceRequestRepository()
    sut = new CancelMaintenanceRequestUseCase(
      inMemoryResidentsRepository,
      inMemoryMaintenanceRequestRepository,
    )
  })

  it('should be able to cancel a maintenance request', async () => {
    const userId = new UniqueEntityId('user-id')

    const condominium = makeCondominium({ ownerId: userId })
    const resident = makeResident({ condominiumId: condominium.id })
    const maintenanceRequest = makeMaintenanceRequest({
      authorId: resident.id,
      condominiumId: condominium.id,
    })

    inMemoryMaintenanceRequestRepository.create(maintenanceRequest)
    inMemoryCondominiumRepository.create(condominium)
    inMemoryResidentsRepository.create(resident)

    await sut.execute({
      userId: resident.id.toValue(),
      maintenanceRequestId: maintenanceRequest.id.toValue(),
    })

    expect(
      inMemoryMaintenanceRequestRepository.maintenanceRequests[0].id,
    ).toEqual(maintenanceRequest.id)
    expect(inMemoryMaintenanceRequestRepository.maintenanceRequests[0]).toEqual(
      expect.objectContaining({
        ...maintenanceRequest,
        condominiumId: condominium.id,
      }),
    )
  })
})