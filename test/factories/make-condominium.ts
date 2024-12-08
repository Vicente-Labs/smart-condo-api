import { faker } from '@faker-js/faker'

import type { CondominiumProps } from '@/core/entities/condominium'
import { Condominium } from '@/core/entities/condominium'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeCondominium(
  override: Partial<CondominiumProps> = {},
  id?: UniqueEntityId,
) {
  const condominium = Condominium.create(
    {
      ownerId: new UniqueEntityId(),
      name: faker.lorem.sentence(),
      address: faker.location.streetAddress(),
      ...override,
    },
    id,
  )

  return condominium
}
