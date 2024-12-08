import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface ResidentProps {
  name: string
  email: string
  phone: string
  avatarUrl: string | null
  condominiumId: UniqueEntityId
}

export class Resident extends Entity<ResidentProps> {
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
}
