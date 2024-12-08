import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Slug } from './value-objects/slug'

interface CondominiumProps {
  name: string
  address: string
  ownerId: UniqueEntityId
  slug?: Slug
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Condominium extends Entity<CondominiumProps> {
  static create(props: CondominiumProps, id?: UniqueEntityId) {
    const condominium = new Condominium(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return condominium
  }

  get name() {
    return this.props.name
  }

  get address() {
    return this.props.address
  }

  get ownerId() {
    return this.props.ownerId
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
