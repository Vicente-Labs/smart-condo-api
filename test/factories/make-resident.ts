import { faker } from '@faker-js/faker'

import type { ResidentProps } from '@/core/entities/resident'
import { Resident } from '@/core/entities/resident'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export function makeResident(
  override: Partial<ResidentProps> = {},
  id?: UniqueEntityId,
) {
  const resident = Resident.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      condominiumId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return resident
}
