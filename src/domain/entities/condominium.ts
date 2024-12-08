import { Entity } from '@/core/entities/entity'

import { Slug } from './value-objects/slug'

interface CondominiumProps {
  name: string
  address: string
  ownerId: string
  slug?: Slug
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
}
