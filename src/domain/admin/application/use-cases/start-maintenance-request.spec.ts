import { makeCondominium } from 'test/factories/make-condominium'
import { makeMaintenanceRequest } from 'test/factories/make-maintenance-request'
import { makeResident } from 'test/factories/make-resident'
import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'
import { InMemoryMaintenanceRequestRepository } from 'test/repositories/in-memory-maintenance-request-repository'
import { InMemoryResidentsRepository } from 'test/repositories/in-memory-residents-repository'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { StartMaintenanceRequestUseCase } from './start-maintenance-request'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let inMemoryResidentsRepository: InMemoryResidentsRepository
let inMemoryMaintenanceRequestRepository: InMemoryMaintenanceRequestRepository
let sut: StartMaintenanceRequestUseCase

describe('Start maintenance request use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    inMemoryResidentsRepository = new InMemoryResidentsRepository()
    inMemoryMaintenanceRequestRepository =
      new InMemoryMaintenanceRequestRepository()
    sut = new StartMaintenanceRequestUseCase(
      inMemoryResidentsRepository,
      inMemoryMaintenanceRequestRepository,
    )
  })

  it('should be able to do a maintenance request', async () => {
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

  it('should not be able to do a maintenance request if the resident does not exist', async () => {
    const userId = new UniqueEntityId('user-id')

    await expect(
      sut.execute({
        userId: userId.toValue(),
        maintenanceRequestId: 'maintenance-request-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to do a maintenance request if the maintenance request does not exist', async () => {
    const userId = new UniqueEntityId('user-id')

    await expect(
      sut.execute({
        userId: userId.toValue(),
        maintenanceRequestId: 'maintenance-request-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to do a maintenance request if the maintenance request is already in progress', async () => {
    const userId = new UniqueEntityId('user-id')
    const condominium = makeCondominium({ ownerId: userId })
    const resident = makeResident({ condominiumId: condominium.id })

    const maintenanceRequest = makeMaintenanceRequest({
      authorId: resident.id,
      condominiumId: condominium.id,
      status: 'in_progress',
    })

    inMemoryMaintenanceRequestRepository.create(maintenanceRequest)
    inMemoryCondominiumRepository.create(condominium)
    inMemoryResidentsRepository.create(resident)

    await expect(
      sut.execute({
        userId: resident.id.toValue(),
        maintenanceRequestId: maintenanceRequest.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to do a maintenance request if the maintenance request is already done', async () => {
    const userId = new UniqueEntityId('user-id')
    const condominium = makeCondominium({ ownerId: userId })
    const resident = makeResident({ condominiumId: condominium.id })

    const maintenanceRequest = makeMaintenanceRequest({
      authorId: resident.id,
      condominiumId: condominium.id,
      status: 'done',
    })

    inMemoryMaintenanceRequestRepository.create(maintenanceRequest)
    inMemoryCondominiumRepository.create(condominium)
    inMemoryResidentsRepository.create(resident)

    await expect(
      sut.execute({
        userId: resident.id.toValue(),
        maintenanceRequestId: maintenanceRequest.id.toValue(),
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)
  })
})
