import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import type { Resident } from './resident'
import type { Syndicator } from './syndicator'
import { Slug } from './value-objects/slug'

interface CondominiumProps {
  name: string
  address: string
  ownerId: UniqueEntityId
  slug?: Slug
  residentsCount: number
  residents: Resident[]
  syndicatorCount: number
  syndicators: Syndicator[]
  createdAt: Date
  updatedAt?: Date
}

export class Condominium extends Entity<CondominiumProps> {
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

  get residentsCount() {
    return this.props.residentsCount
  }

  get syndicatorCount() {
    return this.props.syndicatorCount
  }

  get syndicators() {
    return this.props.syndicators
  }

  get residents() {
    return this.props.residents
  }
}
