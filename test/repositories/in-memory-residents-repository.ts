import { Resident } from '@/core/entities/resident'
import type { ResidentsRepository } from '@/core/repositories/residents-repository'
export class InMemoryResidentsRepository implements ResidentsRepository {
  public residents: Resident[] = []

  async create(resident: Resident): Promise<void> {
    this.residents.push(resident)
  }

  async findById(id: string): Promise<Resident | null> {
    const resident = this.residents.find((r) => r.id.value === id)

    return resident ?? null
  }
}
