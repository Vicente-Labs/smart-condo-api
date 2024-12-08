import { randomUUID } from 'node:crypto'

interface ResidentProps {
  name: string
  condominiumId: string
}

export class Resident {
  public id: string
  public name: string
  public condominiumId: string

  constructor(props: ResidentProps, id?: string) {
    this.name = props.name
    this.condominiumId = props.condominiumId
    this.id = id ?? randomUUID()
  }
}
