import type { Resident } from '../entities/resident'

export interface ResidentsRepository {
  create(resident: Resident): Promise<void>
  findById(id: string): Promise<Resident | null>
}
