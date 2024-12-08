import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
interface SyndicatorProps {
  name: string
  email: string
  phone: string
  avatarUrl?: string | null
  condominiumId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Syndicator extends Entity<SyndicatorProps> {
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
