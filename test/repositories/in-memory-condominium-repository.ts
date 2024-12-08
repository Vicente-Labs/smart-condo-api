import type { Condominium } from '@/core/entities/condominium'
import type { CondominiumRepository } from '@/core/repositories/condominium-repository'

export class InMemoryCondominiumRepository implements CondominiumRepository {
  public condominiums: Condominium[] = []

  async create(condominium: Condominium): Promise<void> {
    this.condominiums.push(condominium)
  }

  async findById(id: string): Promise<Condominium | null> {
    const condominium = this.condominiums.find((c) => c.id.value === id)

    return condominium ?? null
  }
}
