import { faker } from '@faker-js/faker'

import type { MaintenanceRequestProps } from '@/core/entities/maintenance-request'
import { MaintenanceRequest } from '@/core/entities/maintenance-request'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeMaintenanceRequest(
  override: Partial<MaintenanceRequestProps> = {},
  id?: UniqueEntityId,
) {
  const maintenanceRequest = MaintenanceRequest.create(
    {
      condominiumId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      authorId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return maintenanceRequest
}
