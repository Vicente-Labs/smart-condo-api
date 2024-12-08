import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

interface MaintenanceRequestProps {
  name: string
  description: string
  authorId: UniqueEntityId
  condominiumId: UniqueEntityId
  commonAreaId?: UniqueEntityId | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class MaintenanceRequest extends Entity<MaintenanceRequestProps> {
  static create(props: MaintenanceRequestProps, id?: UniqueEntityId) {
    const maintenanceRequest = new MaintenanceRequest(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return maintenanceRequest
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

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description

    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  set authorId(authorId: UniqueEntityId) {
    this.props.authorId = authorId

    this.touch()
  }

  get condominiumId() {
    return this.props.condominiumId
  }

  set condominiumId(condominiumId: UniqueEntityId) {
    this.props.condominiumId = condominiumId

    this.touch()
  }

  get commonAreaId() {
    return this.props.commonAreaId ?? null
  }

  set commonAreaId(commonAreaId: UniqueEntityId | null) {
    this.props.commonAreaId = commonAreaId

    this.touch()
  }
}
