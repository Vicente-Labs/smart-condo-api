import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { Slug } from './value-objects/slug'

export interface CondominiumProps {
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
        slug: props.slug ?? new Slug(props.name),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return condominium
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.props.slug = new Slug(name)

    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address

    this.touch()
  }

  get ownerId() {
    return this.props.ownerId
  }

  set ownerId(ownerId: UniqueEntityId) {
    this.props.ownerId = ownerId

    this.touch()
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
