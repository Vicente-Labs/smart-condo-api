import type { UseCaseError } from '@/core/errors/use-case-errors'

export class NotAllowedError extends Error implements UseCaseError {
  constructor(message?: string) {
    super(message ?? 'Not allowed.')
  }
}
