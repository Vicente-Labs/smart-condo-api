import { Entity } from './entity'
import type { UniqueEntityId } from './unique-entity-id'

export interface MaintenanceRequestProps {
  title: string
  description: string
  authorId: UniqueEntityId
  condominiumId: UniqueEntityId
  commonAreaId?: UniqueEntityId | null
  status?: 'pending' | 'in_progress' | 'done' | 'canceled'
  createdAt?: Date | null
  updatedAt?: Date | null
}

export class MaintenanceRequest extends Entity<MaintenanceRequestProps> {
  static create(props: MaintenanceRequestProps, id?: UniqueEntityId) {
    const maintenanceRequest = new MaintenanceRequest(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ?? 'pending',
      },
      id,
    )

    return maintenanceRequest
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title

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

  get status() {
    return this.props.status
  }

  setDone() {
    this.props.status = 'done'

    this.touch()
  }

  startProgress() {
    this.props.status = 'in_progress'

    this.touch()
  }

  setCanceled() {
    this.props.status = 'canceled'

    this.touch()
  }
}
