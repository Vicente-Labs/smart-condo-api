import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface SyndicatorProps {
  name: string
  email: string
  phone: string
  avatarUrl?: string | null
  condominiumId: UniqueEntityId
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Syndicator extends Entity<SyndicatorProps> {
  static create(props: SyndicatorProps, id?: UniqueEntityId) {
    const syndicator = new Syndicator(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return syndicator
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get condominiumId() {
    return this.props.condominiumId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
