import { describe, expect, it } from 'vitest'
import { getCompletionPercentage } from './getCompletionPercentage'

describe('getCompletionPercentage', () => {
  it('calculates and rounds progress to a whole percentage', () => {
    expect(getCompletionPercentage(1, 3)).toBe(33)
    expect(getCompletionPercentage(2, 3)).toBe(67)
  })

  it('returns zero when there are no stages', () => {
    expect(getCompletionPercentage(0, 0)).toBe(0)
  })

  it('keeps progress within the valid range', () => {
    expect(getCompletionPercentage(-1, 4)).toBe(0)
    expect(getCompletionPercentage(5, 4)).toBe(100)
  })
})
