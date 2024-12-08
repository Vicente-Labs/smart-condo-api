import type { Syndicator } from '../entities/syndicator'

export interface SyndicatorRepository {
  create(syndicator: Syndicator): Promise<void>
  findById(id: string): Promise<Syndicator | null>
}
