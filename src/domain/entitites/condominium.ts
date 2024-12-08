import { randomUUID } from 'node:crypto'

export class Condominium {
  public id: string
  public name: string
  public address: string
  public ownerId: string

  constructor(name: string, address: string, ownerId: string, id?: string) {
    this.name = name
    this.address = address
    this.ownerId = ownerId
    this.id = id ?? randomUUID()
  }
}
