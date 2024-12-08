import { randomUUID } from 'node:crypto'

interface SyndicatorProps {
  name: string
  condominiumId: string
}

export class Syndicator {
  public id: string
  public name: string
  public condominiumId: string

  constructor(props: SyndicatorProps, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
    this.condominiumId = props.condominiumId
  }
}
