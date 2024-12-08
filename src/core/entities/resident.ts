import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface ResidentProps {
  name: string
  email: string
  phone: string
  avatarUrl?: string | null
  condominiumId: UniqueEntityId
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class Resident extends Entity<ResidentProps> {
  static create(props: ResidentProps, id?: UniqueEntityId) {
    const resident = new Resident(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return resident
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name

    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email

    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone

    this.touch()
  }

  get avatarUrl() {
    return this.props.avatarUrl ?? null
  }

  set avatarUrl(avatarUrl: string | null) {
    this.props.avatarUrl = avatarUrl

    this.touch()
  }

  get condominiumId() {
    return this.props.condominiumId
  }

  set condominiumId(condominiumId: UniqueEntityId) {
    this.props.condominiumId = condominiumId

    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
