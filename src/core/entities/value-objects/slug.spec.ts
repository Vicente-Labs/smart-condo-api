import { Slug } from './slug'

describe('Slug value object', () => {
  it('should create a slug from a text', () => {
    const slug = Slug.createFromText('An example title')

    expect(slug.value).toBe('an-example-title')
  })
})
