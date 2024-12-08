import { Entity } from '@/core/entities/entity'

interface SyndicatorProps {
  syndicatorId: string
  condominiumId: string
}

export class Syndicator extends Entity<SyndicatorProps> {
  get syndicatorId() {
    return this.props.syndicatorId
  }

  get condominiumId() {
    return this.props.condominiumId
  }
}
