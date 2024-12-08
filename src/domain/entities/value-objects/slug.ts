export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Create a slug from a text.
   * @param text The text to be converted to a slug.
   * @returns The slug created from the text.
   *
   * Example: "An example title" => "an-example-title"
   */
  static createFromText(text: string) {
    const slugified = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugified)
  }
}
