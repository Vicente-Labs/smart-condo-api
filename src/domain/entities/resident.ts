import { Entity } from '@/core/entities/entity'

interface ResidentProps {
  residentId: string
  condominiumId: string
}

export class Resident extends Entity<ResidentProps> {
  get residentId() {
    return this.props.residentId
  }

  get condominiumId() {
    return this.props.condominiumId
  }
}
