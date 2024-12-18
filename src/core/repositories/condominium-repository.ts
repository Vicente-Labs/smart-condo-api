import type { Condominium } from '../entities/condominium'

export interface CondominiumRepository {
  create(condominium: Condominium): Promise<void>
  findById(id: string): Promise<Condominium | null>
}
