import type { Syndicator } from '@/core/entities/syndicator'
import type { SyndicatorRepository } from '@/core/repositories/syndicator-repository'

export class InMemorySyndicatorRepository implements SyndicatorRepository {
  public syndicators: Syndicator[] = []

  async create(syndicator: Syndicator): Promise<void> {
    this.syndicators.push(syndicator)
  }

  async findById(id: string): Promise<Syndicator | null> {
    const syndicator = this.syndicators.find((s) => s.id.value === id)

    return syndicator ?? null
  }
}
