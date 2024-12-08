import type { Condominium } from '@/domain/entities/condominium'
import type { CondominiumRepository } from '@/domain/repositories/condominium-repository'

export class InMemoryCondominiumRepository implements CondominiumRepository {
  public condominiums: Condominium[] = []

  async create(condominium: Condominium): Promise<void> {
    this.condominiums.push(condominium)
  }
}
