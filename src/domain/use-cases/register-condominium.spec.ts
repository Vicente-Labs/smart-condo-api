import { Condominium } from '../entities/condominium'
import { RegisterCondominiumUseCase } from './register-condominium'

let sut: RegisterCondominiumUseCase

describe('Register condominium use case', () => {
  beforeEach(() => {
    sut = new RegisterCondominiumUseCase()
  })

  it('should be able to register a condominium', () => {
    const result = sut.execute({
      name: 'Condominium',
      address: 'Address',
      userId: 'user-id',
    })

    expect(result).toBeInstanceOf(Condominium)
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ownerId: 'user-id',
        name: 'Condominium',
        address: 'Address',
      }),
    )
  })
})
