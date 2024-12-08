import { makeCondominium } from 'test/factories/make-condominium'
import { makeResident } from 'test/factories/make-resident'
import { InMemoryCondominiumRepository } from 'test/repositories/in-memory-condominium-repository'
import { InMemoryMaintenanceRequestRepository } from 'test/repositories/in-memory-maintenance-request-repository'

import { MaintenanceRequest } from '@/core/entities/maintenance-request'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { RegisterMaintenanceRequestUseCase } from './register-maintenance-request'

let inMemoryCondominiumRepository: InMemoryCondominiumRepository
let inMemoryMaintenanceRequestRepository: InMemoryMaintenanceRequestRepository
let sut: RegisterMaintenanceRequestUseCase

describe('Register maintenance request use case', () => {
  beforeEach(() => {
    inMemoryCondominiumRepository = new InMemoryCondominiumRepository()
    inMemoryMaintenanceRequestRepository =
      new InMemoryMaintenanceRequestRepository()
    sut = new RegisterMaintenanceRequestUseCase(
      inMemoryCondominiumRepository,
      inMemoryMaintenanceRequestRepository,
    )
  })

  it('should be able to register a maintenance request', async () => {
    const userId = new UniqueEntityId('user-id')

    const condominium = makeCondominium({ ownerId: userId })
    const author = makeResident({
      condominiumId: condominium.id,
    })

    inMemoryCondominiumRepository.create(condominium)

    const maintenanceRequestData = {
      name: 'Maintenance Request',
      description: 'Maintenance Request Description',
      condominiumId: condominium.id.toValue(),
      authorId: author.id.toValue(),
    }

    const result = await sut.execute(maintenanceRequestData)

    expect(result).toBeInstanceOf(MaintenanceRequest)
    expect(
      inMemoryMaintenanceRequestRepository.maintenanceRequests[0].id,
    ).toEqual(result.id)
    expect(inMemoryMaintenanceRequestRepository.maintenanceRequests[0]).toEqual(
      expect.objectContaining({
        ...maintenanceRequestData,
        condominiumId: condominium.id,
        authorId: author.id,
      }),
    )
  })

  it('should not be able to register a maintenance request with a non-existent condominium', async () => {
    const maintenanceRequestData = {
      name: 'Maintenance Request',
      description: 'Maintenance Request Description',
      condominiumId: 'non-existent-condominium-id',
      authorId: 'non-existent-author-id',
    }

    expect(async () => {
      await sut.execute(maintenanceRequestData)
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
