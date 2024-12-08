import { randomUUID } from 'node:crypto'

import { Slug } from './value-objects/slug'

interface CondominiumProps {
  name: string
  address: string
  ownerId: string
  slug?: Slug
}

export class Condominium {
  public id: string
  public name: string
  public address: string
  public ownerId: string
  public slug: Slug

  constructor(props: CondominiumProps, id?: string) {
    this.name = props.name
    this.address = props.address
    this.ownerId = props.ownerId
    this.slug = props.slug ?? Slug.createFromText(props.name)
    this.id = id ?? randomUUID()
  }
}
