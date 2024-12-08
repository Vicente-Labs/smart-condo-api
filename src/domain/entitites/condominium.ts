import { randomUUID } from 'node:crypto'

interface CondominiumProps {
  name: string
  address: string
  ownerId: string
}

export class Condominium {
  public id: string
  public name: string
  public address: string
  public ownerId: string

  constructor(props: CondominiumProps, id?: string) {
    this.name = props.name
    this.address = props.address
    this.ownerId = props.ownerId
    this.id = id ?? randomUUID()
  }
}
